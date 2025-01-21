import ONI_XML_REQ_BODY from "./oni_config.js"

export default {
    //for NERA 24 results
    API_PORT: 3000,
    API_URL: "localhost",

    //load races and team from xls file //TODO reload from NERA 24 web pages
    PATH_TO_RACERS: "./src/data/racers.xlsx",  

    //load data for laps if racer forgot tracker or tracker is broken down 
    PATH_TO_MISSING_LAPS: "./src/data/missing_laps.xlsx",  //TODO reload from NERA 24 web pages

    //TODO reload from web pages
    START_TIME: '09/28/2024 10:30:00',

    //to set "xls", "web" - choose xls table or oni web to upload race events data from trackers
    SET_XLS_OR_WEB_EVENTS_LOADING: "xls", 

    //upload race events tracker data from xls file 
    PATH_TO_ZONEHIST: "./src/data/zonehist.xlsx",
    
    //upload race events tracker data from oni web page
    LOADED_EVENT_MAP: new Map([ //id from oni web pages - TODO update before 2025
        [6153, "green"],
        [6152, "red"],
        [6151, "start"],
        [6261, "finish"]
    ]),

    ONI_URL: "http://www.onisystem.net/ws/inetg/inetg",
    ONI_HEADERS:  {
        'Content-Type': 'application/soap+xml; charset=utf-8',
        'SOAPAction': 'http://www.onisystem.net/ws/inetg/inetg/getZoneEvents'
    },
    ONI_XML_REQ_BODY: ONI_XML_REQ_BODY

}

