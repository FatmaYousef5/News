using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsAPI.Helpers;
using NewsAPI.IRepository.News;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace NewsAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly INewsRepository _news;
        private readonly UploadImage _image;

        public NewsController(INewsRepository news, UploadImage image)
        {
            _news = news;
            _image = image;
        }

        [HttpGet("GetNews")]
        public async Task<IActionResult> GetNews()
        {
            var result = await _news.GetNews();
            return Ok(result);
        }

        [HttpGet("GetNewsById")]
        public async Task<IActionResult> GetNewsById(long Id)
        {
            try
            {
                var result = await _news.GetNewsById(Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetNewsByAuthorId")]
        public async Task<IActionResult> GetNewsByAuthorId(long AuthorId)
        {
            var result = await _news.GetNewsByAuthorId(AuthorId);
            return Ok(result);
        }

        [HttpGet("GetNewsByPublicationDate")]
        public async Task<IActionResult> GetNewsByPublicationDate(DateTime PublicationDate)
        {
            var result = await _news.GetNewsByPublicationDate(PublicationDate);
            return Ok(result);
        }

        [HttpGet("GetNewsByCreationDate")]
        public async Task<IActionResult> GetNewsByCreationDate(DateTime CreationDate)
        {
            var result = await _news.GetNewsByCreationDate(CreationDate);
            return Ok(result);
        }

        [HttpGet("GetNewsBySection")]
        public async Task<IActionResult> GetNewsBySection(long Id)
        {
            var result = await _news.GetNewsBySection(Id);
            return Ok(result);
        }

        [HttpPost("AddNews")]
        public async Task<IActionResult> AddNews(DateTime CreationDate, string NewsContent, long AuthorId, string Title, long SectionID , [FromForm] IFormFile? Image)
        {

            if (NewsContent == null)
            {
                return BadRequest("News Content is required");
            }
            if (CreationDate == null)
            {
                return BadRequest("Creation Date is required");
            }
            if (AuthorId == null)
            {
                return BadRequest("Author is required");
            }
            if (Image == null)
            {
                return BadRequest("Image is required");
            }
            var now = DateTime.Now;
            if ((CreationDate - now).TotalDays > 7)
            {
                return BadRequest("Creation Date must be through 7 days after Publication Date");
            }
            var ImageTypeValid = await _image.ImageTypeValidation(Image);   

            if(ImageTypeValid == false)
            {
                return BadRequest("Image Type must be jpg, jpeg, pjpeg, gif, x-png or png");
            }

            var ImageBytes = await _image.UploadUserImage(Image);
            
            var result = await _news.AddNews(CreationDate, NewsContent, ImageBytes, AuthorId, Title, SectionID);
            return Ok(result);
        }

        [HttpPost("UpdateNews")]
        public async Task<IActionResult> UpdateNews(long? NewsId, DateTime PublicationDate, DateTime CreationDate, string? NewsContent, long? AuthorId, string Title, long SectionID, [FromForm] IFormFile Image)
        {
            var ImageTypeValid = await _image.ImageTypeValidation(Image);

            if (ImageTypeValid == false)
            {
                return BadRequest("Image Type must be jpg, jpeg, pjpeg, gif, x-png or png");
            }

            var ImageBytes = await _image.UploadUserImage(Image);
            if ((CreationDate - PublicationDate).TotalDays > 7)
            {
                return BadRequest("Creation Date must be through 7 days after Publication Date");
            }
            var result = await _news.UpdateNews(NewsId, PublicationDate, CreationDate, NewsContent, ImageBytes, AuthorId, Title, SectionID);
            return Ok(result);
        }

        [HttpPost("DeleteNews")]
        public async Task<IActionResult> DeleteNews(long Id)
        {
            var result = await _news.DeleteNews(Id);
            return Ok(result);
        }
    }
}
