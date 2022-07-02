import express from 'express'
import 'dotenv/config'
import { router } from './routes/noteRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import { connectDB } from './config/db.js'
import path from 'path'
import { fileURLToPath } from 'url'
const port = process.env.PORT|| 8000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/notes', router)

// Serve frontend

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend')))
    app.get('*', (req, res) =>res.sendFile(path.resolve(__dirname, '../', 'frontend', 'index.html')))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Running on ${port}`))
