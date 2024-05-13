namespace NewsAPI.Models
{
    public class NewsModel
    {
        public long? NewsId { get; set; }
        public DateTime? PublicationDate { get; set; }
        public DateTime? CreationDate { get; set; }
        public string? NewsContent { get; set; }
        public byte[]? Image { get; set; }
        public long? AuthorId { get; set; }
        public string? Name { get; set; }
        public string? Title { get; set; }
        public long? Section { get; set; }
        public string? SectionName { get; set; }
    }
}
