
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
    paths: []
  };

  o.create = function(arc) {
    var start = timeToRadians(arc.sthour, arc.stmin, arc.sttod);
    var end = timeToRadians(arc.endhour, arc.endmin, arc.endtod);
    var startCoor = polarToCartesian(115, start);
    var endCoor = polarToCartesian(115, end);

    var path = [
      "M", 115, 115, "L", startCoor[0], startCoor[1], "A", 115, 115, 1, 0, 1, endCoor[0], endCoor[1], "z"
    ].join(" ");

    o.paths.push(path);
  };

  return o;
}]);

app.controller('MainCtrl', [
  '$scope',
  'arcs',
  function($scope, arcs) {
    $scope.createEvent = function() {
      //Check that all fields are filled out
      if(!$scope.name || !$scope.start_hr || 
          !$scope.start_mn || !$scope.start_tod || !$scope.end_hr ||
          !$scope.end_mn || !$scope.end_tod) {
        return;
      }
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
