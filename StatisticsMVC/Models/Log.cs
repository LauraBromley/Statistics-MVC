using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using System.Configuration;

namespace StatisticsMVC.Models
{
    public class Log
    {
        private const string logFileName = "StatisticsLog.txt";

        private bool IsEnabled
        {
            get
            {
                  var setting = ConfigurationManager.AppSettings["EnableLogging"];
                  return (setting.ToUpper() == "TRUE" ? true : false);
            }
        }

        private String LogFilePath
        {
            get
            {
                return ConfigurationManager.AppSettings["LogFileLocation"];
            }
        }

        public void AddLogMessage(string location, string msg)
        {
            if (IsEnabled && !String.IsNullOrEmpty(LogFilePath))
            {
                if (Directory.Exists(LogFilePath))
                {
                    var logFile = LogFilePath + Path.DirectorySeparatorChar + logFileName;
                    var message = string.Format("{0}: [{1}] {2}", DateTime.Now.ToString("dd/MM/yyyy H:mm:ss"), location, msg);
                    try
                    {
                        using (var sw = new StreamWriter(logFile, true))
                        {
                            sw.WriteLine(message);
                        }

                    }
                    catch (Exception) { }
                }
               
            }
        }
    }
}