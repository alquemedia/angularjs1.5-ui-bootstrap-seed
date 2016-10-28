angular.module( 'myApp')

    // I am the Arrays Manager.
    .service("arraysManager",function() {

            /**
             *
             * @param newElement
             * @param array
             * @param member
             * @param value
             * @returns {Array}
             */
            function replaceElementByValue( newElement, array, member, value ){
                var arr = [];
                for ( var i in array ){
                    var element = array[i][member];
                    if (element == value)
                        arr.push(newElement);
                    else arr.push(array[i]);
                }

                return arr;
            }
            /**
             *
             * @param array
             * @param member
             * @param value
             * @returns {*}
             */
            function findElementByValue( array, member, value ){
                for ( var i in array ){
                    var element = array[i][member];
                    if (element == value)
                        return array[i];

                }
                return null;
            }

            /**
             * Removes an element from an array by referencing a value
             * @param array
             * @param member
             * @param value
             * @returns {Array}
             */
            function removeElementByValue( array, member, value ) {
                var newArr = [];
                for ( var i in array ){
                    var element = array[i][member];
                    if (element != value)
                        newArr.push(array[i]);

                }
                return newArr;
            }

            return({
                removeElementByValue: removeElementByValue,
                replaceElementByValue: replaceElementByValue,
                findElementByValue: findElementByValue
            });
        }
    )


    .service('dataservice', ['$http','$q',function dataservice($http,$q) {

        // enable CORS
        $http.defaults.useXDomain = true;

        delete $http.defaults.headers.common['X-Requested-With'];

        /**
         * VARIABLES
         * @type {{apps: Array, name: string}}
         */

        var defferedAbourt = $q.defer();

        function define_promise (){

            defferedAbourt = $q.defer();

        }

        var request = {};

        var promise = {};

        return{
            url: url,

            base_url: base_url,

            getModels: getModels,

            getModel: getModel,

            addModel: addModel,

            findModel: findModel,

            findModels: findModels,

            deleteModel: deleteModel,

            putModel: putModel,

            abort: abortRequest,

            post: handlePost,

            get: handleGet
        };

        /**
         * Get the base URL
         * @returns {string}
         */
        function base_url(){ return 'http://test-server.alquimedia.co/'; }


        /**
         * Get the base URL
         * @returns {string}
         */
        function url(){

            return base_url()+'rest/';

        }

        /**
         * Gets a Model
         * @param {string} modelName
         * @param {Number} modelId
         * @returns {*}
         */
        function getModel( modelName, modelId ) {

            define_promise();

            request = $http({
                method: 'get',
                url : url() + modelName+ '/'+modelId,
                timeout: defferedAbourt.promise
            });

            return handlePromise( request );

        }

        /**
         * Gets a list of Models
         * @param {string} modelName
         * @param {Array} oQueries
         * @returns {*}
         */
        function getModels( modelName, oQueries ) {

            define_promise();

            oQueries = oQueries ? oQueries : [];
            request = $http({
                method: 'get',
                url : url() + modelName + query_string( oQueries ),
                timeout: defferedAbourt.promise
            });

            return handlePromise( request );
        }

        /**
         * Add a new Model
         * @param modelName
         * @param data
         * @returns {*}
         */
        function addModel( modelName, data ){

            define_promise();

            request = $http({
                method: 'post',
                url : url() + modelName,
                data: data,
                timeout: defferedAbourt.promise
            });

            return handlePromise( request );

        }

        /**
         * Find a Model
         * @param {string} modelName
         * @param {string} customSearch
         * @returns {*}
         */
        function findModel( modelName, customSearch) {

            define_promise();

            request = $http({
                method: 'get',
                url : url() + modelName+ '/'+customSearch,
                timeout: defferedAbourt.promise
            });

            return handlePromise( request );

        }

        /**
         * Find a Model
         * @param {string} modelName
         * @param {string} query
         * @param {array} filters
         * @returns {*}
         */
        function findModels( modelName, query, filters ) {

            define_promise();

            filters = filters ? filters: [];

            request = $http({
                method: 'get',
                url : url() + modelName+ query_string(filters,'?_q='+query ),
                timeout: defferedAbourt.promise
            });

            return handlePromise( request );

        }

        /**
         * Delete a Model
         * @param {string} modelName
         * @param {Number} modelId
         * @returns {*}
         */
        function deleteModel( modelName, modelId ) {

            define_promise();

            request = $http({
                method: 'delete',
                url : url() + modelName+ '/'+modelId,
                timeout: defferedAbourt.promise
            });

            return handlePromise( request );

        }

        /**
         * Puts a Model
         * @param {string} modelName
         * @param {Number} modelId
         * @param {Object} values
         * @returns {*}
         */
        function putModel( modelName, modelId, values ) {

            define_promise();

            // For Code Alchemy
            values['_PARNASSUS_SIMULATE_PUT'] = true;

            request = $http({
                method: 'post',
                url : url() + modelName+ '/'+modelId,
                data: values,
                timeout: defferedAbourt.promise
            });

            return handlePromise( request );
        }

        /**
         * Construct query string
         * @param oQueries
         * @param {string} seedString
         * @returns {string}
         */
        function query_string( oQueries, seedString ){

            seedString = seedString ? seedString : '';

            var qstr = seedString;

            $.each( oQueries,function(index,query){

                query = ( query );

                qstr = qstr+ ( qstr ? '&'+query : '?'+query );

            });

            return qstr;
        }

        function handlePost( path, data)
        {

            define_promise();

            request = $http({
                method: 'post',
                url : path,
                data: data,
                timeout: defferedAbourt.promise
            });

            return handlePromise( request );
        }

        function handleGet( path, data)
        {

            define_promise();

            request = $http({
                method: 'get',
                url : path,
                timeout: defferedAbourt.promise
            });

            return handlePromise( request );
        }








        /**
         * CONTROL PROMISE
         */

        function abortRequest ( requestData ){
            return ( requestData && requestData.abort() );
        }

        function handlePromise( request )
        {
            promise = request.then(
                function( response )
                {
                    prodigeus = response.data;
                    return response.data;
                },
                function( response )
                {
                    return ( $q.reject( "Something went wrong" ) );
                }
            );

            // return response the promise

            return handlePromiseAbourt();
        }

        function handlePromiseAbourt()
        {
            promise.abort = function()
            {
                defferedAbourt.resolve();
            };

            promise.finally(
                function()
                {
                    //console.log( "Cleaning up object references." );

                    promise.abort = angular.noop;

                    defferedAbourt = request = promise = null;
                }
            );

            return promise;
        }


    }])
    .service('authLogin', ['dataservice', '$rootScope', function authLogin(dataservice, $rootScope){

        var user = {};

        return{
            rq: handleRequest
        }

        function handleRequest()
        {
            return dataservice.post( 'http://server.energyfundz.com/login-check', {

                withCredentials: true

            });
        }

    }])
