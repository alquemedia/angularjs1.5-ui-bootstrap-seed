// http://angulartutorial.blogspot.com/2014/03/rating-stars-in-angular-js-using.html

(function() {
    'use strict';

    angularseed

    /**
     * Main Controller!
     */
        .controller('MainCtrl',['$scope',function($scope){
            $scope.loaderClasses = [ 'hidden' ];
        }])
        .controller('NavCtrl',['$scope','dataservice','$http','$state',function($scope,dataservice,$http,$state){

        $scope.selectedCandidate = '';
        $scope.me = {};
//        getMe();
        function getMe(){
            $http.get( dataservice.base_url()+ 'me')
                .then(function(response){
                    $scope.me = response.data;
                });

        }

            $scope.$on('GetMe',function(){
                getMe();
            });
        $scope.logout = function(){
            $http.get(dataservice.base_url() + 'do-logout')
                .then(function(response){
                    if (! response.data.is_logged_in ){
                        $scope.me = {};
                        $state.go('login');
                    }
                });

        }



        $scope.findCandidates = function( searchTerm ){
            return $http.post( dataservice.base_url() + 'find-candidates',{
                search_term: searchTerm
            } )
                .then(function(response){
                    return response.data;
                })
        };

        $scope.selectItem = function($item, $model, $label, $event) {
            $state.go('candidate',{
                candidate_id: $item.candidate_id
            });
            $scope.selectedCandidate = '';
        };

    }]);

})();