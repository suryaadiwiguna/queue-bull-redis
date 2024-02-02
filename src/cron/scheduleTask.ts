import cron from 'node-cron'

export function scheduleTask() {
    cron.schedule('* * * * *', () => {
        console.log('Task running every minute')
    })
}
