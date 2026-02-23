using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public DateTime OrderDate { get; set; }
        
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        public string CustomerName { get; set; }
        public string ShippingAddress { get; set; }
        public string Status { get; set; }

        public bool IsPaid { get; set; } = false;
        public DateTime? PaymentDueDate { get; set; }

        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}
