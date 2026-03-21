using System.ComponentModel.DataAnnotations;

namespace Project.ViewModels
{
    public class TwoFactorSetupViewModel
    {
        public string? Secret { get; set; }
        public string? QrCodeImage { get; set; }
        
        [Required]
        [Display(Name = "Verification Code")]
        public string Code { get; set; }
    }
}
