var dataArray = [25, 26, 28, 32, 37, 45, 55, 70, 90, 120, 135, 150, 160, 168, 172, 177, 180];
var dataYears = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016'];

var parseDate = d3.timeParse("%Y");   // %Y - yyyy year format conversion

var height = 200;
var width = 500;

// add linear scale for axis
var y = d3.scaleLinear()
        .domain([0, d3.max(dataArray)])
        .range([height,0]); // invert the min/max since browser draws top to bottom

// add x-axis
var x = d3.scaleTime()
        .domain(d3.extent(dataYears, function(d){ return parseDate(d); }))
        .range([0, width]);

// axis generator - has four type, left, right, top and bottom
// axis generator requires g tag
// axis doesn't automatically line up with chart so define margin
var margin = {left:50, right:50, top:40, bottom:0};

//add y-axis using d3 axis generator.
var yAxis = d3.axisLeft(y)
            .ticks(3).tickPadding(10).tickSize(10);  // styling - number of tick marks on the axis

var xAxis = d3.axisBottom(x);

// area generator example
var area = d3.area()
                .x(function(d, i){ return x(parseDate(dataYears[i])); })  // leverage data to match area graph to x-axis scale
                .y0(height)
                .y1(function(d) { return y(d); });  // drawing upper boundary 

// drawing an area and there are more area generators in d3, check d3 documentation for others
// search "generator" in ther documentation
// bl.ocks.org has examples and has code to re-create the examples
var svg = d3.select("body").append("svg").attr("height", "100%").attr("width", "100%");

var chartGroup = svg.append("g")
    .attr("transform","translate("+margin.left+","+margin.top+")");

// group area chart into a group
chartGroup.append("path").attr("d", area(dataArray));

// include axis which is another group of graphics into area group to group everything together
chartGroup.append("g")
.attr("class","axis y")
    .call(yAxis);

// add x-axis on the bottom
chartGroup.append("g")
    .attr("class","axis x")
    .attr("transform","translate(0,"+height+")")  // need to shift x-axis down since it's positioned at 0,0 coordinate
    .call(xAxis);