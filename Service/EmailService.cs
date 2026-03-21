using System.Net;
using System.Net.Mail;

namespace Project.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration configuration;

        public EmailService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public async Task SendEmailAsync(string email, string subject, string body)
        {
            var from = configuration["EmailSettings:From"];
            var smtpServer = configuration["EmailSettings:SmtpServer"];
            var port = int.Parse(configuration["EmailSettings:Port"]!);
            var username = configuration["EmailSettings:Username"];
            var password = configuration["EmailSettings:Password"];

            var messege = new MailMessage(from!, email, subject, body);
            messege.IsBodyHtml = true;

            using var client = new SmtpClient(smtpServer, port)
            {
                Credentials = new NetworkCredential(username, password),
                EnableSsl = true
            };
            await client.SendMailAsync(messege);
        }
    }
}
