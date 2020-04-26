using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace shadowrun_tools.Controllers
{
    public class ChangeLogController : BaseController
    {
        public ChangeLogController(IWebHostEnvironment env) : base(env)
        { }

        public ActionResult Index()
        {
            return HandleExceptions(() =>
            {
                throw new Exception("Page Not Implemented Yet.");
            });
        }
    }
}