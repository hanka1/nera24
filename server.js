import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import config from './src/config.js'
import upload_race_events from './src/upload_race_events.js'

const app = express()
const port = config.API_PORT

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')))

// API routes for data
app.get('/api/summary', async (req, res) => {
    try {
        const result_race_data = await upload_race_events.createListForFE()
        res.json(result_race_data)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})

app.get('/api/online', async (req, res) => {
    try {
        const result_race_data = await upload_race_events.createListForFE()
        res.json(result_race_data)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})

app.get('/api', async (req, res) => {
    try {
        const result_race_data = await upload_race_events.createListForFE()
        res.json(result_race_data)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
})

// Serve the index.html file for all other routes
app.get('/*', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public', 'index.html'))
    } catch (error) {
        console.error('Error serving index.html:', error)
        res.status(500).send('Internal Server Error')
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

