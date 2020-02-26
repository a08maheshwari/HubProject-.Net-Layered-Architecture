(function () {

    'use strict';
    angular.module('App').controller('homeController', ['$scope', '$location', '$timeout', 'authService', 'toaster', '$localStorage', '$sessionStorage',
        function ($scope, $location, $timeout, authService, toaster, $localStorage, $sessionStorage) {

            // LOGIN REGION
            $scope.loginData = {
                userName: "",
                password: ""
            };

            $scope.message = "";

            var credential = false;

            $scope.login = function () {

                authService.login($scope.loginData).then(function (res) {

                    //// INSERTING ROLE IN LOCAL STORAGE
                    if (res != null) {
                        authService.getRole($scope.loginData.userName).then(function (result) {

                            $localStorage.ROLE = result.data;
                            console.log("ROLE IN Home Controller FROM LOCAL STORAGE :" + $localStorage.ROLE);
                            debugger
                            if (result.data == "Customer") {
                                debugger;
                                authService.getCustomerId($scope.loginData.userName).then(function (rest) {
                                    debugger;
                                    $localStorage.USERID = "";
                                    $localStorage.USERID = rest.data;
                                    $location.path('/index');
                                    toaster.success('Welcome', $scope.loginData.userName);
                                });
                                $location.path('/index');
                            }
                            else if (result.data == "Professional") {
                                authService.getProfessionalId($scope.loginData.userName).then(function (rest) {
                                    debugger
                                    $localStorage.USERID = "";
                                    $localStorage.USERID = rest.data;
                                    $location.path('/index/professional_calendar');
                                    toaster.success('Welcome', $scope.loginData.userName);
                                });
                                $location.path('/index/professional_calendar');
                            }

                        }, function (err, status) {
                            toaster.alert('Unable to login due to ', err);
                            console.log(err);
                        });

                    }
                });
            }

            // SIGNUP 
            $scope.registeredSuccessfully = false;

            $scope.registration = {
                userName: "",
                password: "",
                confirmPassword: "",
            };

            // REGISTERING CUSTOMER
            $scope.signUp = function () {
                debugger;

                authService.saveRegistration($scope.registration).then(function (response) {
                    debugger;
                    $scope.registeredSuccessfully = true;
                    $scope.registration = null;
                    toaster.pop('success', "Registered Successfully", "You will be redirected for Login in few seconds.")
                    $('.close').trigger("click");
                    $scope.registerform.$setPristine();
                    $scope.registerform.$setUntouched();

                    startTimer();
                },
                 function (response) {
                     var errors = [];
                     for (var key in response.data.modelState) {
                         for (var i = 0; i < response.data.modelState[key].length; i++) {
                             errors.push(response.data.modelState[key][i]);
                         }
                     }
                     toaster.pop('error', "Failed to Register");
                 });
            };

            var startTimer = function () {
                var timer = $timeout(function () {
                    $timeout.cancel(timer);
                }, 2000);
            }

        }]);

}());
