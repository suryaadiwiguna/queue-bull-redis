"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleTask = void 0;
const node_cron_1 = __importDefault(require("node-cron"));
function scheduleTask() {
    node_cron_1.default.schedule('* * * * *', () => {
        console.log('Task running every minute');
    });
}
exports.scheduleTask = scheduleTask;
