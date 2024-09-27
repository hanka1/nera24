import express from 'express'
import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import upload_race_events from './upload_race_events.js'

//to upload data from json file to FE

const router = express.Router()
// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.get("/", async (req, res) => {
    try {
        //const race_data = await uploadData()//for testing
        const race_data = await upload_race_events.createListForFE()//for online
        //console.log(race_data)
        res.json(race_data)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

//upload data for test from json file
async function uploadData() {
    try {
        const data = await fs.readFile('./src/data.json', 'utf8')
        const result = JSON.parse(data)
        return result.race

    } catch (err) {
        console.log(err)
    }
}

export default router
