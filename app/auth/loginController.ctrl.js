angular.module('myApp')
    .controller('LoginCtrl',
        [ '$state', '$rootScope', 'toastr', '$scope', 'dataservice','$http',
            function($state,$rootScope,$toastr,$scope,dataservice,$http) {
        $scope.form_classes = {login: 'active',register: ''};
        $scope.form_visible = {login: true,register: false};

        $scope.show = function( what ){
            var not = what == 'login' ? 'register': 'login';
            $scope.form_classes[ what ] = 'active';
            $scope.form_classes[ not ] = '';
            $scope.form_visible[ what ] = true;
            $scope.form_visible[ not ] = false;

        };

        $scope.credentials = { email: '', password: '' };
        $scope.submit_login = function(){
            $http.post( dataservice.base_url() + 'do-signin',$scope.credentials )
                .then(function(response){
                    var json = response.data;
                    if ( ! json.result )
                        $toastr.error(json.error,'Unable to Sign in',{
                            timeOut: 8000,
                            preventDuplicates: true
                        });
                    else $state.go('dashboard');
                });
        };

        $scope.user = { first_name: '', last_name: '', email: '', password: '', telephone: ''};
        $scope.submit_registration = function(){
            $http.post( dataservice.base_url() + 'register-user',$scope.user )
                .then(function(response){
                    var json = response.data;
                    if (json.result =='error')
                        $toastr.error(json.error,"Unable to register your account",{
                            timeOut: 8000,
                            preventDuplicates: true
                        });
                });
        }

    }]);