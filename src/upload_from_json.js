import express from 'express'
import upload_race_events from './upload_race_events.js'

const router = express.Router()

//to upload data from  prepared json to FE
router.get("/", async (req, res) => {
    try {
        const result_race_data = await upload_race_events.createListForFE()
        res.json(result_race_data)

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})

export default router
