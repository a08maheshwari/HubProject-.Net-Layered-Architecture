using CoreEntities.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities
{
    public class Professional : IEntityBase
    {
        [Key]
        public long ID { get; set; }
        public string UserName { get; set; }
        public string ProfessionalName { get; set; }
        public string CompanyName { get; set; }
        public string ProfessionalContact { get; set; }
        public string ProfessionalLocality { get; set; }
        public string ProfessionalStreet { get; set; }
        public string Email { get; set; }
        public string ProfessionalPostalCode { get; set; }
        public string ProfessionalCountry { get; set; }
        public int Min { get; set; }
        public int Max { get; set; }
        public string ProfessionalDescription { get; set; }
        public string ProfessionalImage { get; set; }
        public int ProfessionalWrkExp { get; set; }
        public bool isProfessionalCreated { get; set; }
        public virtual ICollection<Appointments> Appointments { get; set; }
        public virtual BusinessHours BusinessHours { get; set; }
        public virtual ICollection<JobCategory> JCategory { get; set; }
        public virtual ICollection<Invoice> Invoice { get; set; }
        public virtual ICollection<Reviews> Reviews { get; set; }
        public Nullable<bool> IsDeleted { get; set; }

    }
}
