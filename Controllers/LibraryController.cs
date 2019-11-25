using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using shadowrun_tools.Models;

namespace shadowrun_tools.Controllers
{
    public class LibraryController : BaseController
    {
        public LibraryController(IWebHostEnvironment env) : base(env)
        {
        }

        public ActionResult Book(string Name = "Template")
        {
            return HandleExceptions(() =>
            {
                var book = new Book()
                {
                    content = System.IO.File.ReadAllText(_env.WebRootPath + "/data/" + Name + ".md")
                };

                return View(book);
            });
        }
    }
}
