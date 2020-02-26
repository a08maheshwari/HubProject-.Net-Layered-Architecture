(function () {

    'use strict'
    angular.module('App').controller('customerProfileController', ['$scope', 'CustomerService', 'Upload', 'toaster', 'localStorageService', '$localStorage', '$sessionStorage',
        function ($scope, CustomerService, Upload, toaster, localStorageService, $localStorage, $sessionStorage) {
            debugger;
            $scope.customer = {};
            $scope.isCustomerCreated = false;

            // GETTING ID FROM LOCAL STORAGE
            var id = $localStorage.USERID;
            console.log("Id in Customer : " + id);

            getCustomerById();

            var uniqueUserName = localStorageService.get('authorizationData');

            // CREATING CUSTOMER
            $scope.createCustomer = function (file) {
                console.log(file);
                file.upload = Upload.upload({
                    url: '/api/Values/uploadProfile',
                    data: { file: file }
                });

                file.upload.then(function (response) {
                    debugger
                    $scope.customer.CustomerImage = response.data;
                    $scope.customer.UserName = uniqueUserName.userName;
                    $scope.customer.isCustomerCreated = true;

                    CustomerService.save($scope.customer).then(function (response) {
                        debugger;
                        if (response.status == '200' && response.data != 0) {
                            debugger
                            // INSERTING CUSTOMER CREATED-ID IN LOCAL STORAGE
                            $localStorage.USERID = response.data;
                            $scope.isCustomerCreated = true;
                            toaster.pop('success', "Profile", "Created Successfully");
                        }
                        else {
                            $scope.isCustomerCreated = false;
                            toaster.pop('error', "Profile", "Failed to Create");
                        }
                    },
                     function (err) {
                         $scope.isCustomerCreated = false;
                         toaster.pop('error', "Profile", "Failed to Create");
                         debugger;
                     });
                })

            }

            // UPDATING CUSTOMER
            $scope.updateCustomer = function (file) {
                console.log(file);
                file.upload = Upload.upload({
                    url: '/api/Values/uploadProfile',
                    data: { file: file }
                });

                file.upload.then(function (response) {
                    debugger
                    $scope.customer.CustomerImage = response.data;
                    $scope.customer.UserName = uniqueUserName.userName;
                    $scope.customer.isCustomerCreated = true;

                    CustomerService.updateCustomer($scope.customer).then(function (response) {
                        debugger;
                        if (response.status == '200' && response.data == $scope.customer.ID) {
                            $localStorage.USERID = response.data;
                            $scope.isCustomerCreated = true;
                            toaster.pop('success', "Profile", "Updated Successfully");
                        }
                        else {
                            console.log("Error in updation customer : " + response.status);
                            toaster.pop('error', "Profile", "Failed to Update");
                        }
                    },
                     function (err) {
                         toaster.pop('error', "Profile", "Failed to Update");
                         debugger;
                     });
                })
            }

            // GETTING CUSTOMER BY ID
            function getCustomerById() {

                CustomerService.getCustomerById($localStorage.USERID).then(function (response) {
                    $scope.customer = response.data;
                    var iscreated = response.data.isCustomerCreated;
                    if (iscreated) {
                        $scope.isCustomerCreated = true;
                    }
                    else {
                        $scope.isCustomerCreated = false;
                    }
                },
                function (err) {
                    console.log("error in getting customer values by id : " + err);
                });
            }

        }]);

}());