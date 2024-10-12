import XLSX from 'xlsx'
import parse from './parse.js'
import config from './config.js'
import upload from './upload_data_from_oni_web.js'

export default {
    //upload data from excel zonehist.xls - to be replaced with direct upload from oni web page
    createJSONfromZones: () => {
        try {
            const zone_hist_json = []
            const json_file = readXlsFile(config.PATH_TO_ZONEHIST)

            json_file.forEach( el => {

                let excel_row  = {
                        zone: parse.parseZone(el['Zóna']),
                        tracker: parseInt(el.Objekt),
                        time: parse.parseTime(el['Čas']),
                        time_xls_format: el['Čas']
                    }

                zone_hist_json.push(excel_row )
    
            })

            return zone_hist_json

        } catch (err) {
            console.log(err)
        }
    },

    //upload data from excel zonehist.xls - to be replaced with direct upload from oni web page
    createJSONfromZonesEventsOniWeb: async (racers_list) => {
        try {
            ///upload data directly from oni web page
            const zone_hist_json = await upload.getZoneEvents(racers_list)
            return zone_hist_json

        } catch (err) {
            console.log(err)
        }
    },

    //upload data from excel races.xls
    createJSONfromRacers: () => {
        try {
            return readXlsFile(config.PATH_TO_RACERS)

        } catch (err) {
            console.log(err)
        }
    },
}

function readXlsFile (path){
    try {
        const workbook = XLSX.readFile(path)
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        const json = XLSX.utils.sheet_to_json(worksheet)
        const jsonString = JSON.stringify(json, null, 2)
        const jsonJSON = JSON.parse(jsonString)

        return jsonJSON
        
    } catch (error) {
        console.error(error.message);
    }

}

/*
{
    'Typ události': 'Vjezd do zóny',
    'Zóna': 'start',
    Objekt: '231',
    'Čas': 45193.37332175926,
    'Rychlost v km/h': 42
  },

 */

