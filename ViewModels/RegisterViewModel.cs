using System.ComponentModel.DataAnnotations;

public class RegisterViewModel
{
    [Required]
    [RegularExpression("^[A-Za-z ]{2,30}$", ErrorMessage = "Name too short and contains letters & spaces")]
    public string Name { get; set; }

    [Required]
    [EmailAddress(ErrorMessage = "Invalid email")]
    public string Email { get; set; }
    [Required(ErrorMessage = "Password is Required")]
    [RegularExpression("^.{6,}$", ErrorMessage = "Password must be at least 6 characters long")]
    public string Password { get; set; }
}
