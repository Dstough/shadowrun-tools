using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace shadowrun_tools.Controllers
{
    public class HomeController : BaseController
    {
        public HomeController(IWebHostEnvironment env) : base(env)
        { }

        public ActionResult Index()
        {
            return HandleExceptions(() =>
            {
                return View();
            });
        }

        public ActionResult About()
        {
            return HandleExceptions(() =>
            {
                throw new Exception("Page Not Implemented Yet.");
            });
        }
    }
}