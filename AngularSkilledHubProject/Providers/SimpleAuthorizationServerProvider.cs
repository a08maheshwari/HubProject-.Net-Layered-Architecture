using AngularSkilledHubProject.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace AngularSkilledHubProject.Providers
{
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        private AuthContext _ctx = new AuthContext();

        private UserManager<IdentityUser> _userManager;

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            _userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(_ctx));

            using (AuthRepository _repo = new AuthRepository())
            {
                IdentityUser user = await _repo.FindUser(context.UserName, context.Password);

                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }

                ClaimsIdentity oAuthIdentity = await _userManager.CreateIdentityAsync(user,
                  context.Options.AuthenticationType);

                ClaimsIdentity cookiesIdentity = await _userManager.CreateIdentityAsync(user,
                    CookieAuthenticationDefaults.AuthenticationType);

                List<Claim> roles = oAuthIdentity.Claims.Where(c => c.Type == ClaimTypes.Role).ToList();
                AuthenticationProperties properties = CreateProperties(user.UserName, Newtonsoft.Json.JsonConvert.SerializeObject(roles.Select(x => x.Value)));


                AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
                context.Validated(ticket);

                // context.Request.Context.Authentication.SignIn(cookiesIdentity);

                //  var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                //  identity.AddClaim(new Claim("sub", context.UserName));
                //  identity.AddClaim(new Claim("Role", user.Roles.Select(x=>x.RoleId).ToString()));

                ////context.Validated(identity);

                //  List<Claim> roles = identity.Claims.Where(c => c.Type == ClaimTypes.Role).ToList();
                //  AuthenticationProperties properties = CreateProperties(user.UserName, Newtonsoft.Json.JsonConvert.SerializeObject(roles.Select(x => x.Value)));

                //  AuthenticationTicket ticket = new AuthenticationTicket(identity, properties);
                //  context.Validated(ticket);
            }
        }

        public static AuthenticationProperties CreateProperties(string userName, string Roles)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { "userName", userName },
                { "roles", Roles}
            };

            return new AuthenticationProperties(data);
        }
    }
}