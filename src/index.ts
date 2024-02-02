import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import Bull = require('bull')

const app = express()
dotenv.config()
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, LISTEN_PORT } = process.env
const redisOptions: Bull.QueueOptions = {
    redis: { host: String(REDIS_HOST), port: Number(REDIS_PORT), password: String(REDIS_PASSWORD) }
}


//DEFINE QUEUE
const burgerQueue = new Bull("burger", redisOptions)

//REGISTER QUEUE
burgerQueue.process((payload, done) => {
    console.log('Preparing the burger')
    setTimeout(() => {
        console.log("Burger ready!")
        done()
    }, 4000)
})

//ADD JOB TO THE QUEUE
burgerQueue.add({
    bun: "🍔",
    cheese: "🧀",
    toppings: ["🍅", "🥒", "🌶️", "🍍"]
})

app.get('/', (req: Request, res: Response) => {
    console.log("someone accessed the root")
    res.send('Hello. You are at the root.')
})

app.listen(LISTEN_PORT, () => {
    console.log(`Server is running at http://localhost:${LISTEN_PORT}`)
})