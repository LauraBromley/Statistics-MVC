using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace StatisticsMVC.Models
{
    public class Stats
    {
        public string GetSampleData(string path)
        {
            string data;

            using (var sr = new StreamReader(path))
            {
                data = sr.ReadToEnd();
            }
            return data;
        }

        public void AddLogMessage(string path, string location, string msg)
        {
            var message = string.Format("{0}: [{1}] {2}", DateTime.Now.ToString("dd/MM/yyyy H:mm:ss"), location,msg);
            using (var sw = new StreamWriter(path,true))
            {
                sw.WriteLine(message);
            }
        }

        public void AddFeedback(string path, Feedback feedback)
        {
            using (var sw = new StreamWriter(path, true))
            {
                sw.WriteLine(feedback.ToString());
            }
        }
    }
}