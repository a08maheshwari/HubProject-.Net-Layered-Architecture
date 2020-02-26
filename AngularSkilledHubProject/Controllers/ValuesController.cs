using AngularSkilledHubProject.Models;
using CoreEntities;
using CoreEntities.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using ServiceLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace AngularSkilledHubProject.Controllers
{
    [RoutePrefix("api/Values")]
    public class ValuesController : ApiController
    {
        private AuthContext _ctx = new AuthContext();

        private UserManager<IdentityUser> _userManager;

        private ICustomerService _customerService;
        private IProfessionalService _professionalService;
        private ICommonService _commonService;

        public ValuesController
        (
            ICustomerService _CustomerService, 
            IProfessionalService _ProfessionalService, 
            ICommonService _CommonService
        )
        {
            this._customerService = _CustomerService;
            this._professionalService = _ProfessionalService;
            this._commonService = _CommonService;
        }

        /// <summary>
        /// This method is for getting Role based on username
        /// </summary>
        /// <param name="username">username</param>
        /// <returns>Retuurns role</returns>
        [Route("RoleType")]
        public IHttpActionResult Get(string username)
        {
            try
            {
                _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_ctx));

                var user = _ctx.Users.Where(u => u.UserName.Equals(username, StringComparison.CurrentCultureIgnoreCase)).FirstOrDefault();
                var RolesForThisUser = _userManager.GetRoles(user.Id).FirstOrDefault();

                return Ok(RolesForThisUser.ToString());
            }
            catch (Exception)
            {
                return StatusCode(HttpStatusCode.NotFound);
            }

        }


        /// <summary>
        /// For uploading a image
        /// </summary>
        /// <returns>Returns uploaded image filename</returns>
        [Route("uploadProfile")]
        public string Post()
        {
            try
            {
                var file = HttpContext.Current.Request.Files.Count > 0 ?
                            HttpContext.Current.Request.Files[0] : null;

                if (file != null && file.ContentLength > 0)
                {
                    var fileName = Guid.NewGuid().ToString() + Path.GetFileName(file.FileName);

                    var path = Path.Combine(
                        HttpContext.Current.Server.MapPath("~/UploadedProfile"),
                        fileName
                    );

                    file.SaveAs(path);
                    return "UploadedProfile/" + fileName;
                }
                return null;
            }
            catch (Exception)
            {
                return null;
            }
        }


        /// <summary>
        /// For getting all Job List
        /// </summary>
        /// <returns>Returns list of type professions</returns>
        [Route("getProfessions")]
        public IHttpActionResult Get()
        {
            try
            {
                return Ok(_commonService.GetAllProfessions());
            }
            catch (Exception)
            {
                return StatusCode(HttpStatusCode.NoContent);
            }
           
        }


        /// <summary>
        /// For getting ID based on username
        /// </summary>
        /// <param name="userName">Username</param>
        /// <returns>Returns an ID based on username</returns>
        [Route("customerId")]
        public IHttpActionResult getCustomerId(string userName)
        {
            try
            {
                return Ok(_commonService.getCustomerId(userName));
            }
            catch (Exception)
            {
                return BadRequest("InvalID username");
            }
           
        }


        /// <summary>
        /// For getting professional ID based on username
        /// </summary>
        /// <param name="userName">Username</param>
        /// <returns>Returns ProfessionalID</returns>
        [Route("professionalId")]
        public IHttpActionResult getProfessionalId(string userName)
        {
            try
            {
                if (userName != null )
                {
                    return Ok(_commonService.getProfessionalId(userName));
                }
                return BadRequest("InvalID Username");
            }
            catch (Exception)
            {
                return NotFound();
            }   
            
        }


        /// <summary>
        /// For getting BusinessHours for particular Professional
        /// </summary>
        /// <param name="ProfessionalID">ProfessionalID</param>
        /// <returns>Returns BusinessHours of particular professional</returns>
        [Route("getBusinessHours")]
        public IHttpActionResult Get(long ProfessionalId)
        {
            try
            {
                if (ProfessionalId != 0)
                {
                    return Ok(_commonService.GetBusinessHours(ProfessionalId));
                }
                return BadRequest("InvalID ProfessionalId"); 
            }
            catch (Exception)
            {
                return NotFound();
            }
        }


        /// <summary>
        /// For getting Matched Professional
        /// </summary>
        /// <param name="ProfessionName"></param>
        /// <param name="ProfessionalLocation"></param>
        /// <returns>Returns Matched Professionals List</returns>
        [Route("GetMatchProfile")]
        public IHttpActionResult Get(string ProfessionName, string ProfessionalLocation)
        {
            try
            {
                if (ProfessionName != null && ProfessionalLocation != null)
                {
                    var b = _commonService.GetMatchedProfessionals(ProfessionName, ProfessionalLocation);
                    return Ok(b.ToList());
                }
                return BadRequest("InvalID ProfessionName and ProfessionalLocation");
            }
            catch (Exception)
            {
                return NotFound();
            }
        }
         

        /// <summary>
        /// For Getting Customer Reports
        /// </summary>
        /// <param name="Id">long Id</param>
        /// <returns>Returns ReportsViewModel type List </returns>
        [Route("getCustomerReports")]
        public IHttpActionResult GetCustomerReports(long Id)
        {
            try
            {
                if (Id != 0)
                {
                    return Ok(_commonService.GetCustomerReports(Id));
                }
                return BadRequest("Invalid Id");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return NotFound();
            }
           
        }


        /// <summary>
        /// For Getting Professional Reports
        /// </summary>
        /// <param name="Id">long Id</param>
        /// <returns>Returns ReportsViewModel type List </returns>
        [Route("getProfessionalReports")]
        public IHttpActionResult GetProfessionalReports(long Id)
        {
            try
            {
                if (Id != 0)
                {
                    return Ok(_commonService.GetProfessionalReports(Id));
                }
                return BadRequest("Invalid Id");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.StackTrace);
                return NotFound();
            }

        }

        /// <summary>
        /// For Generating Invoice
        /// </summary>
        /// <param name="id">long id</param>
        /// <returns>Return particula</returns>
        [Route("generateInvoice")]
        public IHttpActionResult GenerateInvoice(long id)
        {
            return Ok();
        }
    }
}
