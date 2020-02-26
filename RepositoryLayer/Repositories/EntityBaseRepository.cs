using CoreEntities;
using CoreEntities.Models;
using RepositoryLayer.Infrastructure;
using RepositoryLayer.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryLayer.Repositories
{
    public class EntityBaseRepository<T> : IEntityBaseRepository<T>
           where T : class, IEntityBase, new()
    {

        private SkilledHubDb dataContext;

        #region Properties
        protected IDbFactory DbFactory
        {
            get;
            private set;
        }

        protected SkilledHubDb DbContext
        {
            get { return dataContext ?? (dataContext = DbFactory.Init()); }
        }
        public EntityBaseRepository(IDbFactory dbFactory)
        {
            DbFactory = dbFactory;
        }
        #endregion

        public virtual IQueryable<T> GetAll()
        {
            return DbContext.Set<T>().Where(x => x.IsDeleted == false);
        }

        public virtual IQueryable<T> All
        {
            get
            {
                return GetAll();
            }
        }

        public virtual IQueryable<T> AllIncluding(params Expression<Func<T, object>>[] includeProperties)
        {
            IQueryable<T> query = DbContext.Set<T>().Where(x => x.IsDeleted == false);
            foreach (var includeProperty in includeProperties)
            {
                query = query.Include(includeProperty);
            }
            return query;
        }

        public T GetSingle(long id)
        {
            return GetAll().FirstOrDefault(x=>x.ID == id);
        }

        public virtual IQueryable<T> FindBy(Expression<Func<T, bool>> predicate)
        {
            return DbContext.Set<T>().Where(predicate).Where(x => x.IsDeleted == false);
        }

        public virtual void Add(T entity)
        {
            entity.IsDeleted = false;
            DbEntityEntry dbEntityEntry = DbContext.Entry<T>(entity);
            DbContext.Set<T>().Add(entity);
        }

        public virtual void AddRange(IEnumerable<T> entities)
        {
            foreach (var entity in entities)
            {
                entity.IsDeleted = false;
                DbEntityEntry dbEntityEntry = DbContext.Entry<T>(entity);
                DbContext.Set<T>().Add(entity);
            }
        }

        public virtual void Edit(T oldEntity, T newEntity)
        {
            //DbEntityEntry dbEntityEntry = DbContext.Entry<T>(entity);
            //dbEntityEntry.State = EntityState.Modified;
            DbContext.Entry(oldEntity).CurrentValues.SetValues(newEntity);
        }
       
        public virtual void Delete(T entity)
        {
            DbEntityEntry dbEntityEntry = DbContext.Entry<T>(entity);
            dbEntityEntry.State = EntityState.Deleted;
        }

        public virtual void SoftDelete(T entity)
        {
            entity.IsDeleted = true;
            DbEntityEntry dbEntityEntry = DbContext.Entry<T>(entity);
            dbEntityEntry.State = EntityState.Modified;
        }

    }
}
