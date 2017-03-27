var app = angular.module("myApp", ['ngRoute'])

.service('sharedProperties', function () {
        var selected = undefined;
        var rowSelected = undefined;
        var selectedTrans = undefined;
        var rowSelectedTrans = undefined;
        var books = [];
        var transactions = [];

        return {
            //Getter and Setter function for sharing data between controller
            
            getSelected: function () {
                return selected;
            },
            setSelected: function(value) {
                selected = value;
            },
            getRowSelected: function () {
                return rowSelected;
            },
            setRowSelected: function(value) {
                if (rowSelected != undefined) {
                    rowSelected.toggled = !rowSelected.toggled;
                }
                rowSelected = value;
            },
            getTransSelected: function () {
                return selectedTrans;
            },
            setTransSelected: function(value) {
                selectedTrans = value;
            },
            getTransRowSelected: function () {
                return rowSelectedTrans;
            },
            setTransRowSelected: function(value) {
                if (rowSelectedTrans != undefined) {
                    rowSelectedTrans.toggled = !rowSelectedTrans.toggled;
                }
                rowSelectedTrans = value;
            },
            getBooks: function() {
                return books;
            },
            setBooks: function(value) {
                books = value;
            },
            getTransactions: function() {
                return transactions;
            },
            setTransactions: function(value) {
                transactions = value;
            }
        };
    });

app.config(function ($routeProvider) { 
$routeProvider
    .when("/", {
        templateUrl : "views/inventory.html",
        controller : 'MainController'
    })
    .otherwise({
        redirectTo: "/"
   });
});