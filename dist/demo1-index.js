"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Bull = require("bull");
const app = (0, express_1.default)();
dotenv_1.default.config();
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, LISTEN_PORT } = process.env;
const redisOptions = {
    redis: { host: String(REDIS_HOST), port: Number(REDIS_PORT), password: String(REDIS_PASSWORD) }
};
//DEFINE QUEUE
const burgerQueue = new Bull("burger", redisOptions);
//REGISTER QUEUE
burgerQueue.process((payload, done) => {
    console.log('Preparing the burger');
    setTimeout(() => {
        console.log("Burger ready!");
        done();
    }, 4000);
});
//ADD JOB TO THE QUEUE
burgerQueue.add({
    bun: "🍔",
    cheese: "🧀",
    toppings: ["🍅", "🥒", "🌶️", "🍍"]
});
app.get('/', (req, res) => {
    console.log("someone accessed the root");
    res.send('Hello. You are at the root.');
});
app.listen(LISTEN_PORT, () => {
    console.log(`Server is running at http://localhost:${LISTEN_PORT}`);
});
