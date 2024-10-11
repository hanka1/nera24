import fetch from "node-fetch"
import xml2js from "xml2js"
import config from "./config.js"

export default {
    //upload data directly from oni web page
    getZoneEvents: async () => {
        try {

            //fetch and parse XML data
            let uploaded_zone_events = await fetchAndParseXML()//[]
            console.log(uploaded_zone_events)

            //parse to JSON to right format - TODO
            
            return uploaded_zone_events

        } catch (err) {
            console.log(err)
        }
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
        const result = parser.parseString(responseBody, (err, result) => {
            if (err) {
                console.error(err)
                return {}
            } else {
                const body = result['soap:Envelope']['soap:Body']
                const events = body['ns2:getZoneEventsResponse'].return
                return JSON.stringify(events, null, 2)
            }
        })

        return result
        
    } catch (err) {
        console.error("Error fetching or parsing XML:", err)
    }
}