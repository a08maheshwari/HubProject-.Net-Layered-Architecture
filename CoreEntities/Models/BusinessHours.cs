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
    public class BusinessHours : IEntityBase
    {
        [Key, ForeignKey("professional")]
        public long ID { get; set; }

        public virtual Professional professional { get; set; }
     
        public string MonStartTime { get; set; }
        public string MonEndTime { get; set; }
        public bool MonClosed { get; set; }


        public string TueStartTime { get; set; }
        public string TueEndTime { get; set; }
        public bool TueClosed { get; set; }


        public string WedStartTime { get; set; }
        public string WedEndTime { get; set; }
        public bool WedClosed { get; set; }


        public string ThuStartTime { get; set; }
        public string ThuEndTime { get; set; }
        public bool ThuClosed { get; set; }


        public string FriStartTime { get; set; }
        public string FriEndTime { get; set; }
        public bool FriClosed { get; set; }


        public string SatStartTime { get; set; }
        public string SatEndTime { get; set; }
        public bool SatClosed { get; set; }


        public string SunStartTime { get; set; }
        public string SunEndTime { get; set; }
        public bool SunClosed { get; set; }

        public bool isBHourCreated { get; set; }
        public Nullable<bool> IsDeleted { get; set; }

    }
}
