app.factory('server', ['$http', function($http) {
    return {
        //Saves JSON file in designated server folder
        //Pre-condition: function that changes either book inventory or transactions is invoked
        //Post-condition: Updated book inventory or transactions JSON file is saved to server
        saveToServer: function($data, url) {
            var req = {
                        method: 'POST',
                        url: url,
                        data: { data: $data }
                    }

            $http(req).then(function(response){console.log(response)}, function(){console.log('error')});
        }
    };
}]);