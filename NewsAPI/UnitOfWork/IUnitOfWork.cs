using NewsAPI.IRepository.Admin;

namespace NewsAPI.UnitOfWork
{
    public interface IUnitOfWork
    {
        IAdminRepository AdminRepo { get; }
    }
}
