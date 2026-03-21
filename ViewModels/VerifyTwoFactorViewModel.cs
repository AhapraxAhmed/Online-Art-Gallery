using System.ComponentModel.DataAnnotations;

namespace Project.ViewModels
{
    public class VerifyTwoFactorViewModel
    {
        [Required]
        [Display(Name = "Verification Code")]
        public string Code { get; set; }

        public bool RememberMe { get; set; }
        public string? ReturnUrl { get; set; }
    }
}
