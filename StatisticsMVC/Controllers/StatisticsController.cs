using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using StatisticsMVC.Models;

namespace StatisticsMVC.Controllers
{
    public class StatisticsController : Controller
    {
        //
        // GET: /Statistics/
        public ActionResult Index()
        {
            return View();
        }

        // GET: /Statistics/BayesTheorem
        public ActionResult BayesTheorem()
        {
            return View();
        }
        
        // GET: /Statistics/Estimators
        public ActionResult Estimators()
        {
            return View();
        }

        // GET: /Statistics/Regression
        public ActionResult Regression()
        {
            return View();
        }

        // GET: /Statistics/GetData?dataset=Movies
        public ActionResult GetData(string dataSet)
        {
            string dataFile;
            if (dataSet == "Movies")
                dataFile = "~/App_Data/movie_data.txt";
            else if (dataSet == "Houses")
                dataFile = "~/App_Data/house_data.txt";
            else
            {
                return null;
            }

            var path = HttpContext.Server.MapPath(dataFile);
            var model = new Stats();
            var result = Json(model.GetSampleData(path), JsonRequestBehavior.AllowGet);
            return result;
        }

        //GET: /Statistics/FeedbackForm
        public ActionResult FeedbackForm()
        {
            var model = new Feedback();
            return View(model);
        }

        // POST: /Statistics/FeedbackForm
        [HttpPost]
        public ActionResult FeedbackForm(Feedback info)
        {
            // store feedback
            var path = HttpContext.Server.MapPath("~/App_Data/feedback.txt");
            var model = new Stats();
            model.AddFeedback(path, info);
            return View("FeedbackResult", info);
        }


        // POST: /Statistics/AddLogMessage
        [HttpPost]
        public ActionResult AddLogMessage(string location, string message)
        {
            var path = HttpContext.Server.MapPath("~/App_Data/log.txt");
            var model = new Stats();
            model.AddLogMessage(path, location, message);
            return null;
        }

    }
}
