(function() {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject=['$scope'];

    function LunchCheckController($scope){

      // Implementation Functions
      var splitLunchListAndFindLength = function () {
        if ($scope.lunchlist) {
            var array_of_lunch_items = $scope.lunchlist.split(',')
            return array_of_lunch_items.length;
        } else {
            return false;
        }
      };

      var checkIfLunchListHasBeenEnteredYet = function () {
          console.log("In checkIfLunchListHasBeenEnteredYet()");

          var num_items = splitLunchListAndFindLength();
          // If the number of items in the list os zero, assume
          // they have not enetered anything.
          if (num_items == 0) {
              return false;
          } else {
              return num_items;
          }
        };

      var checkIfTooManyItems = function () {
          var num_items = splitLunchListAndFindLength();
          if (num_items <= 3) {
            return true;
          } else {
            return false;
          }
        };


      // Here we interface to the View via $scope
      $scope.displayMessage = function () {
          console.log("In displayMessage()");

          // First check if any data has been entered, and display
          // helpful message if not.
          var data_ok = checkIfLunchListHasBeenEnteredYet();
          console.log("data_ok: " + data_ok)
          if (!data_ok) {
            $scope.Message = "Please enter data first";
            return;
          }

          // If the data has been entered ok, check
          // whether the number of items exceeds our limit of 3,
          // and set isplay Message as appropriate.
          var num_items_ok = checkIfTooManyItems();
          if(num_items_ok) {
            $scope.Message="Enjoy!"
            } else {
            $scope.Message="Oops, Too Much!"
            }
          };


      }; // LunchCheckController

})(); //IIFE
