namespace NewsAPI.Models
{
    public class AuthorNewsModel
    {
        public string? Name { get; set; }
        public string? NewsContent { get; set; }
        public DateTime? PublicationDate { get; set; }
        public DateTime? CreationDate { get; set; }
        public byte[]? Image { get; set; }
    }
}
