
var app = angular.module('schedule', []);

//Take time and calculate radians around the circle
function timeToRadians(hour, minute, timeofday) {
  if(timeofday === "pm" && hour != 12) {
    hour += 12;
  }
  minute = minute/60.0;
  ratio = (minute + hour)/24.0;
  return ratio * 2 * Math.PI;
}

//Take radians and radius and calculate the cartesian coordinates
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
    var r = 115;
    if(arc.priority === "low") {
      r = 75;
    } else if (arc.priority === "med") {
      r = 95;
    }
    var start = timeToRadians(arc.sthour, arc.stmin, arc.sttod);
    var end = timeToRadians(arc.endhour, arc.endmin, arc.endtod);
    var startCoor = polarToCartesian(r, start);
    var endCoor = polarToCartesian(r, end);

    var path = [
      "M", 115, 115, "L", startCoor[0], startCoor[1], "A", r, r, 1, 0, 1, endCoor[0], endCoor[1], "z"
    ].join(" ");

    o.paths.push({category: arc.category, data: path});
  };

  return o;
}]);

app.controller('MainCtrl', [
  '$scope',
  'arcs',
  function($scope, arcs) {
    $scope.paths = arcs.paths;
    $scope.createEvent = function() {
      //Check that all fields are filled out
      if(!$scope.name || !$scope.start_hr || 
          !$scope.start_mn || !$scope.start_tod || !$scope.end_hr ||
          !$scope.end_mn || !$scope.end_tod || !$scope.category ||
          !$scope.priority) {
        return;
      }
      arcs.create({
        name: $scope.name,
        sthour: $scope.start_hr,
        stmin: $scope.start_mn,
        sttod: $scope.start_tod,
        endhour: $scope.end_hr,
        endmin: $scope.end_mn,
        endtod: $scope.end_tod,
        category: $scope.category,
        priority: $scope.priority
      });
    };
  }
]);
