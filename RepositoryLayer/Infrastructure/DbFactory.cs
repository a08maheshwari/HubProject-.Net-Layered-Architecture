using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Infrastructure
{
    public class DbFactory : Disposable, IDbFactory
    {
        SkilledHubDb dbContext;

        public SkilledHubDb Init()
        {
            return dbContext ?? (dbContext = new SkilledHubDb());
        }

        protected override void DisposeCore()
        {
            if (dbContext != null)
                dbContext.Dispose();
        }
    }
}
