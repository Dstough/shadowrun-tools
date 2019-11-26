using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using shadowrun_tools.Models;
using System.Collections.Generic;
using System.IO;

namespace shadowrun_tools.Controllers
{
    public class LibraryController : BaseController
    {
        public LibraryController(IWebHostEnvironment env) : base(env)
        {
        }

        public ActionResult Index()
        {
            return HandleExceptions(()=> 
            {    
                var library = new Library();
                var rootBooks = new List<string>();
                
                foreach (var item in Directory.GetFiles(_env.WebRootPath + "/data/"))
                    rootBooks.Add(Path.GetFileNameWithoutExtension(item));

                library.Contents.Add("root directory", rootBooks);

                foreach (var directory in Directory.GetDirectories(_env.WebRootPath + "/data/"))
                {
                    var books = new List<string>();

                    foreach (var item in Directory.GetFiles(directory))
                        books.Add(Path.GetFileNameWithoutExtension(item));

                    library.Contents.Add(Path.GetFileName(directory), books);
                }
                
                return View(library);
            });
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
