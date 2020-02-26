using System.Web;
using System.Web.Optimization;

namespace AngularSkilledHubProject
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                      "~/Scripts/jquery-3.1.1.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/jquery-ui-1.12.1.js",
                      "~/Scripts/angular.js",
                      "~/Scripts/angular-ui-router.js",
                      "~/Scripts/angular-route.js",
                      "~/Scripts/angular-animate.js",
                      "~/Scripts/angular-aria.js",
                      "~/Scripts/angular-ui/ui-bootstrap.js",
                      "~/Scripts/loading-bar.js",
                      "~/Scripts/angular-local-storage.js",
                      "~/Scripts/modernizr-2.7.1.js",
                      "~/Scripts/toaster.js",
                      "~/Scripts/autocomplete.js",
                      "~/Scripts/md-data-table/md-data-table.js",
                      "~/Scripts/angular-messages.js",
                      "~/Scripts/angular-touch.js",
                      "~/Scripts/jquery.validate.js",
                      "~/Scripts/ng-file-upload.js",
                      "~/Scripts/ng-file-upload-shim.js",
                      "~/Scripts/ngStorage.js",
                      "~/Scripts/moment.js",
                      "~/Scripts/angular-moment.js",
                      "~/Scripts/svg-assets-cache.js",
                       "~/Scripts/jk-rating-stars.min (1).js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/ui-bootstrap-csp.css",
                      "~/Content/jquery/jquery-ui.min.css",
                      "~/Content/loading-bar.css",
                      "~/Content/theme-default.css",
                      "~/Content/animate/animate.css",
                      "~/Content/angular-material.css",
                      "~/Content/blueimp/blueimp-gallery.min.css",
                      "~/Content/font-awesome.css",
                      "~/Content/fullcalendar.css",
                      "~/Content/mcustomscrollbar/jquery.mCustomScrollbar.css",
                      "~/Content/codemirror/codemirror.css",
                      "~/Content/summernote/summernote.css",
                      "~/Content/dropzone/dropzone.css",
                      "~/Content/nvd3/nv.d3.css",
                      "~/Content/rickshaw/rickshaw.css",
                      "~/Content/main.css",
                      "~/Content/loginRegister.css",
                      "~/Content/fullcalendar.css",
                      "~/Content/toaster.css",
                      "~/Content/clock/angular-clock.css",
                      "~/Content/themes/base/accordion.css",
                      "~/Content/themes/base/autocomplete.css",
                      "~/Content/custom/customstyle.css",
                      "~/Content/md-data-table/md-data-table.css",
                      "~/Content/bootstrap-material-datetimepicker.css",
                        "~/Content/time/mdPickers.min.css",
                        "~/Content/jk-rating-stars.min.css",
                        "~/Content/review.css"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/myAngular").Include(
                         "~/SPA/App.js",
                         "~/SPA/controller/homeController.js",
                         "~/SPA/controller/indexController.js",
                         "~/SPA/controller/timeController.js"
                         ));

            bundles.Add(new ScriptBundle("~/bundles/Customer").Include( 
                        "~/SPA/controller/Customer/customerAppointmnetController.js",
                        "~/SPA/controller/Customer/customerController.js",
                        "~/SPA/controller/Customer/customerReports.js",
                        "~/SPA/controller/Customer/searchController.js",
                        "~/SPA/controller/Customer/reviewsController.js"));

            bundles.Add(new ScriptBundle("~/bundles/Professional").Include(
                       "~/SPA/controller/Professional/professionalAppointmentController.js",
                       "~/SPA/controller/Professional/professionalBusinessHours.js",
                       "~/SPA/controller/Professional/professionalController.js",
                       "~/SPA/controller/Professional/professionalReports.js",
                       "~/SPA/controller/Professional/professional_payments.js"));

            bundles.Add(new ScriptBundle("~/bundles/Services").Include(
                        "~/SPA/services/authService.js",
                        "~/SPA/services/authInterceptorService.js",
                        "~/SPA/services/professionalService.js",
                        "~/SPA/services/customerService.js",
                        "~/SPA/services/appointmentService.js",
                        "~/SPA/services/reportsService.js"));

            bundles.Add(new ScriptBundle("~/bundles/Directives").Include(
                        "~/SPA/directives/directives.js",
                        "~/SPA/directives/passwordMatch.js",
                        "~/SPA/directives/usernameAuthenticate.js"));

            bundles.Add(new ScriptBundle("~/bundles/templatejs").Include(
                        "~/Scripts/templateJs/actions.js",
                        "~/Scripts/blueimp/jquery.blueimp-gallery.min.js",
                        "~/Scripts/icheck/icheck.min.js",
                        "~/Scripts/mCustomScrollbar/jquery.mCustomScrollbar.min.js",
                        "~/Scripts/scrolltotop/scrolltopcontrol.js",
                        "~/Scripts/templateJs/demo_dashboard.js",
                        "~/Scripts/templateJs/demo_icons.js",
                        "~/Scripts/templateJs/plugins.js",
                        "~/Scripts/clock/angular-clock.js",
                        "~/Scripts/customjs/customjs.js",
                         "~/Content/time/mdPicker.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularMaterial").Include(
                      "~/Scripts/angular-material/angular-material.js",
                      "~/Scripts/angular-material/angular-material-mocks.js"));

            bundles.Add(new ScriptBundle("~/bundles/landingpageJs").Include(
                       "~/Scripts/landingpageJs/main.js",
                       "~/Scripts/landingpageJs/wow.min.js"));

             bundles.Add(new ScriptBundle("~/bundles/calendar").Include(
                   "~/Scripts/moment.js",
                    "~/Scripts/calendar.js",
                    "~/Scripts/fullcalendar.js",
                    "~/Scripts/gcal.js",
                    "~/Scripts/material_datepicker/bootstrap-material-datetimepicker.js",
                    "~/Scripts/material_datepicker/moment-with-locales.js"));

             bundles.Add(new ScriptBundle("~/bundles/googleapi").Include(
                     "~/Scripts/vs-google-autocomplete.js",
                     "~/Scripts/vs-google-autocomplete.js"
                     )); 

        }
    }
}
