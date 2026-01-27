using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Models
{
    [Table("PostLikes")]
    public class PostLike
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int PostId { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey("PostId")]
        public virtual SocialPost? Post { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }
    }
}
