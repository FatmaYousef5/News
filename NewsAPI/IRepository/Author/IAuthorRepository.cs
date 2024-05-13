using NewsAPI.Models;

namespace NewsAPI.IRepository.Author
{
    public interface IAuthorRepository
    {
        Task<List<AuthorModel>> GetAuthors();
        Task<List<AuthorModel>> GetAuthorById(long? Id);
        Task<List<AuthorModel>> GetAuthorByName(string name);
        Task<int> AddAuthor(string name, string address, string phone);
        Task<int> UpdateAuthor(long Id, string name, string address, string phone);
        Task<int> DeleteAuthor(long Id);
        Task<List<AuthorNewsModel>> GetAuthorNews(long? AuthorId);
    }
}
