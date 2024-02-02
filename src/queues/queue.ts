import Queue from "bull";

const exampleQueue = new Queue('exampleQueue', {
    redis: {
        host: 'localhost',
        port: 6379
    }
})

export default exampleQueue