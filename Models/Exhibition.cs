using System.ComponentModel.DataAnnotations;

namespace Project.Models
{
    public class Exhibition
    {
        [Key]
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; }
        
        [Required]
        public string Description { get; set; }
        
        [Required]
        public string Address { get; set; }
        
        [Required]
        public DateTime Date { get; set; }
        
        public string? ImageUrl { get; set; }
        
        public bool IsActive { get; set; } = true;
        
        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
