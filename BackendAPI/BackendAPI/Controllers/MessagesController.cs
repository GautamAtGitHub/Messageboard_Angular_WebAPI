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
        private readonly APIContext _context;
        public MessagesController(APIContext context)
        {
            _context = context;

            //if(_context.MessageItems.Count() == 0)
            //{
            //    _context.MessageItems.Add(new Message
            //    {
            //        Id = 101,
            //        Owner = "Gautam",
            //        Text = "Hello"
            //    });

            //    _context.SaveChanges();
            //}
        }

        [HttpGet]
        public IEnumerable<Message> Get()
        {
            return _context.MessageItems.ToList();
        }

        [HttpGet("{name}")]
        public IEnumerable<Message> Get(string name)
        {
            return _context.MessageItems.Where(x => x.Owner.Equals(name.Trim())).ToList();
        }

        [HttpPost]
        public Message Post([FromBody] Message message)
        {
            var dbMessage = _context.MessageItems.Add(message).Entity;
            _context.SaveChanges();
            return dbMessage;
        }
    }
}