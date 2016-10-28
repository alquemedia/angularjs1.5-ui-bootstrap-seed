(function() {
    'use strict';

    angularseed

    // Configure Routes
    .config(['$stateProvider','$urlRouterProvider', function($stateProvider,$urlRouterProvider) {

        $urlRouterProvider
            .when('/', '/dashboard')
            .otherwise('/dashboard');

        /**
         *
         * @param $state
         * @param $http
         * @param dataservice
         * @param $rootScope
         */
        function authorizationCheck($state,$http,dataservice,$rootScope){
            $http.get( dataservice.base_url()+ 'login-check', {
                    withCredentials: true
                })
                .then(function () {
                    // repeat it, to work around issue with server
                    $http.get( dataservice.base_url() + 'login-check',{
                        withCredentials: true
                    }).then(function(response){
                        // Not logged in?
                        if  (! response.data.is_logged_in)
                        // GO to login
                            $state.go( 'login');
                        else {
                            $rootScope.$broadcast("GetMe",response.data.user_id);
                        }

                    });
                });
        }

        var Dashboard = {
            name: 'dashboard',
            url: '/dashboard',
            templateUrl: 'dashboard/dashboard.html?bust=' + (new Date().getTime()),
            controller: 'DashboardCtrl',
            resolve: {
                deps: ['$ocLazyLoad', '$http','$state','dataservice', '$rootScope',function($ocLazyLoad, $http,$state,dataservice,$rootScope){
                    authorizationCheck($state,$http,dataservice,$rootScope);
                    return $ocLazyLoad.load([
                        'dashboard/dashboardController.ctrl.js'
                    ], {serie: true});
                }]
            }
        };

        var LoginRegistration = {
            name: 'login',
            url: '/signin',
            templateUrl: 'auth/login.html?bust=' + (new Date().getTime()),
            controller: 'LoginCtrl',
            resolve: {
                deps: ['$ocLazyLoad', '$http','$state','dataservice', '$rootScope',function($ocLazyLoad, $http,$state,dataservice,$rootScope){
                    return $ocLazyLoad.load([
                        'auth/loginController.ctrl.js'
                    ], {serie: true});
                }]
            }
        };

        $stateProvider.state(Dashboard.name,Dashboard);
        $stateProvider.state(LoginRegistration.name,LoginRegistration);

    }]);


})();