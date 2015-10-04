/**
 * Created by chanaka on 10/2/15.
 */

angular.module('authService', [])

    .factory('Auth', function ($http, $q, AuthToken) {

        var authFactory = {};

        /**
         * Create login function.
         * @param username
         * @param password
         * @returns {*}
         */
        authFactory.login = function (username, password) {
            return $http.post('/api/login', {
                username: username,
                password: password
            })
                .success(function (data) {
                    AuthToken.setToken(data.token);
                    return data;
                })
        };

        /**
         * Create logout function and clear all login data.
         */
        authFactory.logout = function () {
            AuthToken.setToken();
        };

        /**
         * Check the login status of the user and get confirmation.
         * @returns {boolean}
         */
        authFactory.isLoggedIn = function () {
            if (AuthToken.getToken()) {
                return true;
            } else {
                return false;
            }
        };

        /**
         * Get user details after user logged in.
         * @returns {*}
         */
        authFactory.getUser = function () {
            if (AuthToken.getToken()) {
                return $http.get('/api/me');
            } else {
                return $q.reject({message: "Userhas no token"});
            }
        };

        return authFactory;

    })


    .factory('AuthToken', function ($window) {

        var authTokenFactory = {};

        /**
         * Get saved token from local storage.
         */
        authTokenFactory.getToken = function () {
            return $window.localStorage.getItem('token');
        };

        /**
         * Set token to local storage if its existing.
         * @param token
         */
        authTokenFactory.setToken = function (token) {
            if (token) {
                $window.localStorage.setItem('token', token);
            } else {
                $window.localStorage.removeItem('token');
            }
        };

        return authTokenFactory;

    })

    .factory('AuthInterceptor', function ($q, $location, AuthToken) {
        var interceptorFactory = {};

        /**
         * Checking all the request whether they are authorized or not with a token.
         * @param config
         * @returns {*}
         */
        interceptorFactory.request = function (config) {
            var token = AuthToken.getToken();
            if (token) {
                config.headers['x-access-token'] = token;
            }
            return config;
        };

        /**
         * Check login status and redirect to login page if not logged.
         * @param response
         * @returns {Promise}
         */
        interceptorFactory.responseError = function (response) {
            if (response.status == 403) {
                $location.path('/login');
            }
            return $q.reject(response);
        };

        return interceptorFactory;
    });