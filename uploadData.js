import express from "express"
import data from './src/data.js'
const router = express.Router()

router.get("/", (req, res) => {
    try {
        res.json(data.race);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});

export default router