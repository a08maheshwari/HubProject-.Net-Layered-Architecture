using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.Models
{
    public class ProfessionalList : IEntityBase
    {
        [Key]
        public long ID { get; set; }
        public string JobName { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
    }
}
