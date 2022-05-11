const { create, vf, ev} = require('@open-wa/wa-automate')
const { color, options } = require('./function')
const figlet = require('figlet')
const fs = require('fs-extra')
const HandleMsg = require('./HandleMsg')
const {from} = require("form-data");

const start = async (bot = new bot()) => {
    console.log(color('------------------------------------------------------------------------', 'white'))
    console.log(color(figlet.textSync('DCC Bot', { font: 'Ghost', horizontalLayout: 'default' })))
    console.log(color('------------------------------------------------------------------------', 'white'))
    console.log(color('DCC Bot by', 'aqua'), color('Vinie', 'magenta'))
    console.log(color('[BOT]', 'aqua'), color('DCC Bot ta on fire!', 'magenta'))
    console.log(color('[VER]', 'aqua'), color('1.2', 'magenta'))
    bot.onStateChanged((state) => {
        console.log(color('-> [STATE]'), state)
        if (state === 'CONFLICT') bot.forceRefocus()
        if (state === 'UNPAIRED') bot.forceRefocus()
    })

    await bot.onAddedToGroup(async (chat) => {
        await bot.sendText(chat.groupMetadata.id, 'Olá Sou o DCC BOT 🤖 !\n' +
            'Para saber meus comandos, digite !comandos\n' +
            '*Lembre-se que todos os comandos precisam do prefixo ! para serem lidos pelo BOT*')
    })

    await bot.onMessage((message) => {
        HandleMsg(bot, message)
    })

    await bot.onIncomingCall(async (callData) => {
        await bot.sendText(callData.peerJid, 'Desculpe, não posso receber chamadas.\n\n-DCC bot')
    })

}
create(options(start))
    .then((bot) => start(bot))
    .catch((err) => console.error(err))
