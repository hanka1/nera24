import upload_race_events from './src/upload_race_events.js'
import { writeFile } from 'fs'

const result_race_data = await upload_race_events.createListForFE()

const saveJSONToFile = (result_race_data, filename) => {
    try {
        const jsonString = "result_race_data = " + JSON.stringify(result_race_data, null, 2)
    
        writeFile(`docs/public/data/${filename}.js`, jsonString, (err) => {
            if (err) {
                console.error('Error writing file', err)
            } else {
                console.log('File has been saved')
            }
        })

    } catch (err) {
        console.log(err)
    }

}

saveJSONToFile(result_race_data, 'result_race_data');
