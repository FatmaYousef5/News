using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp;

namespace NewsAPI.Helpers
{
    public class UploadImage
    {
        private readonly IWebHostEnvironment _hostEnvironment;
        public UploadImage(IWebHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
        }
        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        public async Task<bool> ImageTypeValidation(IFormFile userImg)
        {
            if (!string.Equals(userImg.ContentType, "image/jpg", StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(userImg.ContentType, "image/jpeg", StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(userImg.ContentType, "image/pjpeg", StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(userImg.ContentType, "image/gif", StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(userImg.ContentType, "image/x-png", StringComparison.OrdinalIgnoreCase) &&
            !string.Equals(userImg.ContentType, "image/png", StringComparison.OrdinalIgnoreCase))
            {
                return false;
            }
            return true;
        }
        public async Task<byte[]> UploadUserImage(IFormFile userImg)
        {
            MemoryStream? memoryStream = new MemoryStream();
            var FileDic = "UserImg";
            string FilePath = Path.Combine(_hostEnvironment.WebRootPath, FileDic);
            if (!Directory.Exists(FilePath))

                Directory.CreateDirectory(FilePath);
            string extension = Path.GetExtension(userImg.FileName);
            var fileName = RandomString(5) + extension;
            Directory.CreateDirectory(FilePath);
            var filePath = Path.Combine(FilePath, fileName);
            using (FileStream fs = File.Create(filePath))
            {
                userImg.CopyTo(fs);
            }
            byte[]? imgData = File.ReadAllBytes(filePath);
            return imgData;
        }
    }
}
