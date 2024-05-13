using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NewsAPI.IRepository.Admin;
using NewsAPI.IRepository.Author;

namespace NewsAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        private readonly IAuthorRepository _author;

        public AuthorController(IAuthorRepository author)
        {
            _author = author;
        }

        [HttpGet("GetAuthor")]
        public async Task<IActionResult> GetAuthor()
        {
            var result = await _author.GetAuthors();
            if (result.Count != 0)
            {
                return Ok(result);
            }
            return BadRequest("There is no data to be displayed");
        }

        [HttpGet("GetAuthorById")]
        public async Task<IActionResult> GetAuthorById(long? Id)
        {
            var result = await _author.GetAuthorById(Id);
            if (result.Count != 0)
            {
                return Ok(result);
            }
            return BadRequest("There is no such that author to be displayed");
        }

        [HttpGet("GetAuthorByName")]
        public async Task<IActionResult> GetAuthorByName(string name)
        {
            var result = await _author.GetAuthorByName(name);
            if (result.Count != 0)
            {
                return Ok(result);
            }
            return BadRequest("There is no author with this name");
        }

        [HttpPost("AddAuthor")]
        public async Task<IActionResult> AddAuthor(string name, string address, string phone)
        {
            if (name == null)
            {
                return BadRequest("Name is required");
            }
            if (address == null)
            {
                return BadRequest("Address is required");
            }
            if (phone == null)
            {
                return BadRequest("Phone is required");
            }
            var result = await _author.AddAuthor(name, address, phone);
            return Ok(result);
        }

        [HttpPost("UpdateAuthor")]
        public async Task<IActionResult> UpdateAuthor(long Id, string name, string address, string phone)
        {
            var result = await _author.UpdateAuthor(Id, name, address, phone);
            return Ok(result);
        }

        [HttpPost("DeleteAuthor")]
        public async Task<IActionResult> DeleteAuthor(long Id)
        {
            var result = await _author.DeleteAuthor(Id);
            return Ok(result);
        }

        [HttpGet("GetAuthorNews")]
        public async Task<IActionResult> GetAuthorNews(long AuthorId)
        {
            var result = await _author.GetAuthorNews(AuthorId);
            return Ok(result);
        }
    }
}
