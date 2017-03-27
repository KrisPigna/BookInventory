$(function() {
    
    //Masks to force proper date format for date input fields
    jQuery(function($){
        $("#date").mask("99/99/9999",{placeholder:"mm/dd/yyyy"});
        $("#trans-date").mask("99/99/9999",{placeholder:"mm/dd/yyyy"});
        $("#transEditDate").mask("99/99/9999",{placeholder:"mm/dd/yyyy"});
        $("#return-date").mask("99/99/9999",{placeholder:"mm/dd/yyyy"});
    });
    
    //Functions to show or hide forms when appropriate buttons are clicked
    function hideForms() {
        $('#addForm').hide();
        $('#editBookForm').hide();
        $('#editTransForm').hide();
        $('#issueForm').hide();
        $('#returnForm').hide();
    }

    $('button[id=add]').on('click', function() {
        hideForms();
        $('#addForm').show();  
    });
    
    $('button[id=editBook]').on('click', function() {
        hideForms();
        $('#editBookForm').show();  
    });
    
    $('button[id=editTrans]').on('click', function() {
        hideForms();
        $('#editTransForm').show();  
    });
    
    $('button[id=issue]').on('click', function() {
        hideForms();
        $('#issueForm').show();  
    });
    
    $('button[id=return]').on('click', function() {
        hideForms();
        $('#returnForm').show();  
    });
    
    $('button[id=confirmAdd]').on('click', function() {
        $('#addForm').hide();  
    });
    
    $('button[id=cancelAdd]').on('click', function() {
        $('#addForm').hide();
    });
    
    $('button[id=confirmEdit]').on('click', function() {
        $('#editBookForm').hide();  
    });
    
    $('button[id=cancelEdit').on('click', function() {
        $('#editBookForm').hide();
    });
    
    $('button[id=confirmTransEdit]').on('click', function() {
        $('#editTransForm').hide();  
    });
    
    $('button[id=cancelTransEdit').on('click', function() {
        $('#editTransForm').hide();
    });
    
    $('button[id=confirmIssue]').on('click', function() {
        $('#issueForm').hide();  
    });
    
    $('button[id=cancelIssue]').on('click', function() {
        $('#issueForm').hide();
    });
    
       $('button[id=confirmReturn]').on('click', function() {
        $('#returnForm').hide();  
    });
    
    $('button[id=cancelReturn]').on('click', function() {
        $('#returnForm').hide();
    });
});