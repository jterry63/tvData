var request = require('request');
var cliAction = process.argv[2];
var cliRequest = process.argv.slice(3).join(" ");


switch (cliAction) {
    case "actor":
        searchActor();
        break;

    case "show":
        searchShow();
        break;

    default:
        console.log("Please try again, cli doesn't understand your request.");
}

function searchActor() {
    var actorName = cliRequest;
    console.log("\n" + "Searching for " + cliRequest);
    request('http://api.tvmaze.com/search/people?q=' + actorName, function (error, response, body) {
        if (error) {
            console.log("An error has occurred: " + error);
            console.log('statusCode:', response && response.statusCode);
        }

        var jsonData = JSON.parse(body);

        console.log("================================" + "\n")
        console.log("Name: " + jsonData[0].person.name + "\n");
        console.log("Birthday: " + jsonData[0].person.birthday + "\n");
        console.log("Country: " + jsonData[0].person.country.name + "\n");
        console.log("Gender: " + jsonData[0].person.gender + "\n");
        console.log("URL: " + jsonData[0].person.url + "\n");

    });
}

function searchShow() {
    var showName = cliRequest;
    console.log("\n" + "Searching for " + showName);
    request('http://api.tvmaze.com/singlesearch/shows?q=' + showName, function (error, response, body) {
        if (error) {
            console.log("An error has occurred: " + error);
            console.log('statusCode:', response && response.statusCode);
        }

        var jsonData = JSON.parse(body);

        console.log("================================" + "\n")
        console.log("Show: " + jsonData.name + "\n");
        console.log("Genre(s): " + jsonData.genres + "\n");
        console.log("Rating: " + jsonData.rating.average + "\n");
        console.log("Network: " + jsonData.network.name + "\n");
        console.log("Summary: " + jsonData.summary + "\n");

    });
}