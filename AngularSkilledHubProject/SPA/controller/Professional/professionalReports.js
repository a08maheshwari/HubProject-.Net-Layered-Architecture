(function () {

    'use strict'
    angular.module('App').controller('professionalReports', ['$scope', 'reportService', '$localStorage', '$sessionStorage',
        function ($scope, reportService, $localStorage, $sessionStorage) {

            $scope.reports = [];

            getProfessionalReports();

            function getProfessionalReports()
            {
                reportService.getAllProfessionalReportsById($localStorage.USERID).then(function (response)
                {
                    if (response.data != null && response.status == "200")
                    {
                        angular.forEach(response.data, function (value)
                        {
                            debugger;
                            //FORMATTING  DATE
                            var tempDate = value.AppointmentDate.substring(0, 10);

                            $scope.reports.push
                            ({
                                CustomerName: value.CustomerName,
                                AppointmentDate: tempDate,
                                TotalHours: value.TotalHours,
                                TotAmount: value.TotAmount,
                                PaymentStatus: value.PaymentStatus
                            });
                        });
                    }
                });
            }

        }]);

}());