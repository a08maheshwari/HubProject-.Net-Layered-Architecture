using CoreEntities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities
{
    public class JobCategory : IEntityBase
    {
        public long ID { get; set; }
        public string JobName { get; set; }
        public Professional Professional { get; set; }
        public Nullable<bool> IsDeleted { get; set; }
    }
}
