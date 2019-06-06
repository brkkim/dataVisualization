var dataArray = [5, 11, 18];

// ordinal data plotting
var dataDays = ['Mon','Wed','Fri'];

/*var x = d3.scaleOrdinal()
        .domain(dataDays)
        .range([25,85,145]);
*/
var x = d3.scaleBand()
        .domain(dataDays)
        .range([0, 170])
        .paddingInner(0.1176);

/**
 var x = d3.scalePoint()
        .domain(dataDays)
        .range([0, 170]);
 */

var xAxis = d3.axisBottom(x);

var svg = d3.select("body").append("svg").attr("height","100%").attr("width","100%");

// find the rectangle on on svg and associated to elements in dataArray
// if elements and rectangle count does not match if will return enter selection.
// any unmatching left of rectangle(excess) will be returned as exit selection.
var selrect = svg.selectAll("rect.one")
        .data(dataArray)
        .enter().append("rect")
                .attr("class","one")
                .attr("height", function(d, i){ return d*15;})  //d is data point and i is index
                .attr("width","50")
                .attr("fill","pink")
                .attr("x",function(d, i){ return 60*i;})
                .attr("y",function(d, i){ return 300-(d*15)});

/**
 * Ordinal plotting
 */
svg.append("g")
        .attr("class","x axis hidden")
        .attr("transform","translate(0, 300)")
        .call(xAxis);

 /**** end of ordinal plotting *** */

// add a circle... shapes are svg shapes and maintained by html authors
var newX = 300;  // moving to x position to right of bar chart above.
var selcir = svg.selectAll("circle.first")
        .data(dataArray)
        .enter().append("circle")
                .attr("class","first")  // add class attribute
                .attr("fill","blue")
                .attr("cx",function(d, i){ newX += (d*3)+(i*20); return newX;})
                .attr("cy","100")
                .attr("r",function(d, i){ return 3*d;});

// add elipse requires 4 attributes cx, cy (center location), rx, ry (radius shape)
newX = 600;
var selelp = svg.selectAll("ellipse.second")
        .data(dataArray)
        .enter().append("ellipse")
                .attr("class","second")
                .attr("fill","cyan")
                .attr("cx",function(d, i){ newX += (d*3)+(i*20); return newX;})
                .attr("cy","100")
                .attr("rx",function(d, i){ return 3*d;})
                .attr("ry","20");

// add a horizontal line (y1 and y2 vales are the same) - it is a straight line and has x1, y1 and x2, y2 attributes
// a line requires "stroke" attribute to appear on screen
// a line can have .style("stroke","green") or .attr("stroke","green") and also have css styling line { stroke: green }
// order of precedence is .style, css, then .attr
// best practice is to use css, attr and then style;  this was implemented using css thus both attr and style is commented out
newX = 900;
var selline = svg.selectAll("line.newline")
        .data(dataArray)
        .enter().append("line")
                .attr("class","newline")
                //.attr("stroke","red")
                //.style("stroke","green")
                .attr("stroke-width","2")
                .attr("x1",newX)
                .attr("y1",function(d, i){ return 80 + (i*20);})
                .attr("x2",function(d, i){ return newX + (d*15);})
                .attr("y2",function(d, i){ return 80 + (i*20);});

// polygon exists but don't usually use them...

// text example - text requires coordinate 
var seltext = svg.append("text")
                .attr("x", newX)
                .attr("y",150)
                .attr("stroke","blue")
                .attr("stroke-width","2")
                .attr("fill","none")
                .attr("text-anchor","start")
                .attr("dominant-baseline","middle")
                .attr("font-size",30)
                .text("start!");

var seltext2 = svg.append("text")
                .attr("x", newX)
                .attr("y",180)
                .attr("stroke","none")
                .attr("fill","blue")
                .attr("text-anchor","middle")
                .attr("dominant-baseline","middle")
                .attr("font-size",30)
                .text("middle");

var seltext3 = svg.append("text")
                .attr("x", newX)
                .attr("y",210)
                .attr("stroke","blue")
                .attr("fill","none")
                .attr("text-anchor","end")
                .attr("dominant-baseline","middle")
                .attr("font-size",30)
                .text("end");

svg.append("line")
    .attr("x1",newX)
    .attr("y1", 150)
    .attr("x2",newX)
    .attr("y2", 210)
    .attr("stroke","blue")
    .attr("stroke-width", 2);

// adding data driven text
newX += 200
var textArray = ['data-start', 'data-middle','data-end'];
var seltext = svg.append("text").selectAll("tspan")
                .data(textArray)
                .enter().append("tspan")
                .attr("x", newX)
                .attr("y",function(d,i) { return 150 + (i*30);})
                .attr("stroke","blue")
                .attr("stroke-width","2")
                .attr("fill","none")
                .attr("text-anchor","start")
                .attr("dominant-baseline","middle")
                .attr("font-size",30)
                .text(function(d) { return d;});
