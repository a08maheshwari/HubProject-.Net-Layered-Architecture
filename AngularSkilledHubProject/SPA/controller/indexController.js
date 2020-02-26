(function () {

'use strict';
angular.module('App').controller('indexController', ['$scope', '$state', '$location', 'authService', 'CustomerService', '$localStorage', '$sessionStorage', 'AppointmentService',
    function ($scope, $state, $location, authService, CustomerService, $localStorage, $sessionStorage, AppointmentService) {
        //Data variable
       
        $scope.search = {};
        $scope.Profession_Id = null;
        $scope.ProfessionName = null;
        $scope.profileImage = null;
        //for appointments board notification
        $scope.notify = [];
        $scope.notify.pending = 0;
        $scope.notify.cancelled = 0;
        $scope.notify.accepted = 0;


    $scope.ROLE = $localStorage.ROLE;

    debugger;
    if ($localStorage.ROLE === 'Customer')
    {
        getProfessions();
    }
    else if ($localStorage.ROLE === 'Professional')
    {
        appointmentStatus();
    }
   
    // GET_PROFESSIONS
    function getProfessions() {

        CustomerService.getProfessions().then(function (response)
        {
            $scope.ProfessionList = response.data;
        },
        function (err)
        {
            console.log("error in getting dropdown : " + err);
        });
                 
    }

    // LOGOUT
    $scope.logOut = function () {
        $localStorage.ROLE = "";
        authService.logOut();
        $location.path('/home');
    }

    //Customer searches for Professional 
    $scope.searchProfessional = function (search) {
        debugger;
        CustomerService.getProfessional(search).then(function (data) {


            $state.transitionTo("search_Professional");
        },
        function (err) {
            console.log("error in getting professionals : " + err);
        });

    }
        
        //appointment bar
    function appointmentStatus()
    {
        debugger;
        if ($localStorage.USERID != 0) {
            AppointmentService.getAllAppointmentByIdForProfessional($localStorage.USERID).then(function (response) {
                debugger;
                $scope.notify.count = 0;
                var appointlist = response.data;

                angular.forEach(appointlist, function (appoint) {
                    $scope.notify.count += 1;

                    debugger;
                    if (appoint.status == 0) {
                        $scope.notify.cancelled += 1;
                    }
                    else if (appoint.status == 1) {
                        $scope.notify.accepted += 1;
                    }

                    else {
                        $scope.notify.pending += 1;
                    }

                });

            })
        }
    }

    $scope.authentication = authService.authentication;
    
}]);

}());