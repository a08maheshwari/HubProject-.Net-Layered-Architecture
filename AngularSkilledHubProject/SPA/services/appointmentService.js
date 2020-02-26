(function () {

    'use strict';
    angular.module('App').factory('AppointmentService', ['$http',
    function ($http) {
      
        var ServiceFactory = {};

        // GET ALL APPOINTMENT FRO CUSTOMER CALENDAR
        var _getAllAppointmentById = function (id) {
            return $http({
                url: '/api/Appointment/getAllAppointmentById/',
                method: "GET",
                params: { id: id }
            }).then(function (response) {
                return response;
            });
        }

        // GET ALL APPOINTMENT FOR Professional CALENDAR
        var _getAllAppointmentByIdForProfessional = function (id) {
            debugger;
            return $http({
                url: '/api/Appointment/getAllAppointmentForProfessional/',
                method: "GET",
                params: { id: id }
            }).then(function (response) {
                return response;
            });

        }

        // GET APPOINTMENT FOR MODAL POPUP - APPOINTMENT REVIEW
        var _getappointmentById = function (id) {
            debugger;
            return $http({
                url: '/api/Appointment/getAppointmentById/',
                method: "GET",
                params: { id: id }
            }).then(function (response) {
                return response;
            });
        }

        // GET PROFESSIONALLIST FOR REVIEW
        var _getreviewById = function (id) {
            return $http({
                url: '/api/Review/getReviewById/',
                method: "GET",
                params: { id: id }
            }).then(function (response) {
                return response;
            });
        }


        // CREATE RATINGS
        var _createRatings = function (reviews) {
            debugger;
            return $http.post('/api/Review/CreateRating', reviews).then(function (response) {
                return response;
            });

        };


        // UPDATE Appointment STATUS TO ACCEPT
        var _acceptAppointment = function (appointment) {
            return $http.put('/api/Appointment/acceptAppointmentStatus', appointment).then(function (response) {
                return response;
            });
        };

        // UPDATE Appointment STATUS TO DECLINE
        var _declineAppointment = function (appointment) {
            return $http.put('/api/Appointment/declineAppointmentStatus', appointment).then(function (response) {
                return response;
            });
        };

        ServiceFactory.getAllAppointmentById = _getAllAppointmentById;
        ServiceFactory.getAllAppointmentByIdForProfessional = _getAllAppointmentByIdForProfessional;
        ServiceFactory.getappointmentById = _getappointmentById;
        ServiceFactory.getReviewById = _getreviewById;
        ServiceFactory.CreateRating = _createRatings;
        ServiceFactory.acceptAppointment = _acceptAppointment;
        ServiceFactory.declineAppointment = _declineAppointment;

        return ServiceFactory;

    }]);

}());