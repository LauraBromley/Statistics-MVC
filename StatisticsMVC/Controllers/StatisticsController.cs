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
            ViewBag.LinkCss = LinkHelper.GenerateLinkClass("Index");
            return View();
        }

        // GET: /Statistics/BayesTheorem
        public ActionResult BayesTheorem()
        {
            ViewBag.LinkCss = LinkHelper.GenerateLinkClass("BayesTheorem");
            return View();
        }
        
        // GET: /Statistics/Estimators
        public ActionResult Estimators()
        {
            ViewBag.LinkCss = LinkHelper.GenerateLinkClass("Estimators");
            return View();
        }

        // GET: /Statistics/Regression
        public ActionResult Regression()
        {
            ViewBag.LinkCss = LinkHelper.GenerateLinkClass("Regression");
            return View();
        }

        // GET: /Statistics/Variance
        public ActionResult Variance()
        {
            ViewBag.LinkCss = LinkHelper.GenerateLinkClass("Variance");
            return View();
        }

        // GET: /Statistics/ConfidenceIntervals
        public ActionResult ConfidenceIntervals()
        {
            ViewBag.LinkCss = LinkHelper.GenerateLinkClass("ConfidenceIntervals");
            return View();
        }

        // GET: /Statistics/Probability
        public ActionResult Probability()
        {
            ViewBag.LinkCss = LinkHelper.GenerateLinkClass("Probability");
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
            ViewBag.LinkCss = LinkHelper.GenerateLinkClass("FeedbackForm");
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
