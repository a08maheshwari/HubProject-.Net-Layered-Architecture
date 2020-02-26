(function () {

    'use strict';
    angular.module('App').factory('reportService', ['$http',
    function ($http) {

        var ServiceFactory = {};

        // GET ALL REPORTS FOR CUSTOMER BY ID
        var _getAllCustomerReportsById = function (id) {
            return $http({
                url: '/api/Values/getCustomerReports/',
                method: "GET",
                params: { Id: id }
            }).then(function (response) {
                debugger
                return response;
            });
        }


        // GET ALL REPORTS FOR PROFESSIONAL BY ID
        var _getAllProfessionalReportsById = function (id) {
            return $http({
                url: '/api/Values/getProfessionalReports/',
                method: "GET",
                params: { Id: id }
            }).then(function (response) {
                debugger
                return response;
            });
        }

      
        ServiceFactory.getAllCustomerReportsById = _getAllCustomerReportsById;
        ServiceFactory.getAllProfessionalReportsById = _getAllProfessionalReportsById;
        return ServiceFactory;

    }]);

}());