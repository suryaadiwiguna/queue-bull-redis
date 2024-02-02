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
const scheduleTask_1 = require("./cron/scheduleTask");
const queue_1 = __importDefault(require("./queues/queue"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.LISTEN_PORT;
app.get('/', (req, res) => {
    console.log("someone accessed the root");
    res.send('Hello. You are at the root.');
});
(0, scheduleTask_1.scheduleTask)();
app.get('/enqueue', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield queue_1.default.add('exampleJob', { data: 'some data' });
    res.send('Job enqueued!');
}));
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
