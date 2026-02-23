using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project.Models
{
    [Table("Users")]
    public class User
    {
        [Key]
        public int UserId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }

        public string? Password { get; set; }

        [Required]
        public string Role { get; set; }

        public string? Avatar { get; set; }

        public string? ResetToken { get; set; }
        public DateTime? ResetTokenExpiry { get; set; }

        public string? OTP { get; set; }
        public DateTime? OTPExpiry { get; set; }

        public string Theme { get; set; } = "dark";
        public bool UseCustomCursor { get; set; } = true;
        public string CursorStyle { get; set; } = "eclipse";

        public bool IsTwoFactorEnabled { get; set; }
        public string? TwoFactorSecret { get; set; }

        public string? CardNumber { get; set; }
        public string? CardExpiry { get; set; }
        public string? CardCVC { get; set; }
        public string? CardHolderName { get; set; }


        public string? Sex { get; set; }
        public int? Age { get; set; }
        public string? Interests { get; set; }
        public bool IsOnboarded { get; set; } = false;
    }
}
