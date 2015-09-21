using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Web;

namespace StatisticsMVC.Models
{
    public class Feedback
    {
        public string Name { get; set; }
       
        [DisplayName("Email Address")]
        public string EmailAddress { get; set; }

        [Required(ErrorMessage="Message is required.")]
        [DisplayName("Message *")]
        public string Message { get; set; }

         [DisplayName("Reply Requested")]
        public bool ReplyRequested { get; set; }

        public new string ToString()
        {
            var sb = new StringBuilder();
            sb.AppendLine("Date: "+ DateTime.Now.ToString("dd/MM/yyyy H:mm:ss"));
            sb.AppendLine("Name: " + Name);
            sb.AppendLine("Email Address:" + EmailAddress);
            if (ReplyRequested)
                sb.AppendLine("Reply Requested");
            sb.AppendLine("");
            sb.AppendLine(Message);
            sb.AppendLine("");

            return sb.ToString();
        }
    }
}