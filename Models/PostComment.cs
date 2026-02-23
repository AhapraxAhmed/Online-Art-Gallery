using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Models
{
    [Table("PostComments")]
    public class PostComment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int PostId { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string Content { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [ForeignKey("PostId")]
        public virtual SocialPost? Post { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }
    }
}
