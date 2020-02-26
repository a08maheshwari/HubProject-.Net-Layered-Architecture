using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.ViewModel
{
    public enum paymentStatus
    {
        completed, pending
    }
    public class ReportsVM
    {
        public long AppointmentId { get; set; }
        public string CustomerName { get; set; }
        public string CompanyName { get; set; }
        public DateTime AppointmentDate { get; set; }
        public int TotalHours { get; set; }
        public int TotAmount { get; set; }
        public string paymentStatus { get; set; }
    }
}
