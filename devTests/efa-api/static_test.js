var request = require('request');
var moment = require('moment');

const baseURL = "http://efa-bw.de/nvbw/XML_DM_REQUEST";

//const stationQuery = "5200026"; //Heilbronn Hauptbahnhof
//const stationQuery = "Heilbronn, Harmonie (Stadtbahn)";
const stationQuery = "Heilbronn Wollhausplatz"

var dateStr = moment().format('YYYYMMDD');
var timeStr = moment().format('HHmm');
console.log(dateStr, timeStr);

firstRequest();

function callback(data) {
    //console.log(data.departureList[0]);
    data.departureList.forEach((elem) => {
        var tmpString = "";
        var time = moment(elem.dateTime); //luckily all dateTime object keys match with the moment object keys
        tmpString += time.format('DD.MM. HH:mm') + ' | ';
        tmpString += elem.platform + ' | ';
        var l = elem.servingLine;
        tmpString += l.number + ' ' + l.direction;
        console.log(tmpString);
    });
}

function firstRequest() {
    var url = baseURL+'?sessionID=0&locationServerActive=1&type_dm=any&outputFormat=JSON&dmLineSelectionAll=1&itdDate='
            +dateStr+'&itdTime='+timeStr+'&name_dm='+encodeURIComponent(stationQuery);
    console.log("sending http GET", url);
    request(url, (error, response, body) => {
                if(!error && response.statusCode == 200) {
                    var data = JSON.parse(body);
                    //console.log(data.dm.points, data.dm.points.length);
                    if(!(data.dm.points instanceof Array)) { //when only a single point is found (result not an array)
                        var sessionID;
                        data.parameters.forEach((elem) => {
                            if(elem.name === "sessionID")
                                sessionID = elem.value;
                        });
                        if(sessionID != undefined) {
                            //console.log(sessionID);
                            secondRequest(sessionID);
                        }
                        else
                            console.log("error getting sessionID in firstRequest");
                    }
                    else {
                        console.log("ERROR: multiple stations with that name found, please enter a unique station name, until better implemented");
                        data.dm.points.forEach((elem) => {
                            console.log(elem.ref.id + ' | ' + elem.name);
                        });
                    }
                }
        });
}

function secondRequest(sessionID) {
    var url = baseURL+'?requestID=1&dmLineSelectionAll=1&outputFormat=JSON&sessionID='+sessionID;
    console.log("sending http GET", url);
    request(url, (error, response, body) => {
                if(!error && response.statusCode == 200) {
                    var data = JSON.parse(body);
                    callback(data);
                    //console.log(body);
                }
        });
}
