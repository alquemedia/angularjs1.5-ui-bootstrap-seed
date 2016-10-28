'use strict';

// Declare app level module which depends on views, and components
var angularseed = angular.module('myApp', [
    'ui.router',
    'ui.bootstrap',
    'angular.chosen',
    'angular-input-stars',
    'ngFileUpload',
    'toastr',
    'oc.lazyLoad',
    'frapontillo.bootstrap-switch',
    'LocalStorageModule'
]);

angularseed.config(['$locationProvider','localStorageServiceProvider' ,function($locationProvider,localStorageService){
    localStorageService.setPrefix('angularseed');
}]);

angularseed.run(['$http', function($http){

    // Required for login
    $http.defaults.withCredentials = true;

}]);

