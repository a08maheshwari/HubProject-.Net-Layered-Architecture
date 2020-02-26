(function(){

    'use strict';

    angular.module('App', ['ui.router', 'ds.clock', 'LocalStorageModule', 'ngStorage', 'angular-loading-bar', 'ngAnimate', 'ngAria', 'vsGoogleAutocomplete',
         'autocomplete', 'ngMessages', 'ngMaterial', 'ngFileUpload', 'md.data.table', 'ui.calendar',
        'vsGoogleAutocomplete', 'autocomplete', 'toaster', 'mdPickers', 'angularMoment','material.svgAssetsCache']).
    run(run).config(config).constant("moment", moment);

    config.$inject = ['$urlRouterProvider', '$stateProvider', '$httpProvider', '$mdThemingProvider'];

    function config($urlRouterProvider, $stateProvider, $httpProvider, $mdThemingProvider)
    {

        //material theme

        $mdThemingProvider.theme('altTheme')
       .primaryPalette('grey', {
           'default': '900'
       })
       .accentPalette('grey', {
           'default': '700'
       })
        .backgroundPalette('grey',{'default': '900'})
    .dark();
        $mdThemingProvider.theme('blue')
            .primaryPalette('blue', {
                'default': '50', // by default use shade 400 from the pink palette for primary intentions
                'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
                'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
                'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
            })
    .accentPalette('orange');
   
        $mdThemingProvider.setDefaultTheme('default');
        $mdThemingProvider.alwaysWatchTheme(true);



         //configuring authInterceptorService
        $httpProvider.interceptors.push('authInterceptorService');
        
        $urlRouterProvider.when('/index', '/index/customer_calendar');

        $urlRouterProvider.otherwise('/');

         $stateProvider
          .state('index', {
              url: '/index',
              templateUrl: 'SPA/partialpages/index.html',
              controller: 'indexController',
              authenticate:true
          })
         .state('home', {
            url: '/',
            templateUrl: 'SPA/partialpages/home.html',
            controller: 'homeController',
            authenticate: true
         })
        .state('customer_profile', {
           url: '/customer_profile',
           parent: 'index',
           templateUrl: 'SPA/partialpages/Customer/customer_profile.html',
           authenticate: true,
           controller: 'customerProfileController'
        })
        .state('customer_messages', {
           url: '/customer_messages',
           parent: 'index',
           templateUrl: 'SPA/partialpages/Customer/customer_messages.html',
           authenticate: true
          // controller: 'customerMessagesController'
        })
        .state('customer_calendar', {
           url: '/customer_calendar',
           parent: 'index',
           templateUrl: 'SPA/partialpages/Customer/customer_appointments.html',
           controller: 'customerAppointmnetController',
           authenticate: true
        })
        .state('search_Professional', {
            url: '/search_Professional',
            parent: 'index',
            templateUrl: 'SPA/partialpages/Customer/search_Professional.html',
            controller: 'searchController',
            authenticate: true
        })
       .state('customer_reports', {
           url: '/customer_reports',
           parent: 'index',
           templateUrl: 'SPA/partialpages/Customer/customer_reports.html',
           controller: 'customerReports',
           authenticate: true
        })
        .state('customer_payments', {
            url: '/customer_payments',
            parent: 'index',
            templateUrl: 'SPA/partialpages/Customer/customer_payments.html',
            authenticate: true
         })
         .state('customer_appointment_review', {
             url: '/customer_appointment_review',
             parent: 'index',
             templateUrl: 'SPA/partialpages/appointment_review.html',
             controller: 'appointmentReviewController',
             authenticate: true
         })
          .state('customer_reviews', {
              url: '/customer_reviews',
              parent: 'index',
              templateUrl: 'SPA/partialpages/Customer/customer_reviews.html',
              controller: 'reviewController',
              authenticate: true
          })
        // -------------------------------  PROFESSIONAL  STATES ------------------------------------------ //
         .state('professional_calendar', {
             url: '/professional_calendar',
             parent: 'index',
             templateUrl: 'SPA/partialpages/Professional/professional_calendar.html',
             controller: 'professionalAppointmentController',
             authenticate: true
         })
         .state('professional_businessHours', {
            url: '/professional_businessHours',
            parent: 'index',
            templateUrl: 'SPA/partialpages/Professional/professional_businessHours.html',
            controller: 'professionalBHoursController',
            authenticate: true
         })
         .state('professional_messages', {
             url: '/professional_messages',
             parent: 'index',
             templateUrl: 'SPA/partialpages/Professional/professional_messages.html',
          // controller: 'professionalBHoursController',
             authenticate: true
         })
          .state('professional_payment', {
              url: '/professional_payment',
              parent: 'index',
              templateUrl: 'SPA/partialpages/Professional/professional_payment.html',
              controller: 'professionalPayment',
              authenticate: true
          })
          .state('professional_reports', {
              url: '/professional_reports',
              parent: 'index',
              templateUrl: 'SPA/partialpages/Professional/professional_reports.html',
              controller: 'professionalReports',
              authenticate: true
          })
          .state('professional_profile', {
              url: '/professional_profile',
              parent: 'index',
              templateUrl: 'SPA/partialpages/Professional/professional_profile.html',
              controller: 'professionalController',
              authenticate: true
          })
         .state('book_appointments', {
             url: '/book_appointments',
             parent: 'index',
             templateUrl: 'SPA/partialpages/Customer/book_appointments.html',
             controller: 'searchController',
             authenticate: true
         })

      
     }

     run.$inject = ['authService', '$state', '$rootScope', 'toaster', '$localStorage', '$sessionStorage'];

     function run(authService, $state, $rootScope) {
         authService.fillAuthData();
         $rootScope.$on("$stateChangeStart", function (event, toState) {

             if (toState.authenticate && !authService.authFind()) {
                 // User isn’t authenticated

                 $state.transitionTo("home");
                 event.preventDefault();
             }
         });
     };

   
}());