using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace BackendAPI.Controllers
{
    public class JwtPacket
    {
        public string Token { get; set; }
        public string FirstName { get; set; }
    }

    public class LoginData
    {
        public string Email { get; set; }
        public string Password { get; set; }
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

        [HttpPost("login")]
        public ActionResult Login([FromBody]LoginData loginData)
        {
            var user = _context.UserItems.SingleOrDefault(x => x.Email == loginData.Email && x.Password == loginData.Password);

            if (user == null)
                return NotFound("Email or Password incorrect");

            return Ok(CreateJwtPacket(user));

        }

        [HttpPost("register")]
        public JwtPacket Register([FromBody] Models.User user)
        {
            _context.UserItems.Add(user);
            _context.SaveChanges();

            return CreateJwtPacket(user);
        }

        private JwtPacket CreateJwtPacket(Models.User user)
        {
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("This is the secret"));
            var signingCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var claims = new Claim[] {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id)
            };

            var jwt = new JwtSecurityToken(claims: claims, signingCredentials: signingCredentials);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt); // Encript the tocken
            return new JwtPacket() { Token = encodedJwt, FirstName = user.FirstName };
        }
    }
}