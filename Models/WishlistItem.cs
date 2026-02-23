using System.ComponentModel.DataAnnotations;

namespace Project.Models
{
    public class WishlistItem
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }

        public virtual Product Product { get; set; }
        public virtual User User { get; set; }
    }
}
