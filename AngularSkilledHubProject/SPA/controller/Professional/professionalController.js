(function () {

    'use strict'
    angular.module('App').controller('professionalController', ['$scope', 'ProfessionalService', 'Upload', 'toaster', 'localStorageService', 'CustomerService', '$localStorage', '$sessionStorage',
        function ($scope, ProfessionalService, Upload, toaster, localStorageService, CustomerService, $localStorage, $sessionStorage) {

            $scope.professional = {};
            $scope.isProfessionalCreated = false;

            // GETTING ID FROM LOCAL STORAGE
            var id = $localStorage.USERID;
            console.log("Id in Professional : " + id);

            getProfessions();
            GetProfessionalById();

            // GET PROFESSIONS DROP DOWN
            function getProfessions() {
                CustomerService.getProfessions().then(function (response) {
                    $scope.ProfessionList = response.data;
                },
                function (err) {
                    console.log("error in getting dropdown : " + err);
                });
            }

            // GETTING USERNAME FROM LOCALSTORAGE
            var uniqueProfessionalName = localStorageService.get('authorizationData');

            // CREATING PROFESSIONAL PROFILE
            $scope.createProfessional = function (file) {
                console.log(file);
                file.upload = Upload.upload({
                    url: '/api/Values/uploadProfile',
                    data: { file: file }
                });
                file.upload.then(function (response) {
                    $scope.professional.ProfessionalImage = response.data;
                    $scope.professional.UserName = uniqueProfessionalName.userName;
                    $scope.professional.isProfessionalCreated = true;

                    ProfessionalService.saveProfessional($scope.professional).then(function (response) {
                        if (response.status == '200' && response.data != 0) {
                            // INSERTING PROFESSIONAL CREATED ID IN LOCAL STORAGE
                            $localStorage.USERID = response.data;
                            $scope.isProfessionalCreated = true;
                            toaster.pop('success', "Professional", "Created Successfully");
                        }
                        else {
                            $scope.isProfessionalCreated = false;
                            toaster.pop('error', "Professional", "Failed to Create");
                        }
                    },
                     function (err) {
                     });
                })

            }

            // CREATING PROFESSIONAL PROFILE
            $scope.updateProfessional = function (file) {

                file.upload = Upload.upload({
                    url: '/api/Values/uploadProfile',
                    data: { file: file }
                });
                file.upload.then(function (response) {
                    $scope.professional.ProfessionalImage = response.data;
                    $scope.professional.UserName = uniqueProfessionalName.userName;
                    $scope.professional.isProfessionalCreated = true;

                    ProfessionalService.updateProfessional($scope.professional).then(function (response) {
                        if (response.status == '200' && response.data == $scope.professional.ID) {
                            // INSERTING PROFESSIONAL CREATED ID IN LOCAL STORAGE
                            $localStorage.USERID = response.data;
                            $scope.isProfessionalCreated = true;
                            toaster.pop('success', "Profile", "Updated Successfully");
                        }
                        else {
                            toaster.pop('error', "Profile", "Failed to Update");
                        }
                    },
                     function (err) {
                     });
                })
            }

            // GETTING PROFESSIONAL BY ID
            function GetProfessionalById() {
                debugger
                ProfessionalService.GetProfessionalById($localStorage.USERID).then(function (response) {
                    $scope.professional = response.data;
                    var iscreated = response.data.isProfessionalCreated;

                    if (iscreated) {
                        $scope.isProfessionalCreated = true;
                    }
                    else {
                        $scope.isProfessionalCreated = false;
                    }
                },
                function (err) {
                    console.log("Error in getting professional values by id : " + err);
                });
            }


        }]);

}());