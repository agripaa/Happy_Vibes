const logger = require('pino');
const dayjs = require('dayjs');

const log = logger({
    transport: {
        target: 'pino-pretty'
    },
    options: {
        colorize: true
    },
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format().split('.000').join(' ')}"`
})

module.exports = log