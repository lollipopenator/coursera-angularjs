(function() {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject=['$scope'];

    function LunchCheckController($scope){

          // Heloer Functions
          var splitLunchListAndFindLength = function () {
            if ($scope.lunchlist) {
                var array_of_lunch_items = $scope.lunchlist.split(',')
                return array_of_lunch_items.length;
            } else {
                return false;
            }
          };


          var checkIfTooManyItems = function (num_items) {
              if (num_items <= 3) {
                return true;
              } else {
                return false;
              }
            };


      // Here is where we actually interface to the View via $scope
      $scope.displayMessage = function () {

          // First check if any data has been entered, and display
          // helpful message if not. If the number of items in the
          // list is zero, assume they have not entered anything.
          var num_items = splitLunchListAndFindLength();
          if (!num_items) {
            $scope.Message = "Please enter data first";
            return;
          }

          // If the data has been entered ok, check
          // whether the number of items exceeds our limit of 3,
          // and set isplay Message as appropriate.
          var num_items_ok = checkIfTooManyItems(num_items);
          if(num_items_ok) {
            $scope.Message="Enjoy!"
            } else {
            $scope.Message="Oops, Too Much!"
            }
          };


      };//LunchCheckController

})(); //IIFE
