using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace StatisticsMVC.Models
{
    public class FileDataRepository : IDataRepository
    {
        private String GetPath(string fileName)
        {
            return System.Web.HttpContext.Current.Server.MapPath("~/App_Data/" + fileName);
        }

        public string GetSampleData(string dataSet)
        {
            String dataFile;
            if (dataSet == "Movies")
            {
                dataFile = "movie_data.txt";
            }
            else if (dataSet == "Houses")
            {
                dataFile = "house_data.txt";
            }
            else
            {
                return string.Empty;
            }

            var path = GetPath(dataFile);
            string data;
            using (var sr = new StreamReader(path))
            {
                data = sr.ReadToEnd();
            }
            return data;
        }

        public void AddFeedback(Feedback feedback)
        {
            var path = GetPath("feedback.txt");
            using (var sw = new StreamWriter(path, true))
            {
                sw.WriteLine(feedback.ToString());
            }
        }
    }
}