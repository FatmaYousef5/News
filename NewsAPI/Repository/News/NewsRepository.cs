using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using NewsAPI.Data;
using NewsAPI.IRepository.News;
using NewsAPI.Models;
using static System.Collections.Specialized.BitVector32;

namespace NewsAPI.Repository.News
{
    public class NewsRepository : INewsRepository
    {
        private readonly APIContext _db;
        public NewsRepository(APIContext db)
        {
            _db = db;
        }

        public async Task<List<NewsModel>> GetNews()
        {
            var res = await _db.News.FromSqlRaw("Execute Get_News").ToListAsync();
            return res;
        }

        public async Task<List<SectionsModel>> GetSections()
        {
            var res = await _db.Sections.FromSqlRaw("Execute Get_Sections").ToListAsync();
            return res;
        }

        public async Task<List<NewsModel>> GetNewsById(long? Id)
        {
            SqlParameter IdParam = new SqlParameter("@Id", System.Data.SqlDbType.BigInt);
            IdParam.Value = Id;
            var res = await _db.News.FromSqlRaw("Execute Get_News_ById @Id", IdParam).ToListAsync();
            return res;
        }

        public async Task<List<NewsModel>> GetNewsByAuthorId(long? AuthorId)
        {
            SqlParameter AuthorIdParam = new SqlParameter("@AuthorId", System.Data.SqlDbType.BigInt);
            AuthorIdParam.Value = AuthorId;
            var res = await _db.News.FromSqlRaw("Execute Get_News_ByAuthorId @AuthorId", AuthorIdParam).ToListAsync();
            return res;
        }

        public async Task<List<NewsModel>> GetNewsByPublicationDate(DateTime? PublicationDate)
        {
            SqlParameter PublicationDateParam = new SqlParameter("@PublicationDate", System.Data.SqlDbType.DateTime);
            PublicationDateParam.Value = PublicationDate;
            var res = await _db.News.FromSqlRaw("Execute Get_News_ByPublicationDate @PublicationDate", PublicationDateParam).ToListAsync();
            return res;
        }

        public async Task<List<NewsModel>> GetNewsByCreationDate(DateTime? CreationDate)
        {
            SqlParameter CreationDateParam = new SqlParameter("@CreationDate", System.Data.SqlDbType.DateTime);
            CreationDateParam.Value = CreationDate;
            var res = await _db.News.FromSqlRaw("Execute Get_News_ByCreationDate @CreationDate", CreationDateParam).ToListAsync();
            return res;
        }

        public async Task<List<NewsModel>> GetNewsBySection(long? Id)
        {
            SqlParameter SectionIdParam = new SqlParameter("@Id", System.Data.SqlDbType.BigInt);
            SectionIdParam.Value = Id;
            var res = await _db.News.FromSqlRaw("Execute Get_News_BySectionId @Id", SectionIdParam).ToListAsync();
            return res;
        }

        public async Task<int> AddNews(DateTime? CreationDate, string? NewsContent, byte[]? Image, long? AuthorId, string Title, long SectionID)
        {
            SqlParameter CreationDateParam = new SqlParameter("@CreationDate", System.Data.SqlDbType.DateTime);
            CreationDateParam.Value = CreationDate;
            SqlParameter NewsContentParam = new SqlParameter("@NewsContent", System.Data.SqlDbType.NVarChar);
            NewsContentParam.Value = NewsContent;
            SqlParameter ImageParam = new SqlParameter("@Image", System.Data.SqlDbType.Binary);
            ImageParam.Value = (object) Image ?? DBNull.Value;
            SqlParameter AuthorIdParam = new SqlParameter("@AuthorId", System.Data.SqlDbType.BigInt);
            AuthorIdParam.Value = AuthorId;
            SqlParameter TitleParam = new SqlParameter("@Title", System.Data.SqlDbType.NVarChar);
            TitleParam.Value = Title;
            SqlParameter SectionIDParam = new SqlParameter("@SectionID", System.Data.SqlDbType.BigInt);
            SectionIDParam.Value = SectionID;
            var res = await _db.Database.ExecuteSqlRawAsync("Execute Add_News @CreationDate, @NewsContent, @Image, @AuthorId, @Title, @SectionID", CreationDateParam, NewsContentParam, ImageParam, AuthorIdParam, TitleParam, SectionIDParam);
            return res;
        }
        public async Task<int> UpdateNews(long? NewsId, DateTime? PublicationDate, DateTime? CreationDate, string? NewsContent, byte[]? Image, long? AuthorId, string Title, long SectionID)
        {
            SqlParameter NewsIdParam = new SqlParameter("@NewsId", System.Data.SqlDbType.BigInt);
            NewsIdParam.Value = NewsId;
            SqlParameter PublicationDateParam = new SqlParameter("@PublicationDate", System.Data.SqlDbType.DateTime);
            PublicationDateParam.Value = PublicationDate;
            SqlParameter CreationDateParam = new SqlParameter("@CreationDate", System.Data.SqlDbType.DateTime);
            CreationDateParam.Value = CreationDate;
            SqlParameter NewsContentParam = new SqlParameter("@NewsContent", System.Data.SqlDbType.NVarChar);
            NewsContentParam.Value = NewsContent;
            SqlParameter ImageParam = new SqlParameter("@Image", System.Data.SqlDbType.VarBinary);
            ImageParam.Value = (object)Image ?? DBNull.Value;
            SqlParameter AuthorIdParam = new SqlParameter("@AuthorId", System.Data.SqlDbType.BigInt);
            AuthorIdParam.Value = AuthorId;
            SqlParameter TitleParam = new SqlParameter("@Title", System.Data.SqlDbType.NVarChar);
            TitleParam.Value = Title;
            SqlParameter SectionIDParam = new SqlParameter("@SectionID", System.Data.SqlDbType.BigInt);
            SectionIDParam.Value = SectionID;
            var res = await _db.Database.ExecuteSqlRawAsync("Execute Update_News @NewsId, @PublicationDate, @CreationDate, @NewsContent, @Image, @AuthorId, @Title, @SectionID", NewsIdParam, PublicationDateParam, CreationDateParam, NewsContentParam, ImageParam, AuthorIdParam, TitleParam, SectionIDParam);
            return res;
        }
        public async Task<int> DeleteNews(long Id)
        {
            SqlParameter IdParam = new SqlParameter("@Id", System.Data.SqlDbType.BigInt);
            IdParam.Value = Id;
            var res = await _db.Database.ExecuteSqlRawAsync("Execute Delete_News @Id", IdParam);
            return res;
        }
    }
}
