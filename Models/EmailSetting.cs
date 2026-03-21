namespace Project.Models
{
    public class EmailSetting
    {
        public string SmtpServer { get; set; } = string.Empty;
        public int Port { get; set; }
        public string SenderName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string SenderPassword { get; set; } = string.Empty;
    }
}
