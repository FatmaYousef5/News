using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NewsAPI.Data;
using NewsAPI.IRepository.Author;
using NewsAPI.Models;

namespace NewsAPI.Repository.Author
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly APIContext _db;
        public AuthorRepository(APIContext db)
        {
            _db = db;
        }
        public async Task<List<AuthorModel>> GetAuthors()
        {
            var res = await _db.Author.FromSqlRaw("Execute Get_Author").ToListAsync();
            return res;
        }

        public async Task<List<AuthorModel>> GetAuthorById(long? Id)
        {
            SqlParameter IdParam = new SqlParameter("@Id", System.Data.SqlDbType.BigInt);
            IdParam.Value = Id;
            var res = await _db.Author.FromSqlRaw("Execute Get_Author_ById @Id", IdParam).ToListAsync();
            return res;
        }

        public async Task<List<AuthorModel>> GetAuthorByName(string name)
        {
            SqlParameter nameParam = new SqlParameter("@name", System.Data.SqlDbType.VarChar);
            nameParam.Value = name;
            var res = await _db.Author.FromSqlRaw("Execute Get_Author_ByName @name", nameParam).ToListAsync();
            return res;
        }

        public async Task<int> AddAuthor(string name, string address, string phone)
        {
            SqlParameter nameParam = new SqlParameter("@name", System.Data.SqlDbType.VarChar);
            nameParam.Value = name;
            SqlParameter addressParam = new SqlParameter("@address", System.Data.SqlDbType.NVarChar);
            addressParam.Value = address;
            SqlParameter phoneParam = new SqlParameter("@phone", System.Data.SqlDbType.NVarChar);
            phoneParam.Value = phone;
            var res = await _db.Database.ExecuteSqlRawAsync("Execute Add_Author @name, @address, @phone", nameParam, addressParam, phoneParam);
            return res;
        }

        public async Task<int> UpdateAuthor(long Id, string name, string address, string phone)
        {
            SqlParameter IdParam = new SqlParameter("@Id", System.Data.SqlDbType.BigInt);
            IdParam.Value = Id;
            SqlParameter nameParam = new SqlParameter("@name", System.Data.SqlDbType.VarChar);
            nameParam.Value = name;
            SqlParameter addressParam = new SqlParameter("@address", System.Data.SqlDbType.NVarChar);
            addressParam.Value = address;
            SqlParameter phoneParam = new SqlParameter("@phone", System.Data.SqlDbType.NVarChar);
            phoneParam.Value = phone;
            var res = await _db.Database.ExecuteSqlRawAsync("Execute Update_Author @Id, @name, @address, @phone", IdParam, nameParam, addressParam, phoneParam);
            return res;
        }

        public async Task<int> DeleteAuthor(long Id)
        {
            SqlParameter IdParam = new SqlParameter("@Id", System.Data.SqlDbType.BigInt);
            IdParam.Value = Id;
            var res = await _db.Database.ExecuteSqlRawAsync("Execute Delete_Author @Id", IdParam);
            return res;
        }

        public async Task<List<AuthorNewsModel>> GetAuthorNews(long? AuthorId)
        {
            SqlParameter AuthorIdParam = new SqlParameter("@AuthorId", System.Data.SqlDbType.BigInt);
            AuthorIdParam.Value = AuthorId;
            var res = await _db.AuthorNews.FromSqlRaw("Execute Get_Author_News @AuthorId", AuthorIdParam).ToListAsync();
            return res;
        }
    }
}
