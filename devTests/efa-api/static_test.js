var request = require('request');

const baseURL = "http://efa-bw.de/nvbw/XML_DM_REQUEST";

//const stationQuery = "Heilbronn Hbf";
//const stationQuery = "Heilbronn Harmonie";
const stationQuery = "Heilbronn Wollhausplatz"


var tzoffset = (new Date()).getTimezoneOffset() * 60000;
var now = (new Date(Date.now() - tzoffset));
var dateParts = now.toISOString().split('T');
var dateStr = dateParts[0].split('-').join(''); //bad code, do not replicate
var timeStr = dateParts[1].split('.')[0].split(':').join('').slice(0, -2);
console.log(dateStr, timeStr);



firstRequest();

function callback(data) {
    //console.log(data.departureList[0]);
    data.departureList.forEach((elem) => {
        var tmpString = "";
        var d = elem.dateTime;
        tmpString += d.day + '.' + d.month + '. ' + d.hour + ':' + d.minute + ' | ';
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
                    if(data.dm.points.length == undefined) { //when only a single point is found
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
                        console.log("multiple stations with that name found, please check on efa-bw.de for a unique station name, until better implemented");
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
