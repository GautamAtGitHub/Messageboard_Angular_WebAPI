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
        public IEnumerable<Message> Get()
        {
            return new Message[] {
                new Message
                {
                    Owner = "Gautam",
                    Text = "Hello"
                },
                new Message
                {
                    Owner = "Shweta",
                    Text = "How are you?"
                }

            };

        }
    }
}