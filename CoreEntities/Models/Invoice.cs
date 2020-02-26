using CoreEntities.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities
{
    public enum paymentStatus
    {
        completed, pending
    }
    public class Invoice : IEntityBase
    {
        [Key, ForeignKey("appointment")]
        public long ID { get; set; }

        public virtual Appointments appointment { get; set; }
        public DateTime AppointmentDate { get; set; }
        public DateTime InvoiceDate {  get; set; }
        public int TotalHrs { get; set; }
        public int Rate { get; set; }
        public float Tax { get; set; }
        public int TotalAmount { get; set; }
        public paymentStatus? paymentStatus { get; set; }

        public long CustomerFkId { get; set; }

        [ForeignKey("CustomerFkId")]
        public virtual Customer Customer { get; set; }

        public long ProfessionalFkId { get; set; }

        [ForeignKey("ProfessionalFkId")]
        public virtual Professional Professional { get; set; }

        public Nullable<bool> IsDeleted { get; set; }
    }
}
