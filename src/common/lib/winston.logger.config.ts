import winston from 'winston';

const {createLogger, format, transports, addColors} = winston

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}
addColors(colors)

const myFormat = winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

const logger = createLogger({
    level: level(),
    transports: [
        new transports.Console({
            format: format.combine(
                myFormat,
                format.colorize({all: true}),
            )
        }),
        new transports.File({
            format: myFormat,
            filename: 'logs/all.log'
        }),
    ]
})

export default logger;