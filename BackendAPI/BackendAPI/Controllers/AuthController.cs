using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    public class JwtPacket
    {
        public string Token { get; set; }
        public string FirstName { get; set; }
    }

    [Produces("application/json")]
    [Route("auth")]
    public class AuthController : Controller
    {
        private readonly APIContext _context;
        public AuthController(APIContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public JwtPacket Register([FromBody] Models.User user)
        {
            var jwt = new JwtSecurityToken();
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt); // Encript the tocken

            _context.UserItems.Add(user);
            _context.SaveChanges();

            return new JwtPacket() { Token = encodedJwt, FirstName = user.FirstName };
        }
    }
}