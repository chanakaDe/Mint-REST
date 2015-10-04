/**
 * Created by chanaka on 10/4/15.
 */
angular.module('mainController', [])

    .controller('mainController', function ($rootScope, $location, Auth) {
        var vm = this;

        /**
         * Checking login status and save user data in rootScope.
         * @type {boolean}
         */
        vm.loggedIn = Auth.isLoggedIn();
        $rootScope.$on('$routeChangeStart', function () {
            vm.loggedIn = Auth.isLoggedIn();
            Auth.getUser()
                .then(function (data) {
                    vm.user = data.data;
                });
        });

        /**
         * Make login with user input data.
         */
        vm.doLogin = function () {
            vm.processing = true;
            vm.error = '';
            Auth.login(vm.loginData.username, vm.loginData.password)
                .success(function (data) {
                    vm.processing = false;

                    Auth.getUser()
                        .then(function (data) {
                            vm.user = data.data;
                        });
                    if (data.success) {
                        $location.path('/home');
                    } else {
                        vm.error = data.message
                    }
                });
        };

        /**
         * Logout user from the system.
         */
        vm.doLogout = function () {
            Auth.logout();
            $location.path('/logout');
        }

    });