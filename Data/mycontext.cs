using Microsoft.EntityFrameworkCore;

namespace Project.Models
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options)
        {
        }
        public DbSet<Product> products { get; set; }
        public DbSet<User> users { get; set; }
        public DbSet<AIGeneratedArt> aiGeneratedArts { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<WishlistItem> WishlistItems { get; set; }
        public DbSet<Bid> Bids { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
        public DbSet<Exhibition> Exhibitions { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<SocialPost> SocialPosts { get; set; }
        public DbSet<PostLike> PostLikes { get; set; }
        public DbSet<PostComment> PostComments { get; set; }
    }
}
