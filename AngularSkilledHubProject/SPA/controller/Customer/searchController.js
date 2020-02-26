(function () {

    'use strict'

    angular.module('App').controller('searchController', ['CustomerService', 'authService', '$rootScope', '$state', '$scope', '$stateParams', '$localStorage', '$sessionStorage', '$filter', 'toaster',
    function (CustomerService, authService, $rootScope, $state, $scope, $stateParams, $localStorage, $sessionStorage, $filter, toaster) {
        
        //For its own dropdown and textbox
        $scope.search = {};
        $scope.appoint = {};

        //For the first time call coming from another Controller for search
        getProfessions();
        $scope.val = CustomerService.getValues();

        //Customer Clicks to check Profile
        $scope.details = function (a) {
            CustomerService.setdetails(a);
            $state.transitionTo('book_appointments');
        }

        // calling CustomerService for dropdown for skills dropdown 
        function getProfessions() {
            CustomerService.getProfessions().then(function (response) {
                $scope.ProfessionList = response.data;
            },
            function (err) {
                console.log("error in getting dropdown : " + err);
            });
        };

        //search result
        $scope.searchfun = function (search) {
            debugger;
            CustomerService.getProfessional(search).then(function (data) {
                $scope.appoint = "";
                $state.reload();
            },
            function (err) {
                console.log("error in getting professionals : " + err);
            });
        }

        //GET DETAILS OF PROFESSIONAL FOR APPOINTMENT PAGE
        $scope.prodetails = CustomerService.getdetails();

        //FIX APPOINTMENT
        $scope.saveappointment = function () {
            if ($scope.appoint) {
                //filtering data
                var date = $scope.myDate;

                $scope.myDate = $filter('date')($scope.myDate, 'MM-dd-yyyy HH:mm:ss');
                $scope.appoint.AppointmentDate = $scope.myDate;
                $scope.appoint.StartingTime = $filter('date')($scope.appoint.StartingTime, 'HH:mm:ss');
                $scope.appoint.EndingTime = $filter('date')($scope.appoint.EndingTime, 'HH:mm:ss');
                $scope.appoint.ProfessionalFkId = $scope.prodetails.ID;
                $scope.appoint.Description = $scope.appoint.description;
                $scope.appoint.CustomerFkId = authService.CId();
                $scope.appoint.status = "pending";
                if ($scope.appoint.CustomerFkId == 0)
                {
                    toaster.pop('error', "Customer", "First Create Your Profile");
                    $state.transitionTo('customer_profile');
                }
                else {
                    var response = CustomerService.setappointment($scope.appoint).then(function (response) {
                        debugger;
                        if (response.status == "200" && response.data != 0) {
                            toaster.pop('success', "Appointment", "Booked Successfully");
                            $state.transitionTo('customer_calendar');
                        }
                        else {
                            toaster.pop('error', "Failed To Book", "Try Again");
                        }
                    });
                }
            }

        };

    }]);

}());