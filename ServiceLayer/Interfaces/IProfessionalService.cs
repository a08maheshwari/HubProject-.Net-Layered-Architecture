using CoreEntities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Interfaces
{
    public interface IProfessionalService
    {
        long CreateProfessional(Professional professional);

        Professional GetProfessionalById(long ProfessionalId);

        long UpdateProfessional(Professional professional);
    }
}
