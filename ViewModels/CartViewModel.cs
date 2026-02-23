using System.ComponentModel.DataAnnotations;
using Project.Models;

namespace Project.ViewModels
{
    public class CartViewModel
    {
        public List<CartItem> CartItems { get; set; } = new List<CartItem>();
        public decimal Total => CartItems.Sum(x => x.Total);

        [Required(ErrorMessage = "Full Name is required")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Address is required")]
        public string Address { get; set; }

        [Required(ErrorMessage = "City is required")]
        public string City { get; set; }

        [Required(ErrorMessage = "ZIP Code is required")]
        [RegularExpression(@"^\d{5}(-\d{4})?$", ErrorMessage = "Invalid ZIP Code")]
        public string ZipCode { get; set; }

        [Required(ErrorMessage = "Card Number is required")]
        [RegularExpression(@"^[\d\s]{16,19}$", ErrorMessage = "Invalid Card Number")]
        public string CardNumber { get; set; }

        [Required(ErrorMessage = "Expiry Date is required")]
        public DateTime? ExpirationDate { get; set; }

        [Required(ErrorMessage = "CVV is required")]
        [RegularExpression(@"^\d{3,4}$", ErrorMessage = "Invalid CVV")]
        public string CVV { get; set; }
    }
}
