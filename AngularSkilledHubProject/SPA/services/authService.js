(function () {

    'use strict';
    angular.module('App').factory('authService', ['$http', '$q', 'localStorageService', '$localStorage', '$sessionStorage',
        function ($http, $q, localStorageService, $localStorage, $sessionStorage) {

            var authServiceFactory = {};
            var _authentication = {
                isAuth: false,
                userName: "",
            };

            // SIGNUP
            var _saveRegistration = function (registration) {

                _logOut();

                return $http.post('/api/Account/Register', registration).then(function (response) {
                    return response;
                });

            };

            // LOGIN
            var _login = function (loginData) {

                var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

                var deferred = $q.defer();

                $http.post('/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                    debugger;
                    // GETTING LOGGING USER ROLE


                    // SETTING DATA IN LOCALSTORAGE
                    localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });
                    _authentication.isAuth = true;
                    _authentication.userName = loginData.userName;

                    deferred.resolve(response);
                    //return _getRole(loginData.userName);

                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });

                return deferred.promise;
            };

            // LOGOUT
            var _logOut = function () {
                debugger;
                localStorageService.remove('authorizationData');
                _authentication.isAuth = false;
                _authentication.userName = "";
                $localStorage.ROLE = "";
                $localStorage.USERID = "";
            };

            // FILL AUTH DATA
            var _fillAuthData = function () {
                var authData = localStorageService.get('authorizationData');
                if (authData) {
                    _authentication.isAuth = true;
                    _authentication.userName = authData.userName
                }
            }

            // CHECKING USER AUTHENTICATION
            var _authFind = function () {
                var authcheck = localStorageService.get('authorizationData');
                if (authcheck) {
                    return true;
                }
                else {
                    return false;
                }
            }

            //GET CUSTOMER ID
            var _getCustomerId = function (userName) {
                debugger;
                return $http.get('/api/Values/customerId?userName=' + userName).then(function (response) {
                    return response;
                });
            }

            // GET PROFESSION ID
            var _getProfessionalId = function (userName) {
                debugger;
                return $http.get('/api/Values/professionalId?userName=' + userName).then(function (response) {
                    return response;
                });
            }

            // GET ROLES
            var _getRole = function (userName) {
                return $http.get('/api/Values/RoleType/?username=' + userName).then(function (response) {
                    return response;
                });
            }

            //Pass CustomerID To searchController
            authServiceFactory.CId = function () {
                debugger;
                return $localStorage.USERID;
            }

            authServiceFactory.getCredential = function () {

                return $localStorage.USERID;
            }

            authServiceFactory.saveRegistration = _saveRegistration;
            authServiceFactory.login = _login;
            authServiceFactory.logOut = _logOut;
            authServiceFactory.fillAuthData = _fillAuthData;
            authServiceFactory.authentication = _authentication;
            authServiceFactory.getCustomerId = _getCustomerId;
            authServiceFactory.getProfessionalId = _getProfessionalId;
            authServiceFactory.getRole = _getRole;
            authServiceFactory.authFind = _authFind;

            return authServiceFactory;

        }]);

}());