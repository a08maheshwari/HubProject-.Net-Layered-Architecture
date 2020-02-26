(function () {
    'use strict';
    angular.module('App').controller('reviewController', ['$scope', 'AppointmentService', '$localStorage', function ($scope, AppointmentService, $localStorage) {
        $scope.firstRate = 0;
      
        $scope.reviewsdetail = [];
        $scope.rev = {};
        getproflist();
       
       
        function getproflist(reviewsdetail) {
            AppointmentService.getReviewById($localStorage.USERID).then(function (response) {
                debugger;
                $scope.reviewsdetail = response.data;
                //var tempDate = value.AppointmentDate.substring(0, 10);
                //var newDate = new Date(tempDate);
           

            })

        }
        //TESTING


       

        //Create rating

        $scope.ProvideRating = function (pid) {
            debugger;
            $scope.rev.Ratings = $scope.rev.firstRate;
            $scope.rev.CustomerFkId = $localStorage.USERID;
            debugger;
            $scope.rev.ProfessionalFkId = pid;
          
            AppointmentService.CreateRating($scope.rev).then(function (response) {

            if (response.status == '200' && response.data != 0) {
                    toaster.pop('success', "Ratings", "saved successfully");
                }
                else {
                    toaster.pop('error', "Ratings", "Failed to save");
                }

            },
            function (err) {
                toaster.pop('error', "ratings", "Failed to save");
            });

            

        }



        // getting list of professionals in reviews
        //function getReviewById() {
        //    CustomerService.getReviewById
        //}


    }]);
}());