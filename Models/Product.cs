using System.ComponentModel.DataAnnotations;

namespace Project.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string? ImageUrl { get; set; }


        public bool IsAuction { get; set; }
        public decimal? CurrentBid { get; set; }
        public DateTime? AuctionEndTime { get; set; }
        public int BidCount { get; set; } = 0;
        public int? HighestBidderId { get; set; }


        public int? ArtistId { get; set; }
        public bool IsApproved { get; set; } = false;

        public virtual ICollection<Review> Reviews { get; set; } = new List<Review>();
    }
}
