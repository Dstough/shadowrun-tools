using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace shadowrun_tools.Controllers
{
    public class BaseController : Controller
    {
        protected readonly IWebHostEnvironment _env;

        public BaseController(IWebHostEnvironment env)
        {
            _env = env;
        }

        public ActionResult HandleExceptions(Func<ActionResult> logic)
        {
            try
            {
                return logic();
            }
            catch(Exception ex)
            {
                return View("Error", ex);
            }
        }
    }
}