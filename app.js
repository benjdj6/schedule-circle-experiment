
var app = angular.module('schedule', []);

//The factory for arcs containing all relevant functions
app.factory('arcs', [function() {
  var o = {
    paths: []
  };

  //Main create arc function
  //Determines if arcs should be drawn on one or both circles
  //Calls appropriate function
  o.create = function(arc) {
    var r = 55 + (arc.priority * 20);
    var start = this.timeToRadians(arc.sthour, arc.stmin, arc.sttod);
    var end = this.timeToRadians(arc.endhour, arc.endmin, arc.endtod);
    if(start >= end) {
      alert('Invalid start and end times!');
      return;
    }

    if(arc.sttod == arc.endtod) {
      this.oneArc(r, start * 2, end * 2, arc, arc.sttod);
    }
    else {
      this.splitArc(r, start, end, arc);
    }
  };

  //Splits the arc into two, one for AM the other for PM
  //Then calls the oneArc function once for each
  o.splitArc = function(r, start, end, arc) {
    am_start = 2 * start;
    am_end = (2 * Math.PI) - 0.0001;

    pm_start = 0;
    pm_end = 2 * (end - Math.PI);

    o.oneArc(r, am_start, am_end, arc, "am");
    o.oneArc(r, pm_start, pm_end, arc, "pm");
  }

  //Calculates cartesian coordinates, generates path
  //Then adds to the paths array
  o.oneArc = function(r, start, end, arc, timeof) {
    var startCoor = this.polarToCartesian(r, start);
    var endCoor = this.polarToCartesian(r, end);

    var largeArc = 0;
    if(end - start >= Math.PI) {
      largeArc = 1;
    }

    var path = [
      "M", 150, 150, "L", startCoor[0], startCoor[1], "A", r, r, 
      1, largeArc, 1, endCoor[0], endCoor[1], "z"
    ].join(" ");

    if(arc.stmin < 10 && arc.stmin !== "00") {
      arc.stmin = "0" + arc.stmin;
    }

    if(arc.endmin < 10 && arc.endmin !== "00") {
      arc.endmin = "0" + arc.endmin;
    }

    var start_time = arc.sthour + ":" + arc.stmin + 
      " " + arc.sttod.toUpperCase();

    var end_time = arc.endhour + ":" + arc.endmin +
      " " + arc.endtod.toUpperCase();

    o.paths.push({
      name: arc.name,
      start: start_time,
      end: end_time,
      category: arc.category, 
      priority: arc.priority,
      time_of: timeof, 
      data: path
    });

    console.log(o.paths);
  }

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
    x = 150 + r * Math.cos(radians);
    y = 150 + r * Math.sin(radians);

    return [x, y];
  };

  return o;
}]);

//Controller for index.html handles form submissions
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
