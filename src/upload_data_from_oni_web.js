import fetch from "node-fetch"
import xml2js from "xml2js"
import config from "./config.js"
import parse from "./parse.js"

export default {
    //upload data directly from oni web page
    getZoneEvents: async (racers_list) => {
        try {

            //fetch and parse XML data
            let uploaded_zone_events = await fetchAndParseXML()//[]

            //parse to JSON to format like xlsx data
            let processed_zone_events = await getProcessedZoneEvents(uploaded_zone_events, racers_list)
            
            return processed_zone_events

        } catch (err) {
            console.log(err)
        }
    }
}

// Function to create array in format as xls_data_zone_events, to add yone mane instead of number, to get tracker insted of obj_id
async function getProcessedZoneEvents(uploaded_zone_events, racers_list) {
    try {

        let result = []
        uploaded_zone_events.forEach( event => {
            result.push({
                idobj: event.idobj,
                zone: config.LOADED_EVENT_MAP.get(event.idzone) || "undefined", //zones: reg, green, start, finish //TODO solve undefined
                tracker: getTrackerId(event.idobj, racers_list),
                time: event.time//date and time calculated from serial excel number
            })
         })

        return result
        
    } catch (err) {
        console.log(err)
    }
}

// Function to fetch and parse XML response
function getTrackerId(idobj, racers_list) {
    try {

        let tracker_id = null

        racers_list.forEach(racer => {
            if (parseInt(racer.idobj) == idobj)
                tracker_id = racer.tracker_id
        })

        return tracker_id
        
    } catch (err) {
        console.log(err)
    }
}

// Function to fetch and parse XML response
async function fetchAndParseXML() {
    try {

        // Fetch the XML response
        const response = await fetch(config.ONI_URL, {
            method: 'POST',
            headers: config.ONI_HEADERS,
            body: config.ONI_XML_REQ_BODY
        })
        const responseBody = await response.text()

        // Parse the XML response
        const parser = new xml2js.Parser({ explicitArray: false })
        const result_arr = []
        parser.parseString(responseBody, (err, result) => {
            if (err) {
                console.error(err)
            } else {
                const body = result['soap:Envelope']['soap:Body']
                const events = body['ns2:getZoneEventsResponse'].return
                const jsons = JSON.parse((JSON.stringify(events, null, 2)))
                for (let event of jsons){
                    result_arr.push({
                        type: event.type,
                        idzone: parseInt(event.idzone),
                        idobj: parseInt(event.idobj),
                        time: parse.parseTimeUnit(event.timeunit),
                    }) 
                }
            }
        })
  
        return result_arr
        
    } catch (err) {
        console.log(err)
    }
}