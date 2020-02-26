(function () {

    'use strict';
    angular.module('App').controller('professionalAppointmentController', ['$scope', '$http', '$state', '$location', 'uiCalendarConfig', 'AppointmentService', '$localStorage', '$mdDialog',
     function ($scope, $http, $state, $location, uiCalendarConfig, AppointmentService, $localStorage, $mdDialog) {

         // CALENDAR EVENTS
         $scope.SelectedAppointment = null;
         var isFirstTime = true;
         $scope.appointments = [];
         $scope.appointmentSources = [$scope.appointments];
         getappointment();

         //Load events from server
         function getappointment() {

             AppointmentService.getAllAppointmentByIdForProfessional($localStorage.USERID).then(function (data)
             {
                 $scope.appointments.slice(0, $scope.appointments.length);
                 angular.forEach(data.data, function (value) {

                     //FORMATTING  
                     var tempDate = value.AppointmentDate.substring(0, 10);
                     var newDate = new Date(tempDate);

                     $scope.appointments.push
                     ({
                         appointmentid: value.ID,
                         title: value.Description,
                         start: newDate,
                         stick: true
                     });
                 });
             });
         }

         //configure calendar
         $scope.uiConfig = {
             calendar: {
                 displayEventTime: true,
                 eventClick: function (appointment) {
                     debugger;
                     $scope.SelectedAppointment = appointment;
                     showCustom(appointment);
                 },
                 eventAfterAllRender: function () {
                     if ($scope.appointments.length > 0 && isFirstTime)
                     {
                         uiCalendarConfig.calendars.myCalendar.fullCalendar('gotoDate', $scope.appointments[0].start);
                         isFirstTime = false;
                     }
                 }
             }
         };

         // CUSTOM EVENT FOR CALENDAR APPOINTMENT
         function showCustom(appointment) {

             // GETTING APPOINTMENT BY APPOINTMENT ID
             AppointmentService.getappointmentById(appointment.appointmentid).then(function (response) {

                 $scope.appointmentReview = response.data;
              
                 $mdDialog.show({
                     clickOutsideToClose: true,
                     scope: $scope,
                     preserveScope: true,
                     templateUrl: 'SPA/partialpages/appointment_review.html',
                     controller: function DialogController($scope, $mdDialog)
                     {
                         //SETTING APPOINTMENT STATUS VALUE FOR DYNAMIC VIEW
                         $scope.appointmentStatus = $scope.appointmentReview.status;
                         debugger;
                         $scope.closeDialog = function () {
                             $mdDialog.hide();
                         }

                         // FOR  ACCEPTING  APPOINTMENT
                         $scope.accept = function()
                         {
                             debugger;
                             $scope.appointmentReview.status = "accepted"
                             $scope.appointmentStatus = "1"
                             AppointmentService.acceptAppointment($scope.appointmentReview).then(function (response) {
                                 $state.reload();
                                 debugger;
                             });
                         }

                         // FOR  DECLINING  APPOINTMENT
                         $scope.decline = function () {
                             debugger;
                             $scope.appointmentReview.status = "declined"
                             $scope.appointmentStatus = "0"
                             AppointmentService.declineAppointment($scope.appointmentReview).then(function (response) {
                                 $state.reload();
                                 debugger;
                             });
                         }
                     }
                 });
             });

         };

     }]);

}());