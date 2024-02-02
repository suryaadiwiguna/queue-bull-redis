import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import { scheduleTask } from './cron/scheduleTask'
import exampleQueue from './queues/queue'

dotenv.config()

const app = express()
const port = process.env.LISTEN_PORT

app.get('/', (req: Request, res: Response) => {
    console.log("someone accessed the root")
    res.send('Hello. You are at the root.')
})

scheduleTask()

app.get('/enqueue', async (req: Request, res: Response) => {
    await exampleQueue.add('exampleJob', { data: 'some data' })
    res.send('Job enqueued!')
})


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})