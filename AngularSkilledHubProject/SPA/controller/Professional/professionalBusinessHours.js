(function () {

    'use strict'
    angular.module('App').controller('professionalBHoursController', ['$scope', 'ProfessionalService', '$localStorage', '$sessionStorage', 'toaster', '$filter', 'moment',
        function ($scope, ProfessionalService, $localStorage, $sessionStorage, toaster, $filter, moment) {

            debugger;
            var id = $localStorage.USERID;
            
            $scope.businesshour = {};
            $scope.isBHourCreated = false;

            getBusinessHoursById();

            // CREATE BUSINESS HOURS
            $scope.createBusinessHours = function (businesshour) {
                debugger;
                $scope.businesshour = businesshour;
                $scope.businesshour.ID = $localStorage.USERID;
                $scope.businesshour.isBHourCreated = true;
                ProfessionalService.createBusinessHours($scope.businesshour).then(function (response) {
                    debugger;
                    if (response.data == $scope.businesshour.ID && response.status == '200') {
                        $localStorage.USERID = response.data;
                        $scope.isBHourCreated = true;
                        toaster.pop('success', "Timings", "Updated Successfully");
                    }
                    else {
                        console.log("Error In Create BusinessHours :" + response);
                    }
                },
                function (err) {
                    $scope.businesshour.isBHourCreated = false;
                    $scope.isBHourCreated = false;
                    toaster.pop('error', "Timings", "Failed to Update");
                });
            };


            // UPDATING BUSINESS HOURS
            $scope.updateBusinessHours = function (businesshour) {
                debugger;
              //  $scope.businesshour = $filter('date')($scope.businesshour, 'HH:mm Z');
                $scope.businesshour.ID = $localStorage.USERID;
                $scope.businesshour.isBHourCreated = $scope.isBHourCreated;
                ProfessionalService.updateBusinessHours($scope.businesshour).then(function (response) {
                    debugger;
                    if (response.data == $scope.businesshour.ID && response.status == '200') {
                        $localStorage.USERID = response.data;
                        $scope.isBHourCreated = true;
                        toaster.pop('success', "Timings", "Updated Successfully");
                    }
                    else {
                        console.log("Error in Update BusinessHours : " + response);
                    }
                },
                function (err) {
                    $scope.isBHourCreated = false;
                    toaster.pop('error', "Timings", "Failed to Update");
                });
            };


            // GETTING BUSINESS HOURS BY ID
            function getBusinessHoursById() {
                ProfessionalService.getBusinessHours($localStorage.USERID).then(function (response) {
                    if (response.data == null) {
                        $scope.isBHourCreated = false;
                    }
                    else if (response.data != null) {
                        $scope.businesshour = response.data;
                        if (response.data.isBHourCreated) {
                            $scope.isBHourCreated = true;
                        }
                        else {
                            $scope.isBHourCreated = false;
                        }
                    }
                    debugger;
                    var businesshours = response.data;

                    $scope.exampleDate = moment().hour(8).minute(0).second(0).toDate();
                    $scope.businesshour.MonStartTime = moment(businesshours.MonStartTime).toDate();
                    $scope.businesshour.MonEndTime = moment(businesshours.MonEndTime).toDate();
                    $scope.businesshour.TueStartTime = moment(businesshours.TueStartTime).toDate();
                    $scope.businesshour.TueEndTime = moment(businesshours.TueEndTime).toDate();
                    $scope.businesshour.WedStartTime = moment(businesshours.WedStartTime).toDate();
                    $scope.businesshour.WedEndTime = moment(businesshours.WedEndTime).toDate();
                    $scope.businesshour.ThuStartTime = moment(businesshours.ThuStartTime).toDate();
                    $scope.businesshour.ThuEndTime = moment(businesshours.ThuEndTime).toDate();
                    $scope.businesshour.FriStartTime = moment(businesshours.FriStartTime).toDate();
                    $scope.businesshour.FriEndTime = moment(businesshours.FriEndTime).toDate();
                    $scope.businesshour.SatStartTime = moment(businesshours.SatStartTime).toDate();
                    $scope.businesshour.SatEndTime = moment(businesshours.SatEndTime).toDate();
                    $scope.businesshour.SunStartTime = moment(businesshours.SunStartTime).toDate();
                    $scope.businesshour.SunEndTime = moment(businesshours.SunEndTime).toDate();
                },
                function (err) {
                    console.log("Error in getting BUSINESS HOURS by id : " + err);
                });
            };


            $scope.Monday = function () {
                $scope.businesshour.MonStartTime = null;
                $scope.businesshour.MonEndTime = null;
            }
            $scope.Tuesday = function () {
                $scope.businesshour.TueStartTime = null;
                $scope.businesshour.TueEndTime = null;
            }
            $scope.Wednusday = function () {
                $scope.businesshour.WedStartTime = null;
                $scope.businesshour.WedEndTime = null;
            }
            $scope.Thursday = function () {
                $scope.businesshour.ThuStartTime = null;
                $scope.businesshour.ThuEndTime = null;
            }
            $scope.Friday = function () {
                $scope.businesshour.FriStartTime = null;
                $scope.businesshour.FriEndTime = null;
            }
            $scope.Saturday = function () {
                $scope.businesshour.SatStartTime = null;
                $scope.businesshour.SatEndTime = null;
            }
            $scope.Sunday = function () {
                $scope.businesshour.SunStartTime = null;
                $scope.businesshour.SunEndTime = null;
            }

            //validate input date
            //monday
            $scope.MondayValidate = function () {
                debugger;
                $scope.errMessage = '';
                if ($scope.businesshour.MonStartTime >= $scope.businesshour.MonEndTime) {
                    $scope.errMessage = 'End Time should be greater than start Time';

                    return false;
                }
            };
            //tuesday
            $scope.TueValidate = function () {
                $scope.errMessage = '';
                if ($scope.businesshour.TueStartTime >= $scope.businesshour.TueEndTime) {
                    $scope.errMessage = 'End Time should be greater than start Time';
                    return false;
                }
            };
            //wednesday
            $scope.WedValidate = function () {
                $scope.errMessage = '';
                if ($scope.businesshour.WedStartTime >= $scope.businesshour.WedEndTime) {
                    $scope.errMessage = 'End Time should be greater than start Time';
                    return false;
                }
            };
            //thursday
            $scope.ThuValidate = function () {
                $scope.errMessage = '';
                if ($scope.businesshour.ThuStartTime >= $scope.businesshour.ThuEndTime) {
                    $scope.errMessage = 'End Time should be greater than start Time';
                    return false;
                }
            };
            //friday
            $scope.FriValidate = function () {
                $scope.errMessage = '';
                if ($scope.businesshour.FriStartTime >= $scope.businesshour.FriEndTime) {
                    $scope.errMessage = 'End Time should be greater than start Time';
                    return false;
                }
            };
            //saturday
            $scope.SatValidate = function () {
                $scope.errMessage = '';
                if ($scope.businesshour.SatStartTime >= $scope.businesshour.SatEndTime) {
                    $scope.errMessage = 'End Time should be greater than start Time';
                    return false;
                }
            };
            //sunday
            $scope.SunValidate = function () {
                $scope.errMessage = '';
                if ($scope.businesshour.SunStartTime >= $scope.businesshour.SunEndTime) {
                    $scope.errMessage = 'End Time should be greater than start Time';
                    return false;
                }
            };

    }])

}());