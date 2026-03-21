using System.ComponentModel.DataAnnotations;

namespace Project.ViewModels
{
    public class SetPasswordViewModel
    {
        [DataType(DataType.Password)]
        [Display(Name = "Current Password")]
        public string? CurrentPassword { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "New Password")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long.")]
        public string NewPassword { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm Password")]
        [Compare("NewPassword", ErrorMessage = "Password and confirmation do not match.")]
        public string ConfirmPassword { get; set; }

        public string? OTP { get; set; }
    }
}
