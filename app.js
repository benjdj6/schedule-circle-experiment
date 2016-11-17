
var app = angular.module('schedule', []);

function timeToRadians(hour, minute, timeofday) {
  if(timeofday === "pm" && hour != 12) {
    hour += 12;
  }
  minute = minute/60.0;
  ratio = (minute + hour)/24.0;
  return ratio * 2 * Math.PI;
}

function polarToCartesian(r, radians) {
  x = 115 + r * Math.cos(radians);
  y = 115 + r * Math.sin(radians);

  return [x, y];
}

app.factory('arcs', [function() {
  var o = {
    path: []
  };

  o.create = function(arc) {
    var start = timeToRadians(arc.sthour, arc.stmin, arc.sttod);
    var end = timeToRadians(arc.endhour, arc.endmin, arc.endtod);
    startCoor = polarToCartesian(115, start);
    endCoor = polarToCartesian(115, end);
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
