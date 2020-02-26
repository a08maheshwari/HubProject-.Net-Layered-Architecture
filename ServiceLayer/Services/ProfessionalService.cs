using CoreEntities;
using RepositoryLayer.Infrastructure;
using RepositoryLayer.Repositories.Interfaces;
using ServiceLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Services
{
    public class ProfessionalService : IProfessionalService
    {
        private readonly IEntityBaseRepository<Professional> _professionalRepository;
        private readonly IUnitOfWork _unitOfWork;
        public ProfessionalService(
            IEntityBaseRepository<Professional> professionalRepository,
            IUnitOfWork unitOfWork
            )
        {
            _professionalRepository = professionalRepository;
            _unitOfWork = unitOfWork;
        }
        public long CreateProfessional(Professional professional)
        {
            try
            {
                 _professionalRepository.Add(professional);
                var created = _unitOfWork.Commit();
                if (created != 0)
                {
                    return professional.ID;
                }
                return 0;
            }
            catch (Exception)
            {
                return 0;
            }
        }

        public Professional GetProfessionalById(long ProfessionalId)
        {
            try
            {
                return _professionalRepository.GetSingle(ProfessionalId);
            }
            catch (Exception)
            {
                return new Professional();
            }
        }

        public long UpdateProfessional(Professional professional)
        {
            try
            {
                var oldData = _professionalRepository.FindBy(x => x.ID == professional.ID).FirstOrDefault();
                _professionalRepository.Edit(oldData, professional);
               var edited =  _unitOfWork.Commit();
               if (edited != 0)
               {
                   return professional.ID;
               }
                return 0;
            }
            catch (Exception)
            {
                return 0;
            }
        }

    }
}
