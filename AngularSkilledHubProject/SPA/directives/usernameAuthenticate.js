(function () {
    'use strict'

    angular.module('App').directive('validateUsernameRemotely', function ($http) {
        return {
            restrict: 'A',
            scope: true,
            require: 'ngModel',
            link: function(scope, elem, attrs, ctrls) 
            {
                var ngModel = ctrls;
                scope.$watch(attrs.ngModel, function (userName) {
                    var url = 'api/Account/validUsername?userName=' + userName;

                    $http.get(url).then(function (response) {
                        debugger;
                        if (response.data) {
                            ngModel.$setValidity('validUsername', false);
                        } else {
                            ngModel.$setValidity('validUsername', true);
                        }
                    }, function (error) {
                        ngModel.$setValidity('validUsername', true);
                    });
                });
             }
        }
    });

}());