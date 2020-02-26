using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.ViewModel
{
    public class InvoiceVM
    {
        public string CustomerFirstName { get; set; }
        public string CustomerLastName { get; set; }
        public string CustomerLocality { get; set; }
        public string CustomerStreet { get; set; }
        public string CustomerPostalCode { get; set; }
        public string CustomerCountry { get; set; }
        public string CustomerContact { get; set; }

        public string ProfessionalName { get; set; }
        public string CompanyName { get; set; }
        public string ProfessionalContact { get; set; }
        public string ProfessionalLocality { get; set; }
        public string ProfessionalStreet { get; set; }
        public string ProfessionalPostalCode { get; set; }
        public string ProfessionalCountry { get; set; }

        public long InvoiceNo { get; set; }
        public DateTime AppointmentDate { get; set; }
        public DateTime InvoiceDate { get; set; }
        public string paymentStatus { get; set; }

    }
}
