using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.Models
{
    public enum status
    {
        declined, accepted, pending
    }
    public enum payment
    {
        completed, pending
    }
    public class Appointments : IEntityBase
    {
        public long ID { get; set; }
        public status? status { get; set; }
        public payment? payment { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string StartingTime { get; set; }
        public string EndingTime { get; set; }
        public string Description { get; set; }
        public long CustomerFkId { get; set; }

        [ForeignKey("CustomerFkId")]
        public virtual Customer Customer { get; set; }

        public long ProfessionalFkId { get; set; }

        [ForeignKey("ProfessionalFkId")]
        public virtual Professional Professional { get; set; }

        public Nullable<bool> IsDeleted { get; set; }

        public virtual Invoice invoice { get; set; }

        public virtual Reviews Review { get; set; }

    }
}
