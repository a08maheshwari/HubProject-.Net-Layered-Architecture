using Ninject.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularSkilledHubProject
{
    public class DependencyResolver : NinjectModule
    {
        public override void Load()
        {
            //Bind<RepositoryLayer.Repositories.Interfaces.ICustomerRepository>().To<RepositoryLayer.Repositories.CustomerRepository>();
            //Bind<ServiceLayer.Interfaces.ICustomerService>().To<ServiceLayer.Services.CustomerService>();
        }
    }
}

//.InRequestScope()