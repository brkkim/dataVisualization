function drawRoutes(airlineID) {
    let routes = store.routes// get the routes from store 
    let projection = getMapProjection(getMapConfig()); // get the projection from the store 
    let container = d3.select("#Map"); // select the svg with id "Map" (our map container)
    let selectedRoutes = routes.filter(d => d.AirlineID === airlineID)//TODO: filter the routes to keep only the routes which AirlineID is equal to the parameter airlineID received by the function
    
    let bindedData = container.selectAll("line")
        .data(selectedRoutes, d => { return d.AirlineID === airlineID}) //This seconf parameter tells D3 what to use to identify the routes, this hepls D3 to correctly find which routes have been added or removed.
        
    let newelements = bindedData.enter()
        .append("line")    // Use the .enter selector to append a line for each new route.
        // for each line set the start of the line (x1 and y1) to be the position of the source airport (SourceLongitude and SourceLatitude) Hint: you can use projection to convert longitude and latitude to x and y.
        .attr("x1", d => projection([+d.SourceLongitude, +d.SourceLatitude])[0])
        .attr("y1", d => projection([+d.SourceLongitude, +d.SourceLatitude])[1])
        .attr("x2", d => projection([+d.DestLongitude, +d.DestLatitude])[0])
        .attr("y2", d => projection([+d.DestLongitude, +d.DestLatitude])[1])//TODO: for each line set the end of the line (x2 and y2) to be the position of the source airport (DestLongitude and DestLongitude)
        .style("opacity", 0.1)
        .style("stroke", "#992a2a")

    //TODO: set the color of the stroke of the line to "#992a2a"
    //TODO: set the opacity to 0.1
        
    //TODO: use exit function over bindedData to remove any routes that does not satisfy the filter.
    bindedData.exit().remove();
}
