const chalk = require('chalk')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo').locale('id')

/**
 * Get text with color.
 * @param {string} text
 * @param {string} [color]
 */
const color = (text, color) => {
    return !color ? chalk.cyanBright(text) : chalk.keyword(color)(text)
}

/**
 * URL validator.
 * @param {string} url
 * @returns {boolean}
 */
const isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi))
}

/**
 * Get time duration.
 * @param {Date} timestamp
 * @param {Date} now
 * @returns {number}
 */
const processTime = (timestamp, now) => {
    return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}


/**
 * Client options.
 * @param {Function} start
 */
const options = (start) => {
    const options = {
        sessionId: 'DCCBOT',
        headless: true,
        qrTimeout: 0,
        authTimeout: 0,
        restartOnCrash: start,
        cacheEnabled: false,
        hostNotificationLang: 'PT_BR',
        useChrome: true,
        killProcessOnBrowserClose: true,
        throwErrorOnTosBlock: false
    }
    return options
}

/**
 * Check is number filtered.
 * @param {string} from
 * @returns {boolean}
 */
const isFiltered = (from) => {
    return !!usedCommandRecently.has(from)
}

/**
 * Add filter to number.
 * @param {string} from
 */
const addFilter = (from) => {
    usedCommandRecently.add(from)
    setTimeout(() => {
        return usedCommandRecently.delete(from)
    }, 5000) // 5 seconds delay.
}

module.exports = {
    msgFilter: {
        isFiltered,
        addFilter
    },
    color,
    isUrl,
    processTime,
    options,
}
