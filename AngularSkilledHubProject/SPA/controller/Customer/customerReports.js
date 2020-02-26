(function () {

    'use strict';
    angular.module('App').controller('customerReports', ['$scope', '$http', '$state', 'reportService','$localStorage', '$sessionStorage',
     function ($scope, $http, $state, reportService, $localStorage, $sessionStorage) {

         $scope.reports = [];

         getCustomerReports();

         function getCustomerReports()
         {
             debugger
             reportService.getAllCustomerReportsById($localStorage.USERID).then(function (response) {

                 if (response.data != null && response.status == "200") {

                     angular.forEach(response.data, function (value)
                     {
                         debugger;
                         //FORMATTING  DATE
                         var tempDate = value.AppointmentDate.substring(0, 10);

                         $scope.reports.push
                         ({
                             CompanyName: value.CompanyName,
                             AppointmentDate: tempDate,
                             TotalHours: value.TotalHours,
                             TotAmount: value.TotAmount,
                             PaymentStatus: value.PaymentStatus
                         });
                     });

                    // $scope.reports = response.data;
                 }
             });
         }

     }]);

}());