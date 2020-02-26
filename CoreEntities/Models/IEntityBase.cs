using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreEntities.Models
{
    public interface IEntityBase
    {
        long ID { get; set; }
        Nullable<bool> IsDeleted { get; set; }
    }
}
