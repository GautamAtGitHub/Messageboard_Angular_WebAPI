using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BackendAPI.Models
{
    public class Message
    {
        public long Id { get; set; }
        public string Owner { get; set; }
        public string Text { get; set; }
    }
}
