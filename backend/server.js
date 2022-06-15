import express from 'express'
import 'dotenv/config'
import { router } from './routes/noteRoutes.js'
import { errorHandler } from './middleware/errorMiddleware.js'
import { connectDB } from './config/db.js'
const port = process.env.PORT|| 8000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/notes', router)

app.use(errorHandler)

app.listen(port, () => console.log(`Running on ${port}`))
