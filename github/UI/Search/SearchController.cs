using Microsoft.AspNetCore.Mvc;


namespace Github.Controllers
{
    public class SearchController : Controller
    {
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
    }
}
