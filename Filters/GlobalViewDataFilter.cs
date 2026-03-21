using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Project.Models;

namespace Project.Filters
{
    public class GlobalViewDataFilter : IActionFilter
    {
        private readonly MyContext _context;

        public GlobalViewDataFilter(MyContext context)
        {
            _context = context;
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            var controller = context.Controller as Controller;
            if (controller != null)
            {
                var userId = context.HttpContext.Session.GetInt32("UserId");
                if (userId.HasValue)
                {
                    controller.ViewBag.WishlistCount = _context.WishlistItems.Count(w => w.UserId == userId.Value);
                }
                else
                {
                    controller.ViewBag.WishlistCount = 0;
                }
            }
        }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            // Do nothing
        }
    }
}
