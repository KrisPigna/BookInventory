app.controller('FormController', ['$scope', 'server', 'getter', 'sharedProperties', function($scope, server, getter, sharedProperties) {
    //Book inventory array
    $scope.books = [];
    
    //Retrieves stored book inventory from server and populates array
    getter.getFromServer('http://lamp.cse.fau.edu/~kpigna1/project/json/books.json').then(function(successResponse){
        $scope.books = successResponse.data;
    });
    
    //Sets book array data in sharedProperties service
    sharedProperties.setBooks($scope.books);
    
    //Transactions array
    $scope.transactions = [];
    
    //Retrieves stored transactions from server and populates array
    getter.getFromServer('http://lamp.cse.fau.edu/~kpigna1/project/json/transactions.json').then(function(successResponse){
        $scope.transactions = successResponse.data;
    });
    
    //Sets transactions array data in sharedProperties service
    sharedProperties.setTransactions($scope.transactions);
    
    //Clears input data fields
    $scope.data = {title: '', author: '', isbn: '', available: '', date: '', category: '', issued: 0};
    $scope.trans = {bookID: '', transDate: '', transType: '', date: '', closed: false, index: ''};
    
    //Adds a new book entry into book inventory
    //Pre-condition: User clicks add, fills all fields appropriately, and clicks submit
    //Post-condition: New entry is added to book inventory array, appears at the top of the table, 
    //and updated book inventory is saved to the server
    $scope.addBook = function() {
        //Test for valid input
        if ($scope.data.title == '' || $scope.data.author == '' || $scope.data.isbn == '' || $scope.data.available == '' || $scope.data.date == '' ||  $scope.data.category == '') {
            window.alert("Invalid input; fields cannot be blank.");
        } else if (($scope.data.isbn % 1) != 0 || ($scope.data.available % 1) != 0) {
            window.alert("Invalid input: ISBN and Number Available must be numbers.");
        } else {
            $scope.books.push($scope.data);
            $scope.data = {title: '', author: '', isbn: '', available: '', date: '', category: '', issued: 0};
            server.saveToServer($scope.books, 'http://lamp.cse.fau.edu/~kpigna1/project/php/savebook.php');
            sharedProperties.setBooks($scope.books);
        }
    };
    
    //Edits the number of available books for a book inventory entry
    //Pre-condition: Book inventory is not empty and user selects an inventory entry
    //Post-condition: Selected entry's "number available" value is updated, change appears in table,
    //and updated inventory is saved to the server
    $scope.editBook = function() {
        //Test for selection and valid input
        if (sharedProperties.getSelected() != undefined) {
            if ($scope.data.available < sharedProperties.getSelected().issued) {
                window.alert("Cannot edit; number available cannot be less than number issued.");
            } else if (($scope.data.available % 1) != 0) {
                window.alert("Invalid input; Number Available must be a number.");
            } else {
                /****NOTE****
                ** For some reason, using the "indexOf" function was failing the first time this function was called
                ** (but weirdly, not after calling the function once), and I couldn't figure out why. As such, I used
                ** a loop here to find the selected element in the array, but I am aware this is potentially less efficient
                *************/
                for (var i = 0; i < $scope.books.length; i++) {
                    if ($scope.books[i].isbn === sharedProperties.getSelected().isbn) {
                        $scope.books[i].available = $scope.data.available;
                    }
                }
                sharedProperties.getSelected().available = $scope.data.available;
                server.saveToServer($scope.books, 'http://lamp.cse.fau.edu/~kpigna1/project/php/savebook.php');
                sharedProperties.setBooks($scope.books);
                $scope.data.available = '';
                sharedProperties.setSelected(undefined);
                sharedProperties.setRowSelected(undefined);
            }
        }
    }
    
    //Removes selected entry from book inventory
    //Pre-condition: Book inventory is not empty, user selects an entry, and entry's "Issued" value is 0
    //Post-condition: Selected entry is permanently removed from book inventory, the entry is removed from the table,
    //and updated inventory is saved to server
    $scope.remove = function() {
        if (sharedProperties.getSelected() != undefined) {
            if (sharedProperties.getSelected().issued != 0) {
                window.alert("Cannot delete; number issued does not equal 0");
            } else {
                var index;
                /****NOTE****
                ** Loop used here for same reason as edit function above
                *************/
                for (var i = 0; i < $scope.books.length; i++) {
                    if ($scope.books[i].isbn === sharedProperties.getSelected().isbn) {
                        index = i;
                    }
                }
                $scope.books.splice(index, 1);  
                server.saveToServer($scope.books, 'http://lamp.cse.fau.edu/~kpigna1/project/php/savebook.php');
                sharedProperties.setBooks($scope.books);
                sharedProperties.setSelected(undefined);
                sharedProperties.setRowSelected(undefined);
            }
        }
    }
    
    //Issues a new transaction for the selected book entry
    //Pre-condition: Book inventory is not empty and user selects a book entry
    //Post-condition: New transaction is created, appears at top of transactions list, and 
    //updated transactions list is saved to server. Book entry's "issued" value increased by one
    //and updated book inventory is saved to server.
    $scope.issueTransaction = function() {
        if (sharedProperties.getSelected() != undefined) {
            if (sharedProperties.getSelected().available == sharedProperties.getSelected().issued) {
                window.alert("Cannot issue; all available books already issued.");
            } else {
                /****NOTE****
                ** Loop used here for same reason as edit function above
                *************/
                for (var i = 0; i < $scope.books.length; i++) {
                    if ($scope.books[i].isbn === sharedProperties.getSelected().isbn) {
                        $scope.books[i].issued ++;
                    }
                }
                $scope.trans.bookID = sharedProperties.getSelected().isbn;
                $scope.trans.transType = 'Issued';
                $scope.trans.date = 'Issued: ' + $scope.trans.transDate + ' | Returned: ';
                $scope.trans.index = $scope.books.indexOf(sharedProperties.getSelected());
                $scope.transactions.push($scope.trans);
                $scope.trans = {bookID: '', transDate: '', transType: '', date: ''};
                server.saveToServer($scope.books, 'http://lamp.cse.fau.edu/~kpigna1/project/php/savebook.php');
                server.saveToServer($scope.transactions, 'http://lamp.cse.fau.edu/~kpigna1/project/php/savetransactions.php');
                sharedProperties.setTransactions($scope.transactions);
                sharedProperties.setBooks($scope.books);
                sharedProperties.setSelected(undefined);
                sharedProperties.setRowSelected(undefined);
            }
        }
    };
    
    //Edits transaction date for selected transaction entry
    //Pre-condition: Transactions list is not empty and user selects a transaction entry that is not closed
    //Post-condition: "Issued" date for selected transaction is update, new value appears in table, and
    //updated transactions list is saved to server.
    $scope.editTransaction = function() {
        if (sharedProperties.getTransSelected() != undefined) {
            if (sharedProperties.getTransSelected().closed === true) {
                window.alert("Cannot edit; transaction is closed.");
            } else {
                /****NOTE****
                ** Loop used here for same reason as edit function above
                *************/
                for (var i = 0; i < $scope.transactions.length; i++) {
                    if ($scope.transactions[i].bookID === sharedProperties.getTransSelected().bookID && $scope.transactions[i].transDate === sharedProperties.getTransSelected().transDate) {
                        $scope.transactions[i].date = 'Issued: ' + $scope.trans.transDate + ' | Returned: ';
                        $scope.transactions[i].transDate = $scope.trans.transDate;
                    }
                }
                sharedProperties.getTransSelected().date = 'Issued: ' + $scope.trans.transDate + ' | Returned: ';
                sharedProperties.getTransSelected().transDate = $scope.trans.transDate;
                server.saveToServer($scope.transactions, 'http://lamp.cse.fau.edu/~kpigna1/project/php/savetransactions.php');
                sharedProperties.setTransactions($scope.transactions);
                $scope.trans.transDate = '';
                sharedProperties.setTransSelected(undefined);
                sharedProperties.setTransRowSelected(undefined);
            }
        }
    }
    
    //Changes status of an open transaction from issued to returned
    //Pre-condition: User selects opened transaction from transactions list
    //Post-condition: Entry's "returned" date is updated, transaction status is changed
    //to "closed", and updated transactions list is saved to server. Appropriate book inventory
    //entry's "Issued" value decreased by one and updated book inventory is saved to server.
    $scope.return = function() {
        if (sharedProperties.getTransSelected() != undefined) {
            if (sharedProperties.getTransSelected().closed != true) {
                /****NOTE****
                ** Loops used here for same reason as edit function above
                *************/
                for (var i = 0; i < $scope.transactions.length; i++) {
                    if ($scope.transactions[i].bookID === sharedProperties.getTransSelected().bookID && $scope.transactions[i].transDate === sharedProperties.getTransSelected().transDate) {
                        $scope.transactions[i].closed = true;
                        $scope.transactions[i].date = $scope.transactions[i].date + $scope.trans.transDate;
                        $scope.transactions[i].transType = "Returned";
                    }
                }
                for (var i = 0; i < $scope.books.length; i++) {
                    if ($scope.books[i].isbn === sharedProperties.getTransSelected().bookID) {
                        $scope.books[i].issued --;
                    }
                }
                server.saveToServer($scope.books, 'http://lamp.cse.fau.edu/~kpigna1/project/php/savebook.php');
                server.saveToServer($scope.transactions, 'http://lamp.cse.fau.edu/~kpigna1/project/php/savetransactions.php');
                sharedProperties.setTransactions($scope.transactions);
                sharedProperties.setBooks($scope.books);
                sharedProperties.setTransSelected(undefined);
                sharedProperties.setTransRowSelected(undefined);
            }
        }
    }
}]);