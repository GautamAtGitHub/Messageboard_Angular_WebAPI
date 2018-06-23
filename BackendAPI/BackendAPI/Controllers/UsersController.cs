using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    public class EditProfileData
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }

    [Produces("application/json")]
    [Route("api/Users")]
    public class UsersController : Controller
    {
        private readonly APIContext _context;
        public UsersController(APIContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public ActionResult Get(string id)
        {
            var user = _context.UserItems.SingleOrDefault(u => u.Id == id);

            if (user == null)
                return NotFound("User Not Found");

            return Ok(user);
        }

        [Authorize]
        [HttpGet("me")]
        public ActionResult Get()
        {
            return Ok(GetSecureUser());
        }

        [Authorize]
        [HttpPost("me")]
        public ActionResult Post([FromBody]EditProfileData profileData)
        {
            var user = GetSecureUser();

            user.FirstName = profileData.FirstName ?? user.FirstName;
            user.LastName = profileData.LastName ?? user.LastName;

            _context.SaveChanges();

            return Ok(user);
        }

        Models.User GetSecureUser()
        {
            var id = HttpContext.User.Claims.First().Value;
            return _context.UserItems.SingleOrDefault(u => u.Id == id);

        }
    }
}