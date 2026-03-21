using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Models
{
    [Table("SocialPosts")]
    public class SocialPost
    {
        [Key]
        public int Id { get; set; }

        public int? UserId { get; set; }

        public string? ExternalSource { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public string? Caption { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        public virtual ICollection<PostLike> Likes { get; set; } = new List<PostLike>();
        public virtual ICollection<PostComment> Comments { get; set; } = new List<PostComment>();
    }
}
