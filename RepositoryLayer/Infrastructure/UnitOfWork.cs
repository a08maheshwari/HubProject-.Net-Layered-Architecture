using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDbFactory dbFactory;
        private SkilledHubDb dbContext;

        public UnitOfWork(IDbFactory dbFactory)
        {
            this.dbFactory = dbFactory;
        }

        public SkilledHubDb DbContext
        {
            get { return dbContext ?? (dbContext = dbFactory.Init()); }
        }

        public int Commit()
        {
            return DbContext.Commit();
        }

    }
}
