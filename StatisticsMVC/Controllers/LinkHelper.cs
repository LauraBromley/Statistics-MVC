using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Web;

namespace StatisticsMVC.Controllers
{
    public class LinkHelper
    {
        private static readonly List<string> Links = new List<string>
            {
                "Index",
                "FeedbackForm",
                "BayesTheorem",
                "ConfidenceIntervals",
                "Estimators", 
                "Probability", 
                "Regression", 
                "Variance" 
            };

        public static Dictionary<string, string> GenerateLinkClass(string selected)
        {
            return Links.ToDictionary(l => l, l => l == selected ? "selected" : "");
        }
    }
}