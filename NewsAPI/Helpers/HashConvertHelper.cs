using System.Text;
using System.Security.Cryptography;


namespace NewsAPI.Helpers
{
    public class HashConvertHelper
    {
        public async Task<string> GetHash(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                var ConvertRes = BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
                return ConvertRes;
            }
        }
    }
}
