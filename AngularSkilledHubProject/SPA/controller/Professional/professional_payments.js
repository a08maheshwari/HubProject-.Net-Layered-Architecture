(function () {

    'use strict'

    angular.module('App').controller('professionalPayment', ['$scope', '$http', '$state', '$location', '$localStorage', '$mdDialog', 'reportService',
     function ($scope, $http, $state, $location, $localStorage, $mdDialog, reportService)
     {

         $scope.reports = [];

         getProfessionalReports();

         function getProfessionalReports()
         {
             debugger
             reportService.getAllProfessionalReportsById($localStorage.USERID).then(function (response)
             {debugger
                 if (response.data != null && response.status == "200")
                 {
                     angular.forEach(response.data, function (value)
                     {
                         debugger;
                         //FORMATTING  DATE
                         var tempDate = value.AppointmentDate.substring(0, 10);
                         $scope.reports.push
                         ({
                             AppointmentId: value.AppointmentId,
                             CustomerName: value.CustomerName,
                             AppointmentDate: tempDate,
                             TotalHours: value.TotalHours,
                             TotAmount: value.TotAmount,
                             PaymentStatus: value.paymentStatus
                         });
                     });
                 }
             });
         }


        // CUSTOM EVENT FOR CALENDAR APPOINTMENT
         $scope.showInvoiceDialog = function (AppointmentId)
         {
             debugger
            
            // GETTING APPOINTMENT BY APPOINTMENT ID
             AppointmentService.getappointmentById(appointment.appointmentid).then(function (response)
             {
                $scope.appointmentReview = response.data;

                $mdDialog.show({
                    clickOutsideToClose: true,
                    scope: $scope,
                    preserveScope: true,
                    templateUrl: 'SPA/partialpages/invoice.html',
                    controller: function InvoiceController($scope, $mdDialog) {

                        //SETTING APPOINTMENT STATUS VALUE FOR DYNAMIC VIEW
                        $scope.appointmentStatus = $scope.appointmentReview.status;
                        debugger;
                        $scope.closeDialog = function () {
                            $mdDialog.hide();
                        }
                    }
                });
            });
        };

     }]);

})();