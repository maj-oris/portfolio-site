var notesApp = angular.module("notesApp", ['ngCookies']);
var expireDate = new Date(); // new date object, by default initialized to the current time/date, used for setting cookie expiration

notesApp.controller("notesAppController", function($scope, $cookies) {

  $scope.sidebarSelection = "none"; //
  $scope.items = [["note","Lorem Ipsum...","...dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."]];
  //initialize list of items containing one item

  $scope.editedTitle = "";
  $scope.editedText = "";
  //used by function to edit notes as temporary stores for the ng-models to be binded to without overwriting the actual items before used confirmation is given
  $scope.newTitle = "";
  $scope.newText = "";
  //used by function to create new notes as temporary stores

  $scope.cookiesAllowed = false;
  $scope.cookiesDontAskAgain = false;
  $scope.displayTopbar = true;
  //whether or not the user wishes to allow cookies per GDPR, and whether or not they want the website to remember their choice
  //cookies being turned on/off isn't actually implemented yet. TODO:
  // - debug top bar not disappearing
  // - create cookie for storing cookie permission/ask again data, if permission is given
  // - ideally, animate topbar disappearing when either button is pushed


  //entry formats:
  // - normal (text) note: [type,title,text content] - string, string, string.
  // - image note: [type,title,content,image], string, string, string, path. - not yet implemented
  // - reminder note (text): [type,title,text content,expiration date], string, string, string, date object.

  $scope.cookiesAllowed = function() {
    $scope.cookiesAllowed = true;
    $scope.displayTopbar = false;
  }

  $scope.cookiesDisallowed = function() {
    $scope.cookiesAllowed = false;
    $scope.displayTopbar = false;
  }

  //there's probably a more elegant way to do this than having two functions for turning a single variable on/off. TOTO: look into this in future?

  $scope.editNote = function(index){
    $scope.sidebarSelection = index;
    $scope.editedTitle = $scope.items[index][1];
    $scope.editedText = $scope.items[index][2];
  }

  //sets up variables for displaying the user editing an existing note

  $scope.saveEdits = function(){
    $scope.items[$scope.sidebarSelection][1] = $scope.editedTitle;
    $scope.items[$scope.sidebarSelection][2] = $scope.editedText;
    $scope.sidebarSelection = 'none';
    $scope.editedTitle = "";
    $scope.editedText = "";

    if ($scope.cookiesAllowed){
      $scope.setCookies();
    }
  }

  //processes saving edits

  $scope.deleteNote = function(index){
    $scope.items.splice(index, 1);

    if ($scope.cookiesAllowed){
      $scope.setCookies();
    }
  }

  //functionality for deleting a note

  $scope.deselect = function(){
    $scope.sidebarSelection = 'none';
    $scope.editedTitle = "";
    $scope.editedText = "";
    $scope.newTitle = "";
    $scope.newText = "";
  }

  //functionality for the "back without saving" button from the new note/edit note screens

  $scope.newNote = function(){
    $scope.sidebarSelection = 'newNote';
  }

  //sets variable that controls visibility of div element containing the elements for creating a note

  $scope.saveNewNote = function(){
    $scope.sidebarSelection = 'none';
    $scope.items.push(["note",$scope.newTitle,$scope.newText]);
    $scope.newTitle = "";
    $scope.newText = "";

    if ($scope.cookiesAllowed){
      $scope.setCookies();
    }
  }

  //functionality for saving a new note

  $scope.upItem = function(index) {
    [$scope.items[index], $scope.items[index-1]] = [$scope.items[index-1], $scope.items[index]];

    if ($scope.cookiesAllowed){
      $scope.setCookies();
    }
  }

  $scope.downItem = function(index) {
    [$scope.items[index], $scope.items[index+1]] = [$scope.items[index+1], $scope.items[index]];

    if ($scope.cookiesAllowed){
      $scope.setCookies();
    }
  }

  //functionaltiy for sorting the order of notes

  $scope.setCookies = function() {
    $cookies.put("items", JSON.stringify($scope.items), {
      path: '/',
      secure: true,
      samesite: 'strict',
      expires: expireDate.setDate(expireDate.getDate() + 1)
    });
  }

  $scope.getCookies = function() {
    if($cookies.get("items") != undefined) {
      return JSON.parse($cookies.get("items"));
    } else {
      return false;
    };
  }

  //cookie handling functions
  //getCookies will return false, rather than invalid (which was causing errors) if cookies are not set.
  //if cookies are not set, it means this is the user's first visit or they did not give permission to store cookies last time

  //////////////////////////////////////////////////

  if($scope.getCookies() != false) {
    $scope.items = $scope.getCookies();
  }

  //if cookie storing items is set, read from it, and load the items stored in the cookie into the items array

});
