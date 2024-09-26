import express from 'express'
import { promises as fs } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

//to upload data from json file to FE

const router = express.Router()
// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


router.get("/", async (req, res) => {
    try {
        const race_data = await uploadData()
        res.json(race_data.race);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

async function uploadData() {
    try {
        const data = await fs.readFile('./src/data.json', 'utf8')
        return JSON.parse(data)

    } catch (err) {
        console.log(err)
    }
}

export default router
