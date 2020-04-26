using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using shadowrun_tools.Models;
using System.Collections.Generic;
using System.IO;
using System;

namespace shadowrun_tools.Controllers
{
    public class LibraryController : BaseController
    {
        public LibraryController(IWebHostEnvironment env) : base(env)
        {
        }

        public ActionResult Index()
        {
            return HandleExceptions(() =>
            {
                var library = new Library();
                var rootBooks = new List<Book>();

                foreach (var item in Directory.GetFiles(_env.WebRootPath + "/data/"))
                    rootBooks.Add(new Book
                    {
                        title = Path.GetFileNameWithoutExtension(item),
                        lastModified = System.IO.File.GetLastWriteTime(item)
                    });

                if (rootBooks.Count != 0)
                    library.Contents.Add("", rootBooks);

                foreach (var directory in Directory.GetDirectories(_env.WebRootPath + "/data/"))
                {
                    var books = new List<Book>();

                    foreach (var item in Directory.GetFiles(directory))
                        books.Add(new Book
                        {
                            title = Path.GetFileNameWithoutExtension(item),
                            lastModified = System.IO.File.GetLastWriteTime(item)
                        });

                    if (books.Count != 0)
                        library.Contents.Add(Path.GetFileName(directory), books);
                }

                return View(library);
            });
        }

        public ActionResult Book(string Name)
        {
            return HandleExceptions(() =>
            {
                var dir = FindFileDirectory(_env.WebRootPath + "/data/", Name);

                if (dir == "")
                    throw new Exception("File Not Found");

                var book = new Book()
                {
                    content = System.IO.File.ReadAllText(dir + "/" + Name + ".md")
                };

                return View(book);
            });
        }

        private string FindFileDirectory(string rootPath, string fileName)
        {
            var path = "";

            foreach (var file in Directory.GetFiles(rootPath))
                if (Path.GetFileNameWithoutExtension(file) == fileName)
                    return Path.GetDirectoryName(file);

            foreach (var dir in Directory.GetDirectories(rootPath))
                path += FindFileDirectory(dir, fileName);

            return path;
        }
    }
}
