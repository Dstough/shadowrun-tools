using System.Collections.Generic;

namespace shadowrun_tools.Models
{
    public class Library
    {
        public Dictionary<string, List<Book>> Contents { get; set; }
        public Library()
        {
            Contents = new Dictionary<string, List<Book>>();
        }
    }
}
