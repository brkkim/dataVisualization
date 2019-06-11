function showData() {
    //Get the routes from our store variable
    let routes = store.routes
    // Compute the number of routes per airline.
    let airlines = groupByAirline(store.routes);
    //console.log(airlines)
    drawAirlinesChart(airlines)
    drawMap(store.geoJSON)

    let airports = groupByAirport(store.routes);
    drawAirports(airports)
    
    //drawRoutes(store.routes, "24") // <- add this line

}

function getAirlinesChartConfig() {
    // this sets up static demension of the SVG element
    let width = 350;
    let height = 400;
    let margin = {
        top: 10,
        bottom: 10,
        left: 130,  // give it enough room for y-Axis with labels.
        right: 10
    };

    // The body is the area that will be occupied by the bars.
    let bodyHeight = height - margin.top - margin.bottom;
    let bodyWidth = width - margin.right - margin.left;

    // The container is the SVG where we will draw the chart.
    // In our HTML is the svg tag with the id AirlinesChart
    let container = d3.select("#AirlinesChart");

    container.attr("width", width)
            .attr("height", height+10);

    return { width, height, margin, bodyHeight, bodyWidth, container };
}

function getAirlinesChartScales(airlines, config) {
    let { bodyWidth, bodyHeight } = config;
    let maximumCount = d3.max(airlines.map(function(d){return d.Count;}));  // find maximum routes to determine horizontal bar graph width

    let xScale = d3.scaleLinear()
                    .range([0,bodyWidth])
                    .domain([0,maximumCount]); 
        //range: Set the range to go from 0 to the width of the body
        //domain: Set the domain to go from 0 to the maximun value fount for the field 'Count'

    let yScale = d3.scaleBand()  // scaleBand for ordinal values
        .range([0, bodyHeight])
        .domain(airlines.map(a => a.AirlineName)) //The domain is the list of ailines names
        .padding(0.2); // padding to separate bars
        
    return { xScale, yScale };  // return x-axis and y-axis scales
}

function drawBarsAirlinesChart(airlines, scales, config) {
    let {margin, container} = config; // this is equivalent to 'let margin = config.margin; let container = config.container'
    let {xScale, yScale} = scales
    let body = container.append("g")  // group bars
        .style("transform", 
          `translate(${margin.left}px,${margin.top}px)`
        )
  
    let bars = body.selectAll(".bar")
                    .data(airlines);
        // Use the .data method to bind the airlines to the bars (elements with class bar)

    let selectedAirline = undefined;

    //Adding a rect tag for each airline
    bars.enter().append("rect")
        .attr("height", yScale.bandwidth())
        .attr("width", (d) => xScale(d.Count))
        .attr("y", (d) => yScale(d.AirlineName))     //set the width of the bar to be proportional to the airline count using the xScale
        .attr("fill", "#2a5599")  // this should be migrated to .css file
        .on("mouseenter", function(d) { // <- this is the new code
            selectedAirline = d.AirlineID;
            drawRoutes(selectedAirline);  //TODO: call the drawRoutes function passing the AirlineID id 'd'
            this.style.fill = "#992a5b";//TODO: change the fill color of the bar to "#992a5b" as a way to highlight the bar. Hint: use d3.select(this)
        }) // highlight barchart's bar in red when selected
        .on("mouseleave", function(d) {
            drawRoutes(null);
            this.style.fill = "#2a5599";
        })//TODO: Add another listener, this time for mouseleave
        //TODO: In this listener, call drawRoutes(null), this will cause the function to remove all lines in the chart since there is no airline withe AirlineID == null.
        //TODO: change the fill color of the bar back to "#2a5599"
  }

function drawAxesAirlinesChart(airlines, scales, config){
    let {xScale, yScale} = scales
    let {container, margin, height} = config;
    let axisX = d3.axisBottom(xScale)
                  .ticks(5)
  
    container.append("g")  // grouping x-axis parts
      .style("transform", 
          `translate(${margin.left}px,${height - margin.bottom}px)`
      )
      .call(axisX)
  
    let axisY = d3.axisLeft(yScale);    // Create an axis on the left for the Y scale
    container.append("g")  // grouping y-axis parts
        .attr("transform","translate("+margin.left+","+margin.top+")")  // move to the right position
        .call(axisY);    // Append a g tag to the container, translate it based on the margins and call the axisY axis to draw the left axis.
  }

function drawAirlinesChart(airlines) {
    let config = getAirlinesChartConfig();  // setup configurations
    let scales = getAirlinesChartScales(airlines, config); // setup scales
    drawBarsAirlinesChart(airlines, scales, config);  // draw bars based on airline route counts
    drawAxesAirlinesChart(airlines, scales, config);  // draw axes to show airline names and route counts
}