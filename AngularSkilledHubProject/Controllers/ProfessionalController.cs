using CoreEntities;
using ServiceLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AngularSkilledHubProject.Controllers
{
    [Authorize]
    [RoutePrefix("api/Professional")]
    public class ProfessionalController : ApiController
    {
        private IProfessionalService _professionalService;

        public ProfessionalController(IProfessionalService _ProfessionalService)
        {
            _professionalService = _ProfessionalService;
        }


        /// <summary>
        /// For creating professional
        /// </summary>
        /// <param name="professional"></param>
        /// <returns>Return newly created resource ID.</returns>
        [Route("CreateProfessional")]
        public IHttpActionResult Post(Professional professional)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    return Ok(_professionalService.CreateProfessional(professional));
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.StackTrace);
                    return StatusCode(HttpStatusCode.Forbidden);
                }
            }
            else
            {
                return BadRequest("All fields are required...Try Again!");
            }
        }


        /// <summary>
        /// For getting professional by ID.
        /// </summary>
        /// <param name="ProfessionalID">ProfessionalID</param>
        /// <returns>Returns Professsional object based on ID</returns>
        [Route("GetProfessionalById")]
        public IHttpActionResult Get(long ProfessionalId)
        {
            if (ProfessionalId == 0)
            {
                return BadRequest("InvalID ID of Professional");
            }
            else
            {
                try
                {
                    return Ok(_professionalService.GetProfessionalById(ProfessionalId));
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.StackTrace);
                }
            }

        }


        /// <summary>
        /// For Updating Professional
        /// </summary>
        /// <param name="professional"></param>
        /// <returns>Returns updated professional ID.</returns>
        [Route("UpdateProfessional")]
        public IHttpActionResult Put(Professional professional)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    return Ok(_professionalService.UpdateProfessional(professional));
                }
                else
                {
                    return StatusCode(HttpStatusCode.Forbidden);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.StackTrace);
            }

        }


    }
}
