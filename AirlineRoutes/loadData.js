let container = d3.select("mainView"); // find main <div> tag
let store = {};  // setup an empty dictionary for data storage

// load data by reading from a .csv file
function loadData() {
    return Promise.all([d3.csv("routes.csv"),
                        d3.json("countries.geo.json")])
                  .then(files => { 
                                    store.routes = files[0]; 
                                    store.geoJSON = files[1]; 
                                    return store;
                                });
}

function groupByAirline(data) {
    // Iterate over each routes, producing a dictionary where the keys is are the airline ids and the values
    // are the information of the airline.

    // following statements create a new airline id value in the dictionary if it doesn't exist already, otherwise, it goes to next airline id value
    let result = data.reduce((result, d) => {
        let currentData = result[d.AirlineID] || {
            "AirlineID": d.AirlineID,
            "AirlineName": d.AirlineName,
            "Count": 0
        };

        currentData.Count += 1;  // Increment the count (number of routes) of airline.
        result[d.AirlineID] = {"AirlineID":d.AirlineID,"AirlineName":d.AirlineName, "Count": currentData.Count};  // updating the values in the dictionary
        return result;
    }, {})

    // we use this to convert the dictionary produced by the code above,
    // into a list, that will make it easier to create the visualization.
    result = Object.keys(result).map(key => result[key]);
    result = result.sort((a, b) => {
        return d3.descending(a.Count, b.Count);
    }) // sort the data in descending order of count.

    return result;  //returning list of json objects
}
/* debug code to show data points
function showData() {
    //Get the routes from our store variable
    let routes = store.routes;

    // Compute the number of routes per airline.
    let airlines = groupByAirline(store.routes);
    console.log(airlines);
}

loadData().then(showData);
*/

