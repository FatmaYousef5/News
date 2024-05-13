using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NewsAPI.Data;
using NewsAPI.IRepository.Admin;
using NewsAPI.Models;

namespace NewsAPI.Repository.Admin
{
    public class AdminRepository : IAdminRepository
    {
        private readonly APIContext _db;
        public AdminRepository(APIContext db)
        {
            _db = db;
        }

        public async Task<List<AdminModel>> CheckAdminExists(string username, string password)
        {
            SqlParameter usernameParam = new SqlParameter("@username", System.Data.SqlDbType.VarChar);
            usernameParam.Value = username;
            SqlParameter passwordParam = new SqlParameter("@password", System.Data.SqlDbType.NVarChar);
            passwordParam.Value = password;
            var res = await _db.Admin.FromSqlRaw("Execute Select_Admin @username, @password", usernameParam, passwordParam).ToListAsync();
            return res;
        }
    }
}
