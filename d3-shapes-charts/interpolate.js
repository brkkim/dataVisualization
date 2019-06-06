var dataArray = [{x:5, y:5},{x:10, y:15},{x:20, y:7},{x:30, y:18},{x:40, y:10}];
var interpolateTypes = [d3.curveLinear, d3.curveNatural, d3.curveStep, d3.curveBasis, d3.curveBundle, d3.curveCardinal];

var svg = d3.select("body").append("svg")
            .attr("height","100%")
            .attr("width","100%");

for (var p=0; p<6; p++) {
    // d3 generator - line
    // generator always comes first before it gets called
    var line = d3.line()
                .x(function(d, i) { return d.x * 6;})
                .y(function(d, i) { return d.y * 4;})  // upto here, creates a path that connects each coordinate
                //.curve(d3.curveStep);  // creating step-like path
                //.curve(d3.curveCardinal);  // creating curvy line  -- there are more than 18 curve shapes in d3
                .curve(interpolateTypes[p]);

    // add group to handle entire path and dots on the graph
    var shiftX = p*250; // shift right for each path
    var shiftY = 0;

    var chartGroup = svg.append("g")
        .attr("class","group"+p)
        .attr("transform","translate("+shiftX+",0)");

    // add path to svg by including inside <g> group tag
    chartGroup.append("path")
        .attr("stroke","blue")
        .attr("fill","none")
        .attr("d", line(dataArray));

    // add dots on path
    chartGroup.selectAll("circle.grp"+p)
        .data(dataArray)
        .enter().append("circle")
                .attr("class", function(d,i){ return "grp"+i;})
                .attr("cx",function(d,i){ return d.x * 6; })
                .attr("cy",function(d,i){ return d.y * 4; })
                .attr("r", "2");
}
