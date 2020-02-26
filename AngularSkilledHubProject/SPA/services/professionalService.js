(function () {

    'use strict';
    angular.module('App').factory('ProfessionalService', ['$http', '$q', function ($http, $q) {

        var ServiceFactory = {};

        // GET PROFESSIONAL BY ID
        var _GetProfessionalById = function (ProfessionalId) {
            return $http({
                url: '/api/Professional/GetProfessionalById',
                method: "GET",
                params: { ProfessionalId: ProfessionalId }
            }).then(function (response) {
                debugger;
                return response;
            });
        };

        // CREATE PROFESSIONAL
        var _createProfessional = function (professional) {
            return $http.post('/api/Professional/CreateProfessional', professional).then(function (response) {
                debugger
                return response;
            });
        };


        // UPDATE PROFESSIONAL
        var _updateProfessional = function (professional) {
            return $http.put('/api/Professional/UpdateProfessional', professional).then(function (response) {
                return response;
            });
        };


        // CREATE BUSINESS-HOURS
        var _createBusinessHours = function (businesshour) {
            return $http.post('/api/BusinessHour/CreateBusinessHours', businesshour).then(function (response) {
                return response;
            });
        };


        // UPDATE BUSINESS-HOURS
        var _updateBusinessHours = function (businesshour) {
            return $http.put('/api/BusinessHour/UpdateBusinessHours', businesshour).then(function (response) {
                return response;
            });
        };


        // GET BUSINESS-HOURS
        var _getBusinessHours = function (ProfessionalId) {
            return $http({
                url: '/api/Values/getBusinessHours',
                method: "GET",
                params: { ProfessionalId: ProfessionalId }
            }).then(function (response) {
                return response;
            });
        };


        ServiceFactory.saveProfessional = _createProfessional;
        ServiceFactory.updateProfessional = _updateProfessional;
        ServiceFactory.createBusinessHours = _createBusinessHours;
        ServiceFactory.updateBusinessHours = _updateBusinessHours;
        ServiceFactory.getBusinessHours = _getBusinessHours;
        ServiceFactory.GetProfessionalById = _GetProfessionalById;

        return ServiceFactory;
    }]);

}());