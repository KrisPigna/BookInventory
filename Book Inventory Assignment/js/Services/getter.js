app.factory('getter', ['$http', function($http) {
  
    return {
        //Retrieves JSON file from server
        //Pre-condition: None; function invoked upon loading site to popular book inventory and transactions arrays
        //Post-condition: book inventory or transactions array populated with JSON data from server
        getFromServer: function(url) {
            return $http.get(url) 
                .then(function(response){return response.data}, function(){console.log('error')});
            }
        };
    }]);