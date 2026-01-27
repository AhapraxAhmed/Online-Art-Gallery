using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Project.Models;
using Project.Services;
using System.Text.Json;

namespace Project.Controllers
{
    public class CartController : Controller
    {
        private readonly MyContext _context;
        private readonly IEmailService _emailService;
        private const string CartSessionKey = "Cart";

        public CartController(MyContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public IActionResult Index()
        {
            var cart = GetCart();
            
            var userId = HttpContext.Session.GetInt32("UserId");
            if (userId != null)
            {
                var activeBids = _context.Bids
                    .Where(b => b.UserId == userId)
                    .Include(b => b.Product)
                    .OrderByDescending(b => b.BidTime)
                    .ToList();
                ViewBag.ActiveBids = activeBids;
            }
            
            return View(cart);
        }

        public IActionResult AddToCart(int id)
        {
            var product = _context.products.Find(id);
            if (product == null) return NotFound();

            var cart = GetCart();
            var cartItem = cart.FirstOrDefault(c => c.ProductId == id);

            if (cartItem != null)
            {
                cartItem.Quantity++;
            }
            else
            {
                cart.Add(new CartItem
                {
                    ProductId = product.Id,
                    Name = product.Name,
                    Price = product.Price,
                    Quantity = 1,
                    ImageUrl = product.ImageUrl
                });
            }

            SaveCart(cart);
            TempData["Success"] = "Item added to cart!";
            return RedirectToAction("Index", "Product");
        }

        public IActionResult RemoveFromCart(int id)
        {
            var cart = GetCart();
            var item = cart.FirstOrDefault(c => c.ProductId == id);
            if (item != null)
            {
                cart.Remove(item);
                SaveCart(cart);
            }
            return RedirectToAction("Index");
        }

        public IActionResult ClearCart()
        {
            HttpContext.Session.Remove(CartSessionKey);
            return RedirectToAction("Index");
        }

        public IActionResult Checkout()
        {
            var cart = GetCart();
            if (cart.Count == 0) return RedirectToAction("Index");
            return View(cart);
        }

        [HttpPost]
        public IActionResult ProcessCheckout(string name, string address, string city, string zip)
        {
            var cart = GetCart();
            if (cart.Count == 0) return RedirectToAction("Index");

            var userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null) return RedirectToAction("Login", "Auth");


            var order = new Order
            {
                UserId = userId.Value,
                OrderDate = DateTime.Now,
                TotalAmount = cart.Sum(x => x.Total),
                CustomerName = name,
                ShippingAddress = $"{address}, {city}, {zip}",
                Status = "Pending",
                IsPaid = true
            };

            foreach (var item in cart)
            {
                var platformFee = item.Price * 0.10m;
                var artistEarnings = item.Price - platformFee;

                order.OrderItems.Add(new OrderItem
                {
                    ProductId = item.ProductId,
                    ProductName = item.Name,
                    Price = item.Price,
                    Quantity = item.Quantity,
                    ImageUrl = item.ImageUrl,
                    PlatformFee = platformFee,
                    ArtistEarnings = artistEarnings
                });
            }

            _context.Orders.Add(order);
            _context.SaveChanges();


            var confirmLink = Url.Action(
                "OrderConfirmed",
                "Cart",
                new { id = order.Id },
                Request.Scheme);

            var userEmail = HttpContext.Session.GetString("Email");
            
            if (!string.IsNullOrEmpty(userEmail))
            {
                string subject = "Confirm your Art Gallery Order";
                string body = $@"
                    <div style='font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #eee; border-radius: 20px; text-align: center; background-color: #05060a; color: white;'>
                        <h1 style='color: #3b82f6;'>ART GALLERY</h1>
                        <h2 style='margin-bottom: 20px;'>Thank you for your order, {name}!</h2>
                        <p style='color: #94a3b8; font-size: 16px; margin-bottom: 30px;'>Your selection of masterpieces is ready for shipment. Please confirm your order to finalize the delivery process.</p>
                        <a href='{confirmLink}' style='display: inline-block; background: #3b82f6; color: white; padding: 16px 36px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 18px; box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);'>Confirm Order</a>
                        <p style='margin-top: 40px; font-size: 12px; color: #475569;'>© 2025 Art Gallery. Modern Art for Modern Collectors.</p>
                    </div>";

                _emailService.SendEmailAsync(userEmail, subject, body).GetAwaiter().GetResult();
                TempData["Success"] = "Order initiated! Please check your email to confirm your purchase.";
            }

            HttpContext.Session.Remove(CartSessionKey);
            return RedirectToAction("Index", "Home");
        }

        public IActionResult OrderConfirmed(int id)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == id);
            if (order == null) return RedirectToAction("Index", "Home");
            return View(order);
        }

        [HttpPost]
        public IActionResult ConfirmOrder(int id)
        {
            var order = _context.Orders.FirstOrDefault(o => o.Id == id);
            if (order == null) return RedirectToAction("Index", "Home");

            if (order.Status == "Pending")
            {
                order.Status = "Confirmed";
                _context.SaveChanges();
                TempData["Success"] = "Order confirmed successfully!";
            }

            return RedirectToAction("OrderConfirmed", new { id = order.Id });
        }

        public IActionResult MyOrders()
        {
            var userId = HttpContext.Session.GetInt32("UserId");
            if (userId == null) return RedirectToAction("Login", "Auth");

            var orders = _context.Orders
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.OrderDate)
                .ToList();

            return View(orders);
        }

        private List<CartItem> GetCart()
        {
            var sessionCart = HttpContext.Session.GetString(CartSessionKey);
            return string.IsNullOrEmpty(sessionCart) 
                ? new List<CartItem>() 
                : JsonSerializer.Deserialize<List<CartItem>>(sessionCart);
        }

        private void SaveCart(List<CartItem> cart)
        {
            HttpContext.Session.SetString(CartSessionKey, JsonSerializer.Serialize(cart));
        }
    }
}
