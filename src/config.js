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

    //upload race data from trackers from oni web pages
    LOADED_EVENT_MAP: new Map([
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
    ONI_XML_REQ_BODY: 
        `
            <soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:inet="http://www.onisystem.net/ws/inetg/inetg">
            <soap:Header/>
                <soap:Body>
                    <inet:getZoneEvents>
                        <!--Optional:-->
                        <username>O.66.majitel.webservice</username>
                        <!--Optional:-->
                        <password>webservice24</password>
                        <!--Optional:-->
                        <lang>cs</lang>
                        <!--Optional:-->
                        <timefrom>2024-09-28T10:30:00+02:00</timefrom>       
                        <!--Zero for all objects or more repetitions:-->
                        <!--<idobj>77057</idobj>-->
                    </inet:getZoneEvents>
                </soap:Body>
            </soap:Envelope>;
        `,

    //reload race events from xls file - TODO? alternative?
    PATH_TO_ZONEHIST: "./src/data/zonehist.xlsx",

}

