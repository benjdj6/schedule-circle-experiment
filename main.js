
//Convert polar into cartesian coordinates for use in arc path
function polarToCartesian(cx, cy, r, degrees) {
    var radians = (degrees/360.0) * 2 * Math.PI;

    x = cx + r * Math.cos(radians);
    y = cy + r * Math.sin(radians);

    return [x, y];
}

//Create arc
function createArc(cx, cy, r, startDeg, endDeg) {
    var start = polarToCartesian(cx, cy, r, startDeg);
    var end = polarToCartesian(cx, cy, r, endDeg);

    var path = [
        "M", cx, cy, "L", start[0], start[1], "A", r, r, 1, 0, 1, end[0], end[1], "z"
    ].join(" ");

    return path;
}

window.onload = function() {
    document.getElementById("arc").setAttribute("d", createArc(115, 115, 115, 0, 90));
};