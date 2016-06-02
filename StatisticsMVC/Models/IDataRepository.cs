using System;
namespace StatisticsMVC.Models
{
    interface IDataRepository
    {
        void AddFeedback(Feedback feedback);
        string GetSampleData(String dataSet);
    }
}
