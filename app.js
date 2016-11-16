
var app = angular.module('schedule', []);

app.factory('arcs', [function() {
  var o = {
    path: []
  };

  o.create = function(arc) {
    console.log(arc);
    return true;
  };

  return o;
}]);

app.controller('MainCtrl', [
  '$scope',
  'arcs',
  function($scope, arcs) {
    $scope.createEvent = function() {
      arcs.create({
        name: $scope.name,
        sthour: $scope.start_hr,
        stmin: $scope.start_mn,
        sttod: $scope.start_tod,
        endhour: $scope.end_hr,
        endmin: $scope.end_mn,
        endtod: $scope.end_tod
      });
    };
  }
]);
