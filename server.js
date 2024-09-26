import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from "node-fetch"
import fs from "fs"


import config from './src/config.js';
import uploadData from './src/uploadData.js'

const app = express();
const port = config.ApiPort;

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use("/refresh", uploadData)


// Serve the index.html file
app.get('/', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    } catch (error) {
        console.error('Error serving index.html:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://${config.url}:${port}/`);
});
