using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsAPI.Helpers;
using NewsAPI.IRepository.News;

namespace NewsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserNewsController : ControllerBase
    {
        private readonly INewsRepository _news;

        public UserNewsController(INewsRepository news)
        {
            _news = news;
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

        [HttpGet("GetSections")]
        public async Task<IActionResult> GetSections()
        {
            var result = await _news.GetSections();
            return Ok(result);
        }

        [HttpGet("GetNewsBySection")]
        public async Task<IActionResult> GetNewsBySection(long Id)
        {
            var result = await _news.GetNewsBySection(Id);
            return Ok(result);
        }
    }
}
