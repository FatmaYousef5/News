using NewsAPI.IRepository.Admin;

namespace NewsAPI.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        public IAdminRepository AdminRepo
        {
            get
            {
                return AdminRepo;
            }
        }
    }
}
