
var app = angular.module('schedule', []);

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
    var start = this.timeToRadians(arc.sthour, arc.stmin, arc.sttod);
    var end = this.timeToRadians(arc.endhour, arc.endmin, arc.endtod);

    if(start >= end) {
      alert('Invalid start and end times!');
      return;
    }

    var startCoor = this.polarToCartesian(r, start);
    var endCoor = this.polarToCartesian(r, end);

    var largeArc = 0;
    if(end - start >= Math.PI) {
      largeArc = 1;
    }

    var path = [
      "M", 115, 115, "L", startCoor[0], startCoor[1], "A", r, r, 1, largeArc, 1, endCoor[0], endCoor[1], "z"
    ].join(" ");

    o.paths.push({category: arc.category, data: path});
  };

  //Take time and calculate radians around the circle
  o.timeToRadians = function(hour, minute, timeofday) {
    if(timeofday === "pm" && hour != 12) {
      hour += 12;
    }
    if(timeofday === "am" && hour == 12) {
      hour -= 12;
    }
    minute = minute/60.0;
    ratio = (minute + hour)/24.0;
    return ratio * 2 * Math.PI;
  };

  //Take radians and radius and calculate the cartesian coordinates
  o.polarToCartesian = function(r, radians) {
    x = 115 + r * Math.cos(radians);
    y = 115 + r * Math.sin(radians);

    return [x, y];
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
      if(!$scope.name || $scope.start_hr == undefined || 
          $scope.start_mn == undefined || !$scope.start_tod || 
          $scope.end_hr == undefined || $scope.end_mn == undefined || 
          !$scope.end_tod || !$scope.category || !$scope.priority) {

        alert('Invalid form entry!')
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
