
var app = angular.module('schedule', []);

app.controller('MainCtrl', [
  '$scope',
  function($scope) {
    $scope.createEvent = function() {
      console.log($scope);
    }
  }
]);
