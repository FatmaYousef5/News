using NewsAPI.Models;

namespace NewsAPI.IRepository.Admin
{
    public interface IAdminRepository
    {
        Task<List<AdminModel>> CheckAdminExists(string username, string password);
    }
}
