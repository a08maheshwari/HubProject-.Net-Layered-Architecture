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
    public class Reviews : IEntityBase
    {
        [Key]
        public long ID { get; set; }
        public string Ratings { get; set; }
        public long CustomerFkId { get; set; }

        [ForeignKey("CustomerFkId")]
        public virtual Customer Customer { get; set; }

        public long ProfessionalFkId { get; set; }

        [ForeignKey("ProfessionalFkId")]
        public virtual Professional Professional { get; set; }

        public Nullable<bool> IsDeleted { get; set; }
    }
}
