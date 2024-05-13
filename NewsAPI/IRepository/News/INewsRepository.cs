using NewsAPI.Models;

namespace NewsAPI.IRepository.News
{
    public interface INewsRepository
    {
        Task<List<NewsModel>> GetNews();
        Task<List<SectionsModel>> GetSections();
        Task<List<NewsModel>> GetNewsById(long? Id);
        Task<List<NewsModel>> GetNewsByAuthorId(long? AuthorId);
        Task<List<NewsModel>> GetNewsByPublicationDate(DateTime? PublicationDate);
        Task<List<NewsModel>> GetNewsByCreationDate(DateTime? CreationDate);
        Task<List<NewsModel>> GetNewsBySection(long? Id);
        Task<int> AddNews(DateTime? CreationDate, string? NewsContent, byte[]? Image, long? AuthorId, string Title, long SectionID);
        Task<int> UpdateNews(long? NewsId, DateTime? PublicationDate, DateTime? CreationDate, string? NewsContent, byte[]? Image, long? AuthorId, string Title, long SectionID);
        Task<int> DeleteNews(long Id);
    }
}
