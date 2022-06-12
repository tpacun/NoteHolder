import express from 'express'
import 'dotenv/config'
import { router } from "./routes/noteRoutes.js"

const port = process.env.PORT|| 8000

const app = express()

app.use('/api/notes', router)

app.listen(port, () => console.log(`Running on ${port}`))
