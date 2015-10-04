/**
 * Created by chanaka on 10/4/15.
 */
angular.module('appRoutes', ['ngRoute'])

    .config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'app/views/pages/home.html'
            })
    });