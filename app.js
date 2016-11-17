
var app = angular.module('schedule', []);

function timeToDegrees(hour, minute, timeofday) {
  if(timeofday === "pm" && hour != 12) {
    hour += 12;
  }
  minute = minute/60.0;
  ratio = (minute + hour)/24.0;
  return ratio * 360.0;
}

app.factory('arcs', [function() {
  var o = {
    path: []
  };

  o.create = function(arc) {
    var start = timeToDegrees(arc.sthour, arc.stmin, arc.sttod);
    var end = timeToDegrees(arc.endhour, arc.endmin, arc.endtod);
    console.log(start);
    console.log(end);
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
