using System;
using System.ComponentModel.DataAnnotations;

namespace Project.Models
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string FullName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Subject { get; set; }

        [Required]
        public string Message { get; set; }

        public DateTime SubmittedAt { get; set; } = DateTime.Now;

        public string? AdminReply { get; set; }
        public DateTime? RepliedAt { get; set; }
        public bool IsReplied { get; set; } = false;
    }
}
