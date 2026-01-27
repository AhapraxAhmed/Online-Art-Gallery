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
    [RegularExpression(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{5,}$",
    ErrorMessage = "Password must be at least 5 characters long and include uppercase, lowercase, and a number")]
    public string Password { get; set; }
}
