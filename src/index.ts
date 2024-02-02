import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import Bull = require('bull')
import { promisify } from 'util'
const sleep = promisify(setTimeout)

const app = express()
dotenv.config()
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, LISTEN_PORT } = process.env
const redisOptions: Bull.QueueOptions = {
    redis: { host: String(REDIS_HOST), port: Number(REDIS_PORT), password: String(REDIS_PASSWORD) }
}


//DEFINE QUEUE
const burgerQueue = new Bull("burger", redisOptions)

//REGISTER PROCESSOR
burgerQueue.process(async (payload, done) => {
    try {
        console.log('Preparing the burger')
        //STEP 1
        payload.log("Grill the patty.")
        payload.progress(20)
        await sleep(5000)
        //STEP 2
        payload.log("Toast the buns.")
        payload.progress(40)
        await sleep(5000)
        //STEP 3
        payload.log("Add toppings.")
        payload.progress(60)
        await sleep(5000)
        //STEP 4
        payload.log("")
        payload.log("Assemble layers.")
        payload.progress(80)
        await sleep(5000)
        //STEP 5
        payload.log("Burger's ready.")
        payload.progress(100)
        done()
    } catch (error) {
        done(error as Error)
    }
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