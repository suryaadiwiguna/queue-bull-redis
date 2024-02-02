"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Bull = require("bull");
const util_1 = require("util");
const sleep = (0, util_1.promisify)(setTimeout);
const app = (0, express_1.default)();
dotenv_1.default.config();
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, LISTEN_PORT } = process.env;
const redisOptions = {
    redis: { host: String(REDIS_HOST), port: Number(REDIS_PORT), password: String(REDIS_PASSWORD) }
};
//DEFINE QUEUE
const burgerQueue = new Bull("burger", redisOptions);
//REGISTER PROCESSOR
burgerQueue.process((payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Preparing the burger');
        //STEP 1
        payload.log("Grill the patty.");
        payload.progress(20);
        yield sleep(5000);
        //STEP 2
        payload.log("Toast the buns.");
        payload.progress(40);
        yield sleep(5000);
        //STEP 3
        payload.log("Add toppings.");
        payload.progress(60);
        yield sleep(5000);
        //STEP 4
        payload.log("");
        payload.log("Assemble layers.");
        payload.progress(80);
        yield sleep(5000);
        //STEP 5
        payload.log("Burger's ready.");
        payload.progress(100);
        done();
    }
    catch (error) {
        done(error);
    }
}));
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
