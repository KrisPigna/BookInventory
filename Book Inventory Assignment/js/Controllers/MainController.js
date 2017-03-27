app.controller('MainController', ['$scope', 'getter', 'sharedProperties', function($scope, getter, sharedProperties) {
    //Book inventory array
    $scope.books = [];
    
    //Retrieves stored book inventory from server and populates array
    getter.getFromServer('http://lamp.cse.fau.edu/~kpigna1/project/json/books.json').then(function(successResponse){
        $scope.books = successResponse.data;
    });
    
    //Sets view to watch book array to update on changes to inventory
    $scope.$watch(function() { return sharedProperties.getBooks(); },
              function(newValue, oldValue) {
                    $scope.books = sharedProperties.getBooks();
                }
             );
    
    //Transactions array
    $scope.transactions = [];
    
    //Retrieves stored transactions from server and populates array
    getter.getFromServer('http://lamp.cse.fau.edu/~kpigna1/project/json/transactions.json').then(function(successResponse){
        $scope.transactions = successResponse.data;
    });
    
    //Sets view to watch transactions array to update on changes to transactions
    $scope.$watch(function() { return sharedProperties.getTransactions(); },
              function(newValue, oldValue) {
                    $scope.transactions = sharedProperties.getTransactions();
                }
             );
    
    //Toggles selected item from book inventory table when clicked
    //Pre-condition: Book inventory is not empty
    //Post-condition: Table row's class changed to indicate selection and selected element is set in sharedProperties service
    $scope.toggleSelected = function (book) {
        book.toggled = !book.toggled;
        sharedProperties.setRowSelected(book);
        sharedProperties.setSelected(this.book);
    }
    
    //Toggles selected item from trnsactions table when clicked
    //Pre-condition: Transactions is not empty
    //Post-condition: Table row's class changed to indicate selection and selected element is set in sharedProperties service
    $scope.toggleSelectedTrans = function (transaction) {
        transaction.toggled = !transaction.toggled;
        sharedProperties.setTransRowSelected(transaction);
        sharedProperties.setTransSelected(this.transaction);
    }
}]);