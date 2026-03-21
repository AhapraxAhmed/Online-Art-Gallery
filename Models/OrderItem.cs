using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Models
{
    public class OrderItem
    {
        [Key]
        public int Id { get; set; }

        public int OrderId { get; set; }
        [ForeignKey("OrderId")]
        public virtual Order Order { get; set; }

        public int ProductId { get; set; }
        [ForeignKey("ProductId")]
        public virtual Product Product { get; set; }

        public string ProductName { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }
        
        public int Quantity { get; set; }
        public string? ImageUrl { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal PlatformFee { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal ArtistEarnings { get; set; }
    }
}
