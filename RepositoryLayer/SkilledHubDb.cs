using CoreEntities;
using CoreEntities.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer
{
    public class SkilledHubDb : DbContext
    {
        public SkilledHubDb()
            : base("AuthContext")
        {
            Database.SetInitializer<SkilledHubDb>(null);
        }

        public virtual int Commit()
        {
            return base.SaveChanges();
        }

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Professional> Professionals { get; set; }
        public DbSet<BusinessHours> BusinessHours { get; set; }
        public DbSet<JobCategory> JobCategory { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Reviews> Review { get; set; }
        public DbSet<ProfessionalList> ProfessionalList { get; set; }
        public DbSet<Appointments> Appointments { get; set; }
    }

}
