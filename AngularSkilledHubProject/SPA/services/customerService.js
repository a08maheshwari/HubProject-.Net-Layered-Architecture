(function () {

    'use strict';
    angular.module('App').factory('CustomerService', ['$http', '$q', 'localStorageService',
    function ($http, $q, localStorageService) {

        var ServiceFactory = {};
        var searchresult = [];
        var appdetails = {};

        // CREATE CUSTOMER
        var _createCustomer = function (customer) {
            debugger
            return $http.post('/api/Customer/createCustomer', customer).then(function (response) {
                return response;
            });
        };

        // UPDATE CUSTOMER
        var _updateCustomer = function (customer) {
            return $http.put('/api/Customer/UpdateCustomer', customer).then(function (response) {
                return response;
            });
        };

        // GET PROFESSIONS
        var _getProfessions = function () {
            return $http.get('/api/Values/getProfessions').then(function (response) {
                return response;
            });
        };

        // GET CUSTOMER BY ID
        var _getCustomerById = function (Id) {

            return $http({
                url: '/api/Customer/GetCustomerById/',
                method: "GET",
                params: { Id: Id }
            }).then(function (response) {
                return response;
            });

        };

        //search serverside for matching professional profile as per customer request
        var _getProfessional = function (search) {

            var keepgoing = true;
            var a = search.locations;
            var loc = "";

            angular.forEach(a, function (value, index) {
                angular.forEach(value, function (letters, indexing) {
                    if (keepgoing) {
                        if (letters != ',') {
                            loc = loc + letters;
                        }
                        else {
                            keepgoing = false;
                        }
                    }
                })
            });

            return $http.get('/api/Values/GetMatchProfile?ProfessionName=' + search.ProfessionName + '&ProfessionalLocation=' + loc)
              .then(function (response) {
                  debugger;

                  searchresult = "";
                  searchresult = response.data;
                  return response.data;

              }, function (err, status) {
                  debugger
                  console.log(err);
              });
        };

        //searched data in variables
        ServiceFactory.getValues = function () {
            return searchresult;
        }

        //Profile of Professional in Appointment page
        var _setdetails = function (prodetails) {
            appdetails = prodetails;
        }

        //Retrieve profile of selected Professional
        ServiceFactory.getdetails = function () {
            return appdetails;
        }

        // SET APPOINTMENT
        var _setappointment = function (appointed) {
            debugger;
            return $http.post('/api/Appointment/fixAppointment', appointed).then(function (response) {
                return response;
            });
        }

        ServiceFactory.save = _createCustomer;
        ServiceFactory.updateCustomer = _updateCustomer
        ServiceFactory.getProfessions = _getProfessions;
        ServiceFactory.getProfessional = _getProfessional;
        ServiceFactory.getCustomerById = _getCustomerById;
        ServiceFactory.setappointment = _setappointment;
        ServiceFactory.setdetails = _setdetails;

        return ServiceFactory;

    }]);

}());