using Microsoft.AspNetCore.Mvc;
using NewsAPI.Helpers;
using NewsAPI.IRepository.Admin;

namespace NewsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _admin;
        private readonly HashConvertHelper _hash;
        private readonly GetTokenHelper _token;

        public AdminController(IAdminRepository admin, HashConvertHelper hash, GetTokenHelper token)
        {
            _admin = admin;
            _hash = hash;
            _token = token;
        }

        [HttpGet("GetAdmin")]
        public async Task<IActionResult> GetAdmin(string username, string password)
        {
            var ConvertRes = await _hash.GetHash(password);

            var result = await _admin.CheckAdminExists(username, ConvertRes);

            if (result is [] || result.Count == 0)
            {
                return Unauthorized("UserName or Password is wrong");
            }
            var token = await _token.GetToken();
            return Ok(new {token });
        }
    }
}
