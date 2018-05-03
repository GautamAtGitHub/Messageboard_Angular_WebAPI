using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BackendAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BackendAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/Messages")]
    public class MessagesController : Controller
    {
        private readonly MessageContext _context;
        public MessagesController(MessageContext context)
        {
            _context = context;

            if(_context.MessageItems.Count() == 0)
            {
                _context.MessageItems.Add(new Message
                {
                    Id = 101,
                    Owner = "Gautam",
                    Text = "Hello"
                });

                _context.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<Message> Get()
        {
            return _context.MessageItems.ToList();
        }

        [HttpPost]
        public void Post([FromBody] Message message)
        {
            _context.MessageItems.Add(message);
        }
    }
}