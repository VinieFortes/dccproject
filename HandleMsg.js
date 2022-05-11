require('dotenv').config()
const { decryptMedia } = require('@open-wa/wa-automate')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo').locale('id')
const axios = require('axios')
const bent = require('bent')
const gis = require('g-i-s');
const ytdl = require('ytdl-core');
const appRoot = require('app-root-path')
const { Readable, Writable } = require('stream')
const fs = require('fs-extra')
const Canvas = require(`canvas`);
const instagram = require('user-instagram');
const fetch = require('node-fetch');
const {
    exec
} = require('child_process')


const {
    menuId,
} = require('./lib')

const {
    color,
    processTime,
    isUrl
} = require('./utils')

const { uploadImages, fetchBase64, fetchText} = require('./utils/fetcher')
const cheerio = require("cheerio");
const deepai = require("deepai");
const {ind} = require("./message/text/lang/");
const {default: Scraper} = require("@yimura/scraper");
const http = require("http");
const {rankgay, rankfeio, rankqi, ranklindo, ranknazi, cep, cpf, cartao, imgNeko} = require("./lib/botApis");
const {json} = require("mathjs");
const {data} = require("cheerio/lib/api/attributes");
const puppeteer = require('puppeteer');

//////////////////////////////FOLDER SYSTEM///////////////////////////////////
const setting = JSON.parse(fs.readFileSync('./settings/setting.json'))
///////////////////////////////////////////////////////////////////////////////
let {
    ownerNumber,
    prefix,
} = setting

//////////////////////////////////////////////////////////////////////////////
function verifyBlackList(author){
    let listaBlack = fs.readFileSync('blacklist.json');
    let listBlack = JSON.parse(listaBlack);
    for(let i = 0; i < listBlack.table.length; i++){
        if(author === listBlack.table[i].numero) return true
    }
    return false
}

function verifyWhiteList(author){
    let listaWhite = fs.readFileSync('whitelist.json');
    let listWhite = JSON.parse(listaWhite);
    for(let i = 0; i < listWhite.table.length; i++){
        if(author === listWhite.table[i].numero) return true
    }
    return false
}

//////////////////////////////////////////////////////////////////////////////
module.exports = HandleMsg = async (bot, message) => {
    let ext;
    try {
        const {
            type,
            id,
            from,
            t,
            sender,
            isGroupMsg,
            chat,
            chatId,
            caption,
            isMedia,
            mimetype,
            quotedMsg,
            author,
            quotedMsgObj,
            mentionedJidList
        } = message
        let {body} = message
        var {items, name, formattedTitle} = chat
        let {text} = message
        let {pushname, verifiedName, formattedName} = sender
        pushname = pushname || verifiedName || formattedName // verifiedName is the name of someone who uses a business account
        const botNumber = await bot.getHostNumber() + '@c.us'
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await bot.getGroupAdmins(groupId) : ''
        const groupMembers = isGroupMsg ? await bot.getGroupMembersId(groupId) : ''
        const isOwner = sender.id === ownerNumber.includes
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
        const pengirim = sender.id
        const serial = sender.id
        const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')
        const timee = moment(t * 1000).format('HH:mm:ss')
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const {ind} = require('./message/text/lang/')
        global.pollfile = 'poll_Config_' + chat.id + '.json'
        global.voterslistfile = 'poll_voters_Config_' + chat.id + '.json'
        // Bot Prefix
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const commandd = caption || body || ''
        const arg = body.substring(body.indexOf(' ') + 1)
        const validMessage = caption ? caption : body;
        const args = body.trim().split(/ +/).slice(1)
        const isCmd = body.startsWith(prefix)
        const arghh = commandd.split(' ')
        const uaOverride = process.env.UserAgent
        const q = args.join(' ')
        const ar = body.trim().split(/ +/).slice(1)
        const url = args.length !== 0 ? args[0] : ''
        const errorurl2 = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        const isImage = type === 'image'
        const reason = q ? q : 'Nothing.'
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedFile = quotedMsg && quotedMsg.type === 'file'
        const isQuotedAudio = quotedMsg && quotedMsg.type === 'audio'
        const isQuotedPpt = quotedMsg && quotedMsg.type === 'ppt'
        const isQuotedGif = quotedMsg && quotedMsg.type === 'gif'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'


        // [IDENTIFY]
        const isOwnerBot = ownerNumber.includes(pengirim)
        const isInviteLink = await bot.inviteInfo(body)

        // Log
        if (isCmd && !isGroupMsg ) console.log(color('[CMD]'), color(time, 'blue'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && isGroupMsg ) console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))



////////////////////////////////REPLY WITH AUDIO///////////////////////////////////////
        if (chats === 'estou triste' || chats === 'Estou triste' || chats === 'to triste' || chats === 'To triste' || chats === 'triste' || chats === 'Triste') {
            await bot.sendPtt(from, './media/audio/triste.mp3', id)
        }
        if (chats === 'Boa noite' || chats === 'boa noite' || chats === 'Boa noite grupo' || chats === 'boa noite grupo' || chats === 'Boa noite bot' || chats === 'boa noite bot') {
            await bot.sendAudio(from, './media/audio/boanoite.mp3', id)
        }
        if (chats === 'Sheesh' || chats === 'sheesh') {
            await bot.sendAudio(from, './media/audio/sheesh.mp3', id)
        }
        if (chats === 'Bom dia' || chats === 'bom dia' || chats === 'Bom dia grupo' || chats === 'bom dia grupo' || chats === 'Bom dia bot' || chats === 'bom dia bot') {
            await bot.sendAudio(from, './media/audio/bomdia.mp3', id)
        }
        if (chats === 'oh yeah' || chats === 'Oh Yeah' || chats === 'Oh yeah') {
            await bot.sendAudio(from, './media/audio/ohyeah.mp3', id)
        }
        if (chats === 'lero' || chats === 'Lero' || chats === 'LERO') {
            await bot.sendAudio(from, './media/audio/lero.mp3', id)
        }
        if (chats === 'risos') {
            await bot.sendAudio(from, './media/audio/carolaudio2.ogg', id)
        }
        if (chats === 'patriciaaa' || chats === 'PATRICIAAA') {
            await bot.sendAudio(from, './media/audio/paty.mp3', id)
        }
//////////////////////////////////////FUTEBOL///////////////////////////////////////
        function serieA(){
            const url = 'https://www.otempo.com.br/superfc/serie-a';
            axios(url).then(async response => {
                const html = response.data;
                const $ = cheerio.load(html);
                let tabelaJson = '';
                const tabelaSerieA = $('.cell.linha-time.ng-scope.selected');
                let posicao = 0
                tabelaSerieA.each(function () {
                    posicao++
                    const nome = $(this).find('.nome.ng-binding').text();
                    const pontos = $(this).find('.someClass.ng-binding').first().text()
                    tabelaJson += posicao + '  ' + nome + '  ' + pontos + '\n'
                });
                await bot.sendText(from, '══✪〘 BRASILEIRÃO SERIE A 〙✪══' + '\n' + tabelaJson)
            }).catch(console.error);
        }
        function serieB() {
            const url = 'https://www.otempo.com.br/superfc/serie-b';
            axios(url).then(async response => {
                const html = response.data;
                const $ = cheerio.load(html);
                let tabelaJson = '';
                const tabelaSerieA = $('.cell.linha-time.ng-scope.selected');
                let posicao = 0
                tabelaSerieA.each(function () {
                    posicao++
                    const nome = $(this).find('.nome.ng-binding').text();
                    const pontos = $(this).find('.someClass.ng-binding').first().text()
                    tabelaJson += posicao + '  ' + nome + '  ' + pontos + '\n'
                });
                await bot.sendText(from, '══✪〘 BRASILEIRÃO SERIE B 〙✪══' + '\n' + tabelaJson)
            }).catch(console.error);
        }

        function jogosSerieA(){
            const url = 'https://www.placardefutebol.com.br/brasileirao-serie-a';
            axios(url).then(async response => {
                const html = response.data;
                const $ = cheerio.load(html);
                const colunas = $('.row.align-items-center.content');
                let jogos = '';
                colunas.each(function () {
                    let status = $(this).find('.badge.badge-danger.status-name').text();
                    if (status.length === 0) status = $(this).find('.badge.badge-info.status-name').text();
                    if (status.length === 0) status = $(this).find('.badge.badge-success.status-name').text();
                    let timeHome = $(this).find('.text-right.team_link').text();
                    let placarHome = $(this).find('.badge.badge-default').eq(0).text();
                    let placarVisitante = $(this).find('.badge.badge-default').eq(1).text();
                    let timeVisitante = $(this).find('.text-left.team_link').text();
                    jogos += status + '  ' + timeHome + '  ' + placarHome + ' X ' + placarVisitante + ' ' + timeVisitante + '\n';
                });
                await bot.sendText(from, '══✪〘 BRASILEIRÃO SERIE A 〙✪══' + '\n' + jogos)
            }).catch(console.error);
        }
        function jogosSerieB(){
            const url = 'https://www.placardefutebol.com.br/brasileirao-serie-b';
            axios(url).then(async response => {
                const html = response.data;
                const $ = cheerio.load(html);
                const colunas = $('.row.align-items-center.content');
                let jogos = '';
                colunas.each(function () {
                    let status = $(this).find('.badge.badge-danger.status-name').text();
                    if (status.length === 0) status = $(this).find('.badge.badge-info.status-name').text();
                    if (status.length === 0) status = $(this).find('.badge.badge-success.status-name').text();
                    let timeHome = $(this).find('.text-right.team_link').text();
                    let placarHome = $(this).find('.badge.badge-default').eq(0).text();
                    let placarVisitante = $(this).find('.badge.badge-default').eq(1).text();
                    let timeVisitante = $(this).find('.text-left.team_link').text();
                    jogos += status + '  ' + timeHome + '  ' + placarHome + ' X ' + placarVisitante + ' ' + timeVisitante + '\n';
                });
                await bot.sendText(from, '══✪〘 BRASILEIRÃO SERIE B 〙✪══' + '\n' + jogos)
            }).catch(console.error);
        }
///////////////////////////////////////////////////////////BASS////////////////////////////////////
        function stream2Buffer(cb = noop) {
            return new Promise(resolve => {
                let write = new Writable()
                write.data = []
                write.write = function (chunk) {
                    this.data.push(chunk)
                }
                write.on('finish', function () {
                    resolve(Buffer.concat(this.data))
                })

                cb(write)
            })
        }

        /**
         * Convert Buffer to Readable Stream
         * @param {Buffer} buffer
         * @returns {ReadableStream}
         */
        function buffer2Stream(buffer) {
            return new Readable({
                read() {
                    this.push(buffer)
                    this.push(null)
                }
            })
        }

//////////////
        if (!isGroupMsg && isMedia && isImage && !isCmd) {
            const mediaData = await decryptMedia(message, uaOverride)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await bot.sendImageAsSticker(from, imageBase64)
                .then(async () => {
                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                })
                .catch(async (err) => {
                    console.error(err)
                    await bot.reply(from, `Error!\n${err}`, id)
                })
        }

        function baseURI(buffer = Buffer.from([]), metatype = 'text/plain') {
            return `data:${metatype};base64,${buffer.toString('base64')}`
        }

        function adulto(senha, user) {
            if (user === '553298033583') {
                return true
            } else if (senha === 'delbercalvo') {
                return true
            } else if (senha === 'matuapinto') {
                return true
            } else {
                return false
            }
        }
        async function passVerify(q) {
            if (adulto(q) === false) {
                await bot.sendText(from, "Senha errada ou você não digno !")
            }
        }

        function addBlackList(numero){
            let obj = {
                table: []
            };
            fs.exists('blacklist.json', function(exists) {

                if (exists) {
                    console.log("yes file exists");
                    fs.readFile('blacklist.json', function readFileCallback(err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            obj = JSON.parse(data);
                                obj.table.push({
                                    numero
                                });
                            let json = JSON.stringify(obj);
                            fs.writeFile('blacklist.json', json);
                        }
                    });
                } else {
                    console.log("file not exists");
                        obj.table.push({
                            numero
                        });
                    let json = JSON.stringify(obj);
                    fs.writeFile('blacklist.json', json);
                }
            });
        }

        function casinoPoint(numero){
            let obj = {
                table: []
            };
            fs.exists('casinopoints.json', function(exists) {

                if (exists) {
                    console.log("yes file exists");
                    fs.readFile('casinopoints.json', function readFileCallback(err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            obj = JSON.parse(data);
                            obj.table.push({
                                numero
                            });
                            let json = JSON.stringify(obj);
                            fs.writeFile('casinopoints.json', json);
                        }
                    });
                } else {
                    console.log("file not exists");
                    obj.table.push({
                        numero
                    });
                    let json = JSON.stringify(obj);
                    fs.writeFile('casinopoints.json', json);
                }
            });
        }
        function manutencao(param) {
            if(param === true){
                if (verifyWhiteList(author) === false && command) return bot.reply(from, "Bot está em manutenção rotineira ! Aguarde ...", id)
            } else return false
        }

///////////////////////////////////////////////////COMANDOS////////////////////////////////////////////////////
            if(manutencao(false))  {
            }else if(verifyBlackList(author) === true && command){
            }else{
                switch (command) {

                    case 'speed':
                    case 'ping':
                        await bot.sendText(from, `Ping!\nVelocidade: ${processTime(t, moment())} _Segundos_`)
                        await bot.sendText(from, `Net da xuxa`)

                        break

                    // case 'returncode':
                    //     const obj = fs.readFileSync ('DataPath/DCCBOT.data.json', 'utf8');
                    //     await bot.sendText(from, JSON.stringify(obj))
                    //     await bot.sendFile(from, 'DataPath')
                    //     break

                    case 'ajuda':
                    case 'help':
                    case 'start':
                    case 'menu':
                    case 'comandos':
                        await bot.sendText(from, menuId.comandos(pushname))
                        break

                    case 'meme':
                        if ((isMedia || isQuotedImage) && args.length !== 0) {
                            const cima = arg.split('/')[0]
                            let bottom = arg.split('/')[1]
                            if (bottom == null) bottom = " "
                            const encryptMedia = isQuotedImage ? quotedMsg : message
                            const datameme = await decryptMedia(encryptMedia, uaOverride)
                            const fotomeme = await uploadImages(datameme, `fotomeme.${sender.id}`)
                            await bot.sendFileFromUrl(from, `https://api.memegen.link/images/custom/${cima}/${bottom}.png?background=${fotomeme}`, 'image/png', '', `Ta na mão patrão !`, id)
                        } else {
                            await bot.reply(from, `Então para criar um meme você envia ou responde uma foto com o comando junto de um texto que vai ficar na parte superior e um texto na parte inferior separado por /\nExemplo: !meme texto cima / texto baixo`, id)
                        }
                        break

                    case 'memes':
                        const memesurl = await axios.get('https://meme-api.herokuapp.com/gimme/' + 'DiretoDoZapZap')
                        const memesdata = memesurl.data
                        try {
                            await bot.sendImage(from, memesdata.url, '', memesdata.title, id)

                        } catch (err) {
                            console.log(err)
                            await bot.reply(from, 'Hmm deu merda', id)
                        }
                        break

                    case 'busaojf':
                        if (!q) return bot.reply(from, `Coloque o numero da linha para pesquisar`, id)
                        await (async () => {
                            const browser = await puppeteer.launch ({args: ['--no-sandbox', '--disable-setuid-sandbox']});
                            const page = await browser.newPage ();
                            await page.setViewport({
                                width: 800,
                                height: 1800,
                                deviceScaleFactor: 1
                            });
                            await page.goto ('http://www.astransp.com.br/buscaLinhas.aspx');
                            let input = await page.waitForSelector('input[type="text"]');
                            await input.type(q);
                            await page.click('input[type="image"]');
                            await page.waitForTimeout(4000)
                            await page.screenshot ({path: 'busaoPrint.png',  clip: {
                                    x: 0,
                                    y: 450,
                                    width: 700,
                                    height: 1800
                                }});
                            await browser.close ();

                            await bot.sendImage(from, 'busaoPrint.png', 'busaoPrint', 'Horario do Busão ' +q)

                        }) ();

                        break


                    case 'print':
                        if (!q) return await bot.reply(from, `Coloque um site para eu tirar um print`, id)
                        try {
                            await bot.sendImage(from, `https://api.apiflash.com/v1/urltoimage?access_key=aa354f7fb72c4bcbad48678dabe0fef5&url=${q}`, '', `${q}`, id)

                        } catch (err) {
                            console.log(err)
                            await bot.reply(from, 'Verifique se o link está no formato correto \nExemplo: https://www.google.com', id)
                        }
                        break


                    case 'toimg':
                        if (quotedMsg && quotedMsg.type === 'sticker') {
                            const mediaData = await decryptMedia(quotedMsg)
                            const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                            await bot.sendFile(from, imageBase64, 'imgsticker.jpg', 'Ta na mão patrão', id)
                                .then(() => {
                                    console.log(`Sticker to Image Processed for ${processTime(t, moment())} Seconds`)
                                })
                        } else if (!quotedMsg) return bot.reply(from, `Formato incorreto, marque o adesivo que deseja usar como imagem!`, id)
                        break

                    case 'sticker':
                        if (isMedia && isImage || isQuotedImage) {
                            try {
                                await bot.reply(from, "Calma ai parceiro que to rodando numa calculadora", id)
                                const encryptMedia = isQuotedImage ? quotedMsg : message
                                const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                                const author = 'Bot DCC'
                                const pack = 'Bot DCC pack'
                                const mediaData = await decryptMedia(encryptMedia, uaOverride)
                                const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                                await bot.sendImageAsSticker(from, imageBase64, {author: `${author}`, pack: `${pack}`, keepScale: true})
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                            } catch (err) {
                                console.error(err)
                                await bot.reply(from, 'Error!', id)
                            }
                        }else if (args.length === 1) {
                            if (!isUrl(url)) {
                                await bot.reply(from, 'Desculpe, o link que você enviou é inválido.', id)
                            }
                            bot.sendStickerfromUrl(from, url).then((r) => (!r && r !== undefined)
                                ? bot.sendText(from, 'Desculpe, o link que você enviou não contém uma imagem.')
                                : bot.reply(from, 'Here\'s your sticker')).then(() => console.log(`Sticker Processed for ${processTime(t, moment())} Second`))
                        }
                        if (isMedia && type === 'video' || mimetype === 'image/gif') {
                            await bot.reply(from, "Calma ai parceiro que to rodando numa calculadora", id)
                            try {
                                const mediaData = await decryptMedia(message, uaOverride)
                                const author = 'Bot DCC'
                                const pack = 'Bot DCC pack'
                                await bot.sendMp4AsSticker(from, mediaData, {
                                    fps: 24,
                                    startTime: `00:00:00.0`,
                                    endTime: `00:00:05.0`,
                                    loop: 0
                                },{author: `${author}`, pack: `${pack}`, keepScale: true})
                                    .then(async () => {
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        await bot.sendText(from, ind.ok())
                                    })
                            } catch (err) {
                                console.error(err)
                                await bot.reply(from, ind.videoLimit(), id)
                            }
                        } else if (isQuotedGif || isQuotedVideo) {
                            await bot.reply(from, "Calma ai parceiro que to rodando numa calculadora", id)
                            try {
                                const mediaData = await decryptMedia(quotedMsg, uaOverride)
                                const author = 'Bot DCC'
                                const pack = 'Bot DCC pack'
                                await bot.sendMp4AsSticker(from, mediaData, {
                                    fps: 24,
                                    startTime: `00:00:00.0`,
                                    endTime: `00:00:05.0`,
                                    loop: 0
                                },{author: `${author}`, pack: `${pack}`, keepScale: true})
                                    .then(async () => {
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        await bot.sendText(from, ind.ok())
                                    })
                            } catch (err) {
                                console.error(err)
                                await bot.reply(from, ind.videoLimit(), id)
                            }
                        }
                        break


                    case 'phub':

                        if (args.length === 0) return bot.reply(from, `Escreva ai o que você quer o que o veio diga`, id)
                        await bot.reply(from, "Calma ai parceiro que to rodando numa calculadora", id)
                        await getPhub();
                    async function getPhub() {
                        const userPic = await bot.getProfilePicFromServer(author);
                        const canvas = Canvas.createCanvas(1125, 802);
                        const msg = canvas.getContext(`2d`);
                        const background = await Canvas.loadImage(`./media/images/phub.png`);
                        const noUser = await Canvas.loadImage(`./media/images/noUser.jpg`);
                        const user = await Canvas.loadImage(userPic);
                        msg.drawImage(background, 0, 0, 1125, 802);

                        if (userPic === undefined) {
                            msg.drawImage(noUser, 0, 0, 500, 500);
                        }
                        msg.drawImage(user, 25, 380, 110, 110);

                        msg.font = '60px "Arial black"'
                        msg.fillStyle = "orange";
                        msg.fillText(`${pushname}`, 160, 460, 700)

                        msg.font = '50px "Arial black"'
                        msg.fillStyle = "white";
                        msg.fillText(q, 50, 550, 700)

                        const buffer = canvas.toDataURL()
                        await bot.sendImage(from, buffer, 'final.png','' ,id)
                    }
                        break


                    case 'trumptweet':
                        if (args.length === 0) return bot.reply(from, `Escreva ai o que você quer o que o Trump diga`, id)
                        await bot.reply (from, "Calma ai parceiro que to rodando numa calculadora", id)
                        const tump = body.slice(12)
                        const trumj = await axios.get(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${tump}`)
                        const tumh = trumj.data
                        if (tumh.message.endsWith('.png')) {
                            ext = '.png';
                        } else {
                            ext = '.jpg';
                        }
                        await bot.sendFileFromUrl(from, tumh.message, `Nekonime${ext}`, '', id)
                        break

                    case 'veio':
                        if (args.length === 0) return bot.reply(from, `Escreva ai o que você quer o que o veio diga`, id)
                        await bot.reply(from, "Calma ai parceiro que to rodando numa calculadora", id)
                        await getVeio();
                    async function getVeio() {
                        const canvas = Canvas.createCanvas(540, 547);
                        const ctx = canvas.getContext(`2d`);
                        const background = await Canvas.loadImage(`./media/images/text.jpeg`);
                        ctx.drawImage(background, 0, 0, 540, 547);
                        ctx.font = '30px "Arial black"'
                        ctx.fillText(q, 170, 370, 200)
                        const buffer = canvas.toDataURL()
                        await bot.sendImage(from, buffer, 'final.png','' ,id)
                    }
                        break

                    case 'bolsotweet':
                        if (args.length === 0) return bot.reply(from, `Escreva ai o que você quer o que o Mito diga`, id)
                        await bot.reply(from, "Calma ai parceiro que to rodando numa calculadora", id)
                        await getBolso();
                    async function getBolso() {
                        const canvas = Canvas.createCanvas(846, 486);
                        const ctx = canvas.getContext(`2d`);
                        const background = await Canvas.loadImage(`./media/images/tw.png`);
                        ctx.drawImage(background, 0, 0, 846, 486);
                        ctx.font = '30px "Arial black"'
                        ctx.fillText(q, 50, 150, 700)
                        const buffer = canvas.toDataURL()
                        await bot.sendImage(from, buffer, 'final.png','' ,id)
                    }
                        break


                    case 'lixo':
                        await bot.sendFileFromUrl(from, await imgNeko(mentionedJidList, bot, mentionedJidList[0], sender, id, 'trash', from, isMedia, type, isQuotedImage, quotedMsg, message, uaOverride, author), `Nekonime${ext}`, '', id);
                        break

                    case 'baguette':
                        await bot.sendFileFromUrl(from, await imgNeko(mentionedJidList, bot, mentionedJidList[0], sender, id, 'baguette', from, isMedia, type, isQuotedImage, quotedMsg, message, uaOverride, author), `Nekonime${ext}`, '', id);
                        break

                    case 'lolice':
                            await bot.sendFileFromUrl(from, await imgNeko(mentionedJidList, bot, mentionedJidList[0], sender, id, 'lolice', from, isMedia, type, isQuotedImage, quotedMsg, message, uaOverride, author), `Nekonime${ext}`, '', id);
                        break

                    case 'bug':
                        await bot.sendFileFromUrl(from, await imgNeko(mentionedJidList, bot, mentionedJidList[0], sender, id, 'stickbug', from, isMedia, type, isQuotedImage, quotedMsg, message, uaOverride, author), `Nekonime${ext}`, '', id);
                        break

                    case 'bolsotv':
                        if (mentionedJidList.length !== 0) {
                            const userPic = await bot.getProfilePicFromServer(mentionedJidList[0])
                            const dataPpPh = await bent('buffer')(userPic)
                            const fotolix = await uploadImages(dataPpPh, `fotogta.${sender.id}`)
                            await bot.reply(from, "Calma ai parceiro que to rodando numa calculadora", id)
                            getImageBTV();
                            async function getImageBTV() {
                                const canvas = Canvas.createCanvas(1068, 528);
                                const ctx = canvas.getContext(`2d`);
                                let image1 = await Canvas.loadImage(fotolix);
                                const background = await Canvas.loadImage(`./media/images/fundo.png`);
                                ctx.drawImage(image1, 400, -20, 500, 300);
                                ctx.drawImage(background, 0, 0, 1068, 528);
                                const buffer = canvas.toDataURL()
                                await bot.sendImage(from, buffer, 'final.png','' ,id)
                            }

                        } else if (isMedia && type === 'image' || isQuotedImage) {
                            const encryptMediaa = isQuotedImage ? quotedMsg : message
                            const datapotogay = await decryptMedia(encryptMediaa, uaOverride)
                            const fotolix = await uploadImages(datapotogay, `fotogay.${sender.id}`)
                            getImageBTV();
                            async function getImageBTV() {
                                const canvas = Canvas.createCanvas(1068, 528);
                                const ctx = canvas.getContext(`2d`);
                                let image1 = await Canvas.loadImage(fotolix);
                                const background = await Canvas.loadImage(`./media/images/fundo.png`);
                                ctx.drawImage(image1, 400, -20, 500, 300);
                                ctx.drawImage(background, 0, 0, 1068, 528);
                                const buffer = canvas.toDataURL()
                                await bot.sendImage(from, buffer, 'final.png','' ,id)
                            }
                        }
                        else {
                            const userPica = await bot.getProfilePicFromServer(author)
                            const dataPpPh = await bent('buffer')(userPica)
                            const fotolix = await uploadImages(dataPpPh, `fotowallpic.${sender.id}`)
                            getImageBTV();
                            async function getImageBTV() {
                                const canvas = Canvas.createCanvas(1068, 528);
                                const ctx = canvas.getContext(`2d`);
                                let image1 = await Canvas.loadImage(fotolix);
                                const background = await Canvas.loadImage(`./media/images/fundo.png`);
                                ctx.drawImage(image1, 400, -20, 500, 300);
                                ctx.drawImage(background, 0, 0, 1068, 528);
                                const buffer = canvas.toDataURL()
                                await bot.sendImage(from, buffer, 'final.png','' ,id)
                            }
                        }
                        break

                    case 'edinaldo':
                        if (mentionedJidList.length !== 0) {
                            const userPic = await bot.getProfilePicFromServer(mentionedJidList[0])
                            const dataPpPh = await bent('buffer')(userPic)
                            const fotolix = await uploadImages(dataPpPh, `fotogta.${sender.id}`)
                            await bot.reply(from, "Calma ai parceiro que to rodando numa calculadora", id)
                            getImageED();
                            async function getImageED() {
                                const canvas = Canvas.createCanvas(540, 547);
                                const ctx = canvas.getContext(`2d`);
                                let image1 = await Canvas.loadImage(fotolix);
                                const background = await Canvas.loadImage(`./media/images/edinaldo.png`);
                                ctx.drawImage(image1, 0, 180, 500, 400);
                                ctx.drawImage(background, 0, 0, 540, 547);
                                const buffer = canvas.toDataURL()
                                await bot.sendImage(from, buffer, 'final.png','' ,id)
                            }

                        } else if (isMedia && type === 'image' || isQuotedImage) {
                            const encryptMediaa = isQuotedImage ? quotedMsg : message
                            const datapotogay = await decryptMedia(encryptMediaa, uaOverride)
                            const fotolix = await uploadImages(datapotogay, `fotogay.${sender.id}`)
                            getImageED();
                            async function getImageED() {
                                const canvas = Canvas.createCanvas(540, 547);
                                const ctx = canvas.getContext(`2d`);
                                let image1 = await Canvas.loadImage(fotolix);
                                const background = await Canvas.loadImage(`./media/images/edinaldo.png`);
                                ctx.drawImage(image1, 0, 180, 500, 400);
                                ctx.drawImage(background, 0, 0, 540, 547);
                                const buffer = canvas.toDataURL()
                                await bot.sendImage(from, buffer, 'final.png','' ,id)
                            }
                        }
                        else {
                            const userPica = await bot.getProfilePicFromServer(author)
                            const dataPpPh = await bent('buffer')(userPica)
                            const fotolix = await uploadImages(dataPpPh, `fotowallpic.${sender.id}`)
                            getImageED();
                            async function getImageED() {
                                const canvas = Canvas.createCanvas(540, 547);
                                const ctx = canvas.getContext(`2d`);
                                let image1 = await Canvas.loadImage(fotolix);
                                const background = await Canvas.loadImage(`./media/images/edinaldo.png`);
                                ctx.drawImage(image1, 0, 180, 500, 400);
                                ctx.drawImage(background, 0, 0, 540, 547);
                                const buffer = canvas.toDataURL()
                                await bot.sendImage(from, buffer, 'final.png','' ,id)
                            }
                        }
                        break

                    case 'github':
                        if (args.length === 0) return bot.reply(from, `Use o comando ${prefix}github com o [username]`, id)
                        await fetch('http://api.github.com/users/'+ q).then((result) => result.json()).then(
                            (data) =>{
                                bot.sendFileFromUrl(from, data.avatar_url, 'git.png', 'Nome de usuario: ' + data.login + '\n' +
                                    'Nome de perfil: '+ data.name +'\n'+'Localização: '+data.location + '\n'+ 'Email: '+data.email +'\n'+
                                    'Bio: '+data.bio + '\n' + 'Repositorios Publicos: ' +data.public_repos + '\n' + 'Seguidores: '+data.followers + '\n' +
                                    'Seguindo: '+ data.following + '\n' + 'Conta criada em: '+ data.created_at + '\n' + 'Link :' + data.html_url, id)
                            }
                        )

                        break

                    case 'insta':
                        if (args.length === 0) return bot.reply(from, `Use o comando ${prefix}insta com o [username]`, id)
                        await instagram.authenticate('anttoniii2022', 'botdcc123');
                        instagram.getUserData(q).then(userData => {
                            bot.sendFileFromUrl(from, userData.getHdProfilePicture(), 'insta.png', `*Nome do Perfil:* ${userData.getFullName()}\n*Bio:* ${userData.getBiography()}\n*Seguidores:* ${userData.getFollowersCount()}\n*Seguindo:* ${userData.getFollowingCount()}\n*Quantidades de Publicações:* ${userData.getPublicationsCount()}\n*Perfil Privado:* ${userData.isPrivate() === true ? "Sim" : "Não"}\n*Perfil Verificado:* ${userData.isVerified() === true ? "Sim" : "Não"}`, id);
                        }).catch(err =>{
                            console.log(err)
                        })
                        break

                    case 'cep':
                        if (args.length === 0) return bot.reply(from, `Use o ${prefix}cep [numero do cep]`, id)
                        const cepend = await cep(args[0])
                        await bot.sendText(from, cepend)
                        break

                    case 'cpf':
                        await bot.sendText(from, cpf())
                        break

                    case 'cartão':
                        await bot.sendText(from, cartao())
                        break

                    case "ppt":
                        if (args.length === 0) return bot.reply(from, `Use o ${prefix}ppt [E jogue pedra, papel ou tesoura]`, id)
                        const botescolha = Math.floor(Math.random() * 3) + 1
                        if (`${botescolha}` === '1') {
                            await bot.reply(from, 'Bem eu escolho Pedra ✊', id)
                            if (`${q}` === `pedra`) return bot.sendText(from, `Nos dois escolhemos Pedra, então deu empate né 🤔`)
                            else if (`${q}` === `papel`) return bot.sendText(from, `Puts que merda tu ganhou 😢`)
                            else if (`${q}` === `tesoura`) return bot.sendText(from, `Toma trouxa ganhei ksks 🤣`)
                            break
                        } else if (`${botescolha}` === '2') {
                            await bot.reply(from, 'Bem eu escolho Papel 🖐', id)
                            if (`${q}` === `pedra`) return bot.sendText(from, `Toma trouxa ganhei ksks 🤣`)
                            else if (`${q}` === `papel`) return bot.sendText(from, `Nos dois escolhemos Papel, então deu empate né 🤔`)
                            else if (`${q}` === `tesoura`) return bot.sendText(from, `Puts que merda tu cortou meu papel 😢`)
                            break
                        } else if (`${botescolha}` === '3') {
                            await bot.reply(from, 'Bem eu escolho Tesoura ✂', id)
                            if (`${q}` === `pedra`) return bot.sendText(from, `Puts que merda tu ganhou 😢`)
                            else if (`${q}` === `papel`) return bot.sendText(from, `Toma trouxa te cortei ksks 🤣`)
                            else if (`${q}` === `tesoura`) return bot.sendText(from, `Nos dois escolhemos Tesoura, então deu empate né 🤔`)
                        }
                        break

                    case 'del':
                        if (author === '553298033583') {
                            if (!quotedMsg) return bot.reply(from, `Só responder com o comando del, que eu apago`, id)
                            if (!quotedMsgObj.fromMe) return bot.reply(from, `Só posso apagar minhas proprias mensagens !`, id)
                            await bot.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                        } else {
                            if (!isGroupAdmins) return bot.reply(from, 'Somente os adm podem me calar', id)
                            if (!quotedMsg) return bot.reply(from, `Só responder com o comando del, que eu apago`, id)
                            if (!quotedMsgObj.fromMe) return bot.reply(from, `Só posso apagar minhas proprias mensagens !`, id)
                            await bot.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                        }
                        break

                    case 'crush':
                        if (!isGroupMsg) return bot.reply(from, 'este comando só pode ser usado dentro do grupo', id)
                        const mem = groupMembers
                        const aku = mem[Math.floor(Math.random() * mem.length)];
                        const kamu = mem[Math.floor(Math.random() * mem.length)];

                        const sapa = `Casal de hoje... @${aku.replace(/[@c.us]/g, '')} (💘) @${kamu.replace(/[@c.us]/g, '')} O amor é lindo\nMuito apaixonados`
                        await bot.sendTextWithMentions(from, sapa)

                        const akupic = await bot.getProfilePicFromServer(aku)
                        const akupicPh = await bent('buffer')(akupic)
                        const akuft = await uploadImages(akupicPh, `fotogta.${sender.id}`)

                        const kamupic = await bot.getProfilePicFromServer(kamu)
                        const kamupicPh = await bent('buffer')(kamupic)
                        const kamuft = await uploadImages(kamupicPh, `fotogta.${sender.id}`)

                        await bot.sendFileFromUrl(from, `https://nekobot.xyz/api/imagegen?type=ship&user1=${akuft}&user2=${kamuft}&raw=1`, 'crush.jgp', '', id)

                        break

                    case 'getpic':
                        if (mentionedJidList.length !== 0) {
                            await bot.getProfilePicFromServer(mentionedJidList[0]).then(async (r) => {
                                if (r === 'ERROR: 404') {
                                    await bot.reply(from, 'Usuario sem foto publica para o BOT', id)
                                } else {
                                    await bot.sendFileFromUrl(from, r, 'pic.jpg', '', id)
                                }
                            })
                        } else if (args.length === 0) {
                            await bot.getProfilePicFromServer(author).then(async (r) => {
                                if (r === 'ERROR: 404') {
                                    await bot.reply(from, 'Sem foto de perfil publica para o BOT', id)
                                }else {
                                    await bot.sendFileFromUrl(from, r, 'pic.jpg', '', id)
                                }
                            })
                        }
                        break

                    case 'dado':
                        const dice = Math.floor(Math.random() * 6) + 1
                        await bot.sendStickerfromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png', {method: 'get'})
                        break

                    case 'carta':
                        const carta = Math.floor(Math.random() * 53) + 1
                        await bot.sendStickerfromUrl(from, 'https://www.random.org/playing-cards/' + carta + '.png', {method: 'get'},{keepScale: true})
                        break

                    case 'bot':
                        if (args.length === 0) return bot.reply(from, `Use o ${prefix}bot e pergunte alguma merda para mim !`, id)
                        const respostas = ['Hmm talvez hein', 'Com certeza', 'Pode crê', 'Acho que sim hein', 'Espero que sim', 'Sim', 'Pelos meus calculos, sim', 'Você sabe que sim né', 'Óbvio né',
                            'Olha acho dificil hein', 'Acredito que não', 'Claro que não', 'Óbivio que não', 'Provalmente não', 'Mas nem fudendo', 'Nops', 'Jamais', 'Claro ué', 'Yep', 'Calma ae deixa eu ver aki.... não', 'Talvez', 'Duvido nada hein'];
                        const random = respostas[Math.floor(Math.random() * respostas.length)];
                        await bot.sendText(from, random)

                        break

                    case 'moeda':
                        const side = Math.floor(Math.random() * 2) + 1
                        if (side === 1) {
                            await bot.sendImageAsSticker(from, './media/images/cara.png', {method: 'get'})
                        } else {
                            await bot.sendImageAsSticker(from, './media/images/coroa.png', {method: 'get'})
                        }
                        break

                    case 'tapa':
                        if (mentionedJidList.length === 0) {
                            await bot.sendVideoAsGif(from, 'https://i.giphy.com/media/S4fcVxKS2jMoOOnvy9/giphy480p.mp4', '', 'Marque alguem para ser estapeado !')
                        } else {
                            await bot.sendVideoAsGif(from, 'https://i.giphy.com/media/S4fcVxKS2jMoOOnvy9/giphy480p.mp4', '',`${mentionedJidList.map(x => `@${author.replace('@c.us', '')}`)} deu um tapa em ${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`)}` )
                        }
                        break;

                    case 'abraço':
                    case 'abraco':
                    case 'abraçar':
                        if (mentionedJidList.length === 0) {
                            await bot.sendGiphy(from, 'https://media.giphy.com/media/GMFUrC8E8aWoo/giphy.gif', 'Marque alguem para ser abraçado !')
                        } else {
                            await bot.sendGiphy(from, 'https://media.giphy.com/media/GMFUrC8E8aWoo/giphy.gif', `${mentionedJidList.map(x => `@${author.replace('@c.us', '')}`)} abraçou ${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`)}`)
                        }
                        break;

                    case 'tiro':
                    case 'atirar':
                        if (mentionedJidList.length === 0) {
                            await bot.sendGiphy(from, 'https://media.giphy.com/media/V4uJfpqjwqp3i/giphy.gif', 'Marque alguem para tomar um tiro !')
                        } else {
                            await bot.sendGiphy(from, 'https://media.giphy.com/media/V4uJfpqjwqp3i/giphy.gif', `${mentionedJidList.map(x => `@${author.replace('@c.us', '')}`)} atirou em ${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`)}`)
                        }
                        break;

                    case 'beijo':
                    case 'beijar':
                        if (mentionedJidList.length === 0) {
                            await bot.sendGiphy(from, 'https://media.giphy.com/media/bGm9FuBCGg4SY/giphy.gif', 'Marque alguem para beijar !')
                        } else {
                            await bot.sendGiphy(from, 'https://media.giphy.com/media/bGm9FuBCGg4SY/giphy.gif', `${mentionedJidList.map(x => `@${author.replace('@c.us', '')}`)} deu uma beijoca em ${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`)}`)
                        }
                        break;

                    case 'suicidio':
                        if (mentionedJidList.length === 0) {
                            await bot.sendGiphy(from, 'https://media.giphy.com/media/WlOxKo6GQ17Pi/giphy.gif', `${pushname} se matou !`)
                        } else {
                            await bot.sendGiphy(from, 'https://media.giphy.com/media/WlOxKo6GQ17Pi/giphy.gif', `${mentionedJidList.map(x => `@${author.replace('@c.us', '')}`)} suicidou ${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`)}`)
                        }
                        break;

////////////////////////////////////////////////////////MENU ADMIN GRUP/////////////////////////////////////////
                    case 'add':
                        if (!isGroupMsg) return bot.reply(from, 'Esse comando só pode ser executado em grupos!', id)
                        if (!isGroupAdmins) return bot.reply(from, 'Você precisa ser Adm para executar estes comando', id)
                        if (!isBotGroupAdmins) return bot.reply(from, 'O bot precisa ser Adm para executar estes comando', id)
                        if (args.length !== 1) return bot.reply(from, `Para adc alguem ${prefix}add\nUse: ${prefix}add <nomor>\ncontato: ${prefix}add 5532xxx`, id)
                        try {
                            await bot.addParticipant(from, `${args[0]}@c.us`)
                                .then(() => bot.reply(from, 'Oi bem vindo', id))
                        } catch {
                            bot.reply(from, 'Não é possível adicionar ', id)
                        }
                        break

                    case 'ban':
                        if (!isGroupMsg) return bot.reply(from, 'Esse comando só pode ser executado em grupos!', id)
                        if (!isGroupAdmins) return bot.reply(from, 'Você precisa ser Adm para executar estes comando!', id)
                        if (!isBotGroupAdmins) return bot.reply(from, 'O bot precisa ser Adm para executar estes comando!', id)
                        if (mentionedJidList.length === 0) return bot.reply(from, 'Desculpe, o formato da mensagem está errado.\nMarque uma ou mais pessoas a serem excluídas', id)
                        if (mentionedJidList[0] === botNumber) return await bot.reply(from, 'Ta loucao fi\nSe tentar me da ban dnv vc que vai rodar vacilão', id)
                        await bot.sendTextWithMentions(from, `Pode dizer tchau:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                        for (let i = 0; i < mentionedJidList.length; i++) {
                            if (groupAdmins.includes(mentionedJidList[i])) return await bot.sendText(from, 'Falha, você não pode remover o administrador do grupo')
                            await bot.removeParticipant(groupId, mentionedJidList[i])
                        }
                        break

                    case 'promover':
                        if (!isGroupMsg) return bot.reply(from, 'Esse comando só pode ser executado em grupos!', id)
                        if (!isGroupAdmins) return bot.reply(from, 'Você precisa ser Adm para executar estes comando!', id)
                        if (!isBotGroupAdmins) return bot.reply(from, 'O bot precisa ser Adm para executar estes comando!', id)
                        if (mentionedJidList.length !== 1) return bot.reply(from, 'Desculpe, só pode promover 1 usuário', id)
                        if (groupAdmins.includes(mentionedJidList[0])) return await bot.reply(from, 'Desculpe, o usuário já é um administrador.', id)
                        if (mentionedJidList[0] === botNumber) return await bot.reply(from, 'Ta loucao fi\nNão é possível promover sua própria conta de bot', id)
                        await bot.promoteParticipant(groupId, mentionedJidList[0])
                        await bot.sendTextWithMentions(from, `Atenção membros comum chupem o novo adm @${mentionedJidList[0].replace('@c.us', '')}`)
                        break

                    case 'rebaixar':
                        if (!isGroupMsg) return bot.reply(from, 'Esse comando só pode ser executado em grupos!', id)
                        if (!isGroupAdmins) return bot.reply(from, 'Você precisa ser Adm para executar estes comando!', id)
                        if (!isBotGroupAdmins) return bot.reply(from, 'O bot precisa ser Adm para executar estes comando!', id)
                        if (mentionedJidList.length !== 1) return bot.reply(from, 'Desculpe, só pode rebaixar 1 usuário', id)
                        if (!groupAdmins.includes(mentionedJidList[0])) return await bot.reply(from, 'Usuario já um membro comum.', id)
                        if (mentionedJidList[0] === botNumber) return await bot.reply(from, 'Ta loucao fi.\nNão é possível rebaixar sua própria conta de bot', id)
                        await bot.demoteParticipant(groupId, mentionedJidList[0])
                        await bot.sendTextWithMentions(from, `Atenção adm's tem uma nova boquinha no grupo @${mentionedJidList[0].replace('@c.us', '')}.`)
                        break

                    case 'geral':
                        if (!isGroupMsg) return bot.reply(from, 'Esse comando só pode ser executado em grupos!', id)
                        if (!isGroupAdmins) return bot.reply(from, 'Você precisa ser Adm para executar estes comando!', id)
                        const groupMem = await bot.getGroupMembers(groupId)
                        let hehex = '╔══✪〘 Atenção cambada 〙✪══\n'
                        for (let i = 0; i < groupMem.length; i++) {
                            hehex += '╠➥'
                            hehex += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                        }
                        hehex += '╚═〘 *DCC BOT* 〙'
                        await bot.sendTextWithMentions(from, hehex)
                        break

                    case 'broadcast':
                        if (author !== '553298033583@c.us') return bot.reply(from, 'Somente o Dev pode fazer broadcast !', id)
                        const chatz = await bot.getAllGroups()
                        for (let ids of chatz) {
                            await bot.sendText(ids.id, `[DCC BOT AVISOS]\n\n${q}`)
                        }
                        break

//////////////////////////////////////////////MENU IMAGE/////////////////////////////////////////////////////////
                    case 'raibow':
                        if (isMedia && type === 'image' || isQuotedImage) {
                            const encryptMediaa = isQuotedImage ? quotedMsg : message
                            const datapotogay = await decryptMedia(encryptMediaa, uaOverride)
                            const fotogay = await uploadImages(datapotogay, `fotogay.${sender.id}`)
                            await bot.reply(from, "Calma ai parceiro que to rodando numa calculadora", id)
                            await bot.sendFileFromUrl(from, `https://some-random-api.ml/canvas/gay?avatar=${fotogay}`, 'gay.jpg', '', id)
                        } else {
                            await bot.reply(from, `Utilize o comando em alguma imagem`, id)
                        }
                        break

                    case 'fosco':
                        if (isMedia && type === 'image' || isQuotedImage) {
                            const encryptMediaa = isQuotedImage ? quotedMsg : message
                            const datapotogay = await decryptMedia(encryptMediaa, uaOverride)
                            const fotogay = await uploadImages(datapotogay, `fotogay.${sender.id}`)
                            await bot.reply(from, "Calma ai parceiro que to rodando numa calculadora", id)
                            await bot.sendFileFromUrl(from, `https://some-random-api.ml/canvas/glass?avatar=${fotogay}`, 'gay.jpg', '', id)
                        } else {
                            await bot.reply(from, `Utilize o comando em alguma imagem`, id)
                        }
                        break

                    case 'wasted':
                        if (isMedia && type === 'image' || isQuotedImage) {
                            const encryptMediaa = isQuotedImage ? quotedMsg : message
                            const datapotogay = await decryptMedia(encryptMediaa, uaOverride)
                            const fotogay = await uploadImages(datapotogay, `fotogay.${sender.id}`)
                            await bot.reply(from, "Calma ai parceiro que to rodando numa calculadora", id)
                            await bot.sendFileFromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotogay}`, 'gay.jpg', '', id)
                        } else {
                            await bot.reply(from, `Utilize o comando em alguma imagem`, id)
                        }
                        break

                    case 'missao':
                    case 'missão':
                        if (isMedia && type === 'image' || isQuotedImage) {
                            const encryptMediaa = isQuotedImage ? quotedMsg : message
                            const datapotogay = await decryptMedia(encryptMediaa, uaOverride)
                            const fotogay = await uploadImages(datapotogay, `fotogay.${sender.id}`)
                            await bot.reply(from, "Calma ai parceiro que to rodando numa calculadora", id)
                            await bot.sendFileFromUrl(from, `https://some-random-api.ml/canvas/passed?avatar=${fotogay}`, 'gay.jpg', '', id)
                        } else {
                            await bot.reply(from, `Utilize o comando em alguma imagem`, id)
                        }
                        break

                    case 'cadeia':
                        if (isMedia && type === 'image' || isQuotedImage) {
                            const encryptMediaa = isQuotedImage ? quotedMsg : message
                            const datapotogay = await decryptMedia(encryptMediaa, uaOverride)
                            const fotogay = await uploadImages(datapotogay, `fotogay.${sender.id}`)
                            await bot.reply(from, "Calma ai parceiro que to rodando numa calculadora", id)
                            await bot.sendFileFromUrl(from, `https://some-random-api.ml/canvas/jail?avatar=${fotogay}`, 'gay.jpg', '', id)
                        } else {
                            await bot.reply(from, `Utilize o comando em alguma imagem`, id)
                        }
                        break

                    case 'socialismo':
                        if (isMedia && type === 'image' || isQuotedImage) {
                            const encryptMediaa = isQuotedImage ? quotedMsg : message
                            const datapotogay = await decryptMedia(encryptMediaa, uaOverride)
                            const fotogay = await uploadImages(datapotogay, `fotogay.${sender.id}`)
                            await bot.reply(from, "Calma ai parceiro que to rodando numa calculadora", id)
                            await bot.sendFileFromUrl(from, `https://some-random-api.ml/canvas/comrade?avatar=${fotogay}`, 'gay.jpg', '', id)
                        } else {
                            await bot.reply(from, `Utilize o comando em alguma imagem`, id)
                        }
                        break

                    case 'triggered':
                        if (isMedia && type === 'image' || isQuotedImage) {
                            const encryptMediaa = isQuotedImage ? quotedMsg : message
                            const datapotogay = await decryptMedia(encryptMediaa, uaOverride)
                            const fotogay = await uploadImages(datapotogay, `fotogay.${sender.id}`)
                            await bot.reply(from, "Calma ai parceiro que to rodando numa calculadora", id)
                            await bot.sendFileFromUrl(from, `https://some-random-api.ml/canvas/triggered?avatar=${fotogay}`, 'gay.jpg', '', id)
                        } else {
                            await bot.reply(from, `Utilize o comando em alguma imagem`, id)
                        }
                        break

                    case 'imagem':
                        if (!q) return bot.reply(from, `Coloca o que você quer pesquisar zé`, id)
                        gis(q, logResults);

                    async function logResults(error, results) {
                        if (error) {
                            console.log(error);
                        } else {
                            await bot.sendFileFromUrl(from, results[Math.floor(Math.random() * 10)].url, "image.png", "", "", id)
                        }
                    }
                        break;

                    case 'play':
                        if (!q) return bot.reply(from, `Coloca o que você quer pesquisar zé`, id)
                        const Scraper = require('@yimura/scraper').default;
                        const youtube = new Scraper();
                        youtube.search(q).then(results => {
                            const ytstreamp3 = ytdl(results.videos[0].link, { filter: 'audioonly' })
                            const createmp3 = ytstreamp3.pipe(fs.createWriteStream('./media/audio.mp3'));
                            createmp3.on('finish', function(){
                                console.log('file downloaded');
                                bot.sendPtt(from, './media/audio.mp3', id)
                            });
                        });

                        break

                    case 'ytmp3':
                        if (!q) return bot.reply(from, `Coloca o que você quer pesquisar zé`, id)
                        const ytstreamp3 = ytdl(q, { filter: 'audioonly' })
                        const createmp3 = ytstreamp3.pipe(fs.createWriteStream('./media/audio.mp3'));
                        createmp3.on('finish', function(){
                            console.log('file downloaded');
                            bot.sendPtt(from, './media/audio.mp3', id)
                        });
                        break;

                    // case 'ytmp4':
                    //     if (!q) return bot.reply(from, `Coloca o que você quer pesquisar zé`, id)
                    //     const ytstream = ytdl(q);
                    //     const create = ytstream.pipe(fs.createWriteStream('./media/video.mp4'));
                    //     create.on('finish', function(){
                    //         console.log('file downloaded');
                    //         bot.sendFile(from, './media/video.mp4', 'video.mp4', '', id)
                    //         fs.unlinkSync('./media/video.mp4')
                    //     });
                    //     break;


                    case 'gtts':
                        if (args.length == 0) return bot.reply(from, `Mengubah teks menjadi sound (google voice)\nketik: ${prefix}tts <kode_bahasa> <teks>\ncontoh : ${prefix}tts id halo\nuntuk kode bahasa cek disini : https://anotepad.com/note/read/5xqahdy8`)
                        const ttsGB = require('node-gtts')(args[0])
                        const dataText = body.slice(8)
                        if (dataText === '') return bot.reply(from, 'Escreva algo', id)
                        try {
                            ttsGB.save('./media/tts.mp3', dataText, function () {
                                bot.sendPtt(from, './media/tts.mp3', id)
                            })
                        } catch (err) {
                            bot.reply(from, err, id)
                        }
                        break

                    case 'traduzir':
                        if (args.length === 0) return bot.reply(from, `Para traduzir utilize ${prefix}traduzir [idioma] frase que deseja traduzir\n\nExemplo : ${prefix}traduzir pt Bo naquele beco escuro ali?`, id)
                        const dataText2 = body.slice(13)
                        await axios.get(`https://amm-api-translate.herokuapp.com/translate?engine=google&text=${dataText2}&to=${args[0]}`).then(res => {
                            const texttr = res.data.data.result
                            bot.reply(from, texttr, id)
                        })
                        break

                    case 'covid':
                        if (isGroupMsg) {
                            if (mentionedJidList.length === 0) {
                                const infectado = groupMembers
                                const oinfec = infectado[Math.floor(Math.random() * infectado.length)];
                                const infectrandom = `Parabéns @${oinfec.replace(/[@c.us]/g, '')} Você foi infectado :)`
                                await bot.sendTextWithMentions(from, infectrandom)
                            } else {
                                await bot.sendTextWithMentions(from, `Parabéns você infectou ${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`)}`)
                            }
                        } else
                            await bot.sendText(from, 'Parabens Você foi infectado :)')
                        break

                    case 'dolar':
                        await axios.get(`https://economia.awesomeapi.com.br/all/USD`).then(res => {
                            const texttr = res.data.USD.bid
                            bot.reply(from, `Dólar hoje: R$ ${texttr}`, id)
                        })
                        break

                    case 'euro':
                        await axios.get(`https://economia.awesomeapi.com.br/all/EUR`).then(res => {
                            const texttr = res.data.EUR.bid
                            bot.reply(from, `Euro hoje: R$ ${texttr}`, id)
                        })
                        break

                    case 'bitcoin':
                        await axios.get(`https://economia.awesomeapi.com.br/all/BTC`).then(res => {
                            const texttr = res.data.BTC.bid
                            bot.reply(from, `Bitcoin hoje: R$ ${texttr}`, id)
                        })
                        break

                    case 'dogecoin':
                        await axios.get(`https://economia.awesomeapi.com.br/all/DOGE`).then(res => {
                            const texttr = res.data.DOGE.bid
                            bot.reply(from, `Dogecoin hoje: R$ ${texttr}`, id)
                        })
                        break

                    case 'admlist':
                        if (!isGroupMsg) return bot.reply(from, 'Comando somente para grupos!', id)
                        let mimin = ''
                        for (let admon of groupAdmins) {
                            mimin += `➸ @${admon.replace(/@c.us/g, '')}\n`
                        }
                        await bot.sendTextWithMentions(from, `Esses são os Adm's do Grupo ! \n${mimin}`)
                        break

                    case 'fechargrupo':
                        if (author === '553298033583@c.us') {
                            if (args[0] === 'on') {
                                bot.setGroupToAdminsOnly(groupId, true).then(() => bot.sendText(from, 'Grupo está fechado somente os adms podem enviar msgs #DitaduraON !'))
                            } else if (args[0] === 'off') {
                                bot.setGroupToAdminsOnly(groupId, false).then(() => bot.sendText(from, 'A baderna está liberada dnv para todos !'))
                            } else {
                                await bot.reply (from, `para fechar um grupo digite !fechargrupo on ou !fechargrupo off`, id)
                            }
                        } else {
                            if (!isGroupMsg) return bot.reply(from, 'Precisa está em um grupo para realizar esse comando', id)
                            if (!isGroupAdmins) return bot.reply(from, 'Você precisa ser adm do grupo para realizar esse comando!', id)
                            if (!isBotGroupAdmins) return bot.reply(from, 'O bot precisa ser adm do grupo para realizar esse comando!', id)
                            if (args.length !== 1) return bot.reply(from, `para fechar um grupo digite !fechargrupo on ou !fechargrupo off`, id)
                            if (args[0] === 'on') {
                                bot.setGroupToAdminsOnly(groupId, true).then(() => bot.sendText(from, 'Grupo está fechado somente os adms podem enviar msgs #DitaduraON !'))
                            } else if (args[0] === 'off') {
                                bot.setGroupToAdminsOnly(groupId, false).then(() => bot.sendText(from, 'A baderna está liberada dnv para todos !'))
                            } else {
                                await bot.reply (from, `para fechar um grupo digite !fechargrupo on ou !fechargrupo off`, id)
                            }
                        }
                        break

                    case 'tempo':
                        if (!q) return bot.reply(from, `Digite o nome da cidade após o comando`, id)
                        const tempo = await axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + q.normalize("NFD").replace(/\p{Diacritic}/gu, "") + "&lang=pt_br&appid=f5aec925a7b953a4644a27adea1ffae2&units=metric")
                        const cidade = tempo.data.name
                        const temp = tempo.data.main.temp
                        const cond = tempo.data.weather[0].description
                        const umi = tempo.data.main.humidity
                        const vento = tempo.data.wind.speed
                        const sens = tempo.data.main.feels_like
                        const tempmin = tempo.data.main.temp_min
                        const tempmax = tempo.data.main.temp_max
                        await bot.sendText(from, `⛈BOT DCC Meteorologia🌤\n\nCidade: *${cidade}*\nAgora está *${temp}°C*\nCondição: *${cond}*\nUmidade do Ar: *${umi}%*\nVento: *${vento}*\nSensação termica: *${sens}*\nTemperatura Minima: *${tempmin}*\nTemperatura Maxima: *${tempmax}*`)
                        break


                    case 'bolsonaro':
                        gis('Bolsonaro', logResultss);
                    async function logResultss(error, results) {
                        if (error) {
                            console.log(error);
                        } else {
                            await bot.sendFileFromUrl(from, results[Math.floor(Math.random() * 50)].url, "image.png", "#BolsoMito2022\nTa com medo petista safado ? 😎👉🇧🇷🇺🇸", "", id)
                        }
                    }
                        await bot.sendPtt(from, './media/audio/bolsonaro.mp3', id)
                    break

                    case 'lula':
                        gis('Lula', logResultsss);
                    async function logResultsss(error, results) {
                        if (error) {
                            console.log (error);
                        } else {
                            await bot.sendFileFromUrl (from, results[Math.floor (Math.random () * 50)].url, "image.png", "Pai Lulo tirou 146354 milhões de bots de wpp da pobreza", "", id)
                        }
                    }
                    break

                    case 'rankgay':
                        if (!isGroupMsg) return bot.reply(from, 'este comando só pode ser usado dentro do grupo', id)
                        await bot.sendTextWithMentions(from, rankgay(groupMembers))
                        break

                    case 'rankfeio':
                        if (!isGroupMsg) return bot.reply(from, 'este comando só pode ser usado dentro do grupo', id)
                        await bot.sendTextWithMentions(from, rankfeio(groupMembers))
                        break

                    case 'rankqi':
                        if (!isGroupMsg) return bot.reply(from, 'este comando só pode ser usado dentro do grupo', id)
                        await bot.sendTextWithMentions(from, rankqi(groupMembers))
                        break

                    case 'ranklindo':
                        if (!isGroupMsg) return bot.reply(from, 'este comando só pode ser usado dentro do grupo', id)
                        await bot.sendTextWithMentions(from, ranklindo(groupMembers))
                        break

                    case 'rojão':
                    case 'rojao':
                        await bot.sendText(from, 'pra pra pra pra')
                        await bot.sendText(from, 'pra')
                        await bot.sendText(from, 'pra')
                        await bot.sendText(from, 'pra pra pra pra pra')
                        const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
                        await delay(5)
                        await bot.sendText(from, 'POOOOOOOOOOOW')
                        break

                    case 'casino':
                        if(q === 'vitorias'){
                            let rank = fs.readFileSync('casinopoints.json');
                            let rankjson = JSON.parse(rank);
                            let arrayrank = [];
                            for(let i = 0; i < rankjson.table.length; i++){
                                arrayrank.push(rankjson.table[i].numero)
                            }
                            function getOccurrence(array, value) {
                                return array.filter((v) => (v === value)).length;
                            }
                            await bot.reply(from, `Você ganhou ${(getOccurrence(arrayrank, author))} vez(es) no Casino`, id)
                        }else {
                            let emojis = ['🍇', '🍓', '🍒', '🍐', '🍎', '🍋', '🍍', '💎'];
                            let resultado1 = emojis[Math.floor(Math.random() * emojis.length)];
                            let resultado2 = emojis[Math.floor(Math.random() * emojis.length)];
                            let resultado3 = emojis[Math.floor(Math.random() * emojis.length)];

                            await bot.sendText(from, '' +
                                '╔══✪〘 DCC CASINO 〙✪══╗\n' +
                                '║                                                   ║\n' +
                                '║        ' + resultado1 + '                                     ║📍\n' +
                                '║                                                   ║\n' +
                                '╚══✪〘 DCC CASINO 〙✪══╝')

                            const delay2 = ms => new Promise(resolve => setTimeout(resolve, ms))
                            await delay2(3000)

                            await bot.sendText(from, '' +
                                '╔══✪〘 DCC CASINO 〙✪══╗\n' +
                                '║                                                   ║\n' +
                                '║        ' + resultado1 + '           ' + resultado2 + '                    ║📍\n' +
                                '║                                                   ║\n' +
                                '╚══✪〘 DCC CASINO 〙✪══╝')

                            await delay2(3000)

                            await bot.sendText(from, '' +
                                '╔══✪〘 DCC CASINO 〙✪══╗\n' +
                                '║                                                   ║\n' +
                                '║        ' + resultado1 + '           ' + resultado2 + '          ' + resultado3 + '    ║📍\n' +
                                '║                                                   ║\n' +
                                '╚══✪〘 DCC CASINO 〙✪══╝')

                            if (resultado1 === resultado2 && resultado2 === resultado3) {
                                casinoPoint(author)
                                await bot.sendTextWithMentions(from, `Parabens você ganhou @${author.replace(/[@c.us]/g, '')} ! 🪙🪙🪙`)
                                const ytstreamp3 = ytdl('https://www.youtube.com/watch?v=LCDaw0QmQQc', {filter: 'audioonly'})
                                const createmp3 = ytstreamp3.pipe(fs.createWriteStream('./media/audio.mp3'));
                                createmp3.on('finish', function () {
                                    console.log('file downloaded');
                                    bot.sendPtt(from, './media/audio.mp3', id)
                                    fs.unlinkSync('./media/audio.mp3')
                                });

                            } else {
                                await bot.sendText(from, 'Poxa que pena mais sorte da proxima vez ! 🎰💸')
                            }
                        }
                        break

                    case 'sobre':
                        await bot.reply(from, 'Olá ' +pushname+ ' aqui esta algumas informações sobre mim :\n\n' +
                             '1 - *Só posso ser adicionado em grupos pequenos e pode levar algum tempo para entrar no grupo*\n' +
                             'Pq ? Estou hospedado em um server gratuito com pouca memoria ;-;\n' +
                             '2 - *Todos os comandos devem conter o prefixo ! para funcionar*\n' +
                             '3 - *As vezes alguns comandos param de funcionar, isso é normal, o bot utiliza varias API(s) que sofrem constantes atualizações*\n' +
                             '4 - *O bot tambem para de funcionar algumas vezes, isso é culpa tanto do server quanto do wpp!*\n\n' +
                             '*Por fim, se tiver mais alguma duvida, e queira falar com o dev ( ele chama Vini, ok?) ou sugestão de comando, deixe no PV do bot :)*' ,id)

                        if (isGroupMsg) if (verifyWhiteList(author)=== true) return await bot.reply(from, 'Você está na WhiteList do bot (Tem poderes de Adm do BOT)', id)
                        else if (isGroupAdmins) return await bot.reply(from, `Você é Adm desse grupo` ,id)
                        else await bot.reply(from, `Você é um membro comum desse grupo ,logo alguns comandos do BOT não estão disponiveis para você`)
                        break

                    case 'tabela':
                        if(args.length === 0) return bot.reply(from, 'Para ver a Tabela do Brasileirão digite !tabela A (para serie A) ou B (para serie B)', id)
                        if (q === 'A') {
                            serieA()
                        }
                        else if(q === 'B'){
                            serieB()
                        }
                        break

                    case 'jogos':
                        if(args.length === 0) return bot.reply(from, 'Para ver os jogos do Brasileirão digite !jogos A (para serie A) ou B (para serie B)', id)
                        if (q === 'A') {
                            jogosSerieA()
                        }
                        else if(q === 'B'){
                            jogosSerieB()
                        }
                        break

                    case 'blacklist':
                        if(verifyWhiteList(author)=== false) return await bot.reply(from, 'Comando somente para Adm(s) do BOT', id)
                        if(mentionedJidList.length === 0 && args.length === 0){
                            let listaBlack = fs.readFileSync('blacklist.json');
                            let listBlack = JSON.parse(listaBlack);
                            for(let i = 0; i < listBlack.table.length; i++) {
                                for (let j = 0; j < groupMembers.length; j++) {
                                    if (listBlack.table[i].numero === groupMembers[j]){
                                        const result = `Lista de Banidos de uso do BOT\n@${listBlack.table[i].numero.replace(/[@c.us]/g, '')}`
                                        await bot.sendTextWithMentions(from, result)}
                                }
                            }
                        }
                        else if(q.startsWith('r')){
                            if (mentionedJidList.length === 0) return await bot.reply(from, 'Marque um usuario', id)
                            let lista = fs.readFileSync('whitelist.json');
                            let listShow = JSON.parse(lista);
                            for(let i = 0; i < listShow.table.length; i++){
                                if(author === listShow.table[i].numero){
                                    let listaBlack = fs.readFileSync('blacklist.json');
                                    let listBlack = JSON.parse(listaBlack);
                                    for(let i = 0; i < listBlack.table.length; i++){
                                        if(listBlack.table[i].numero === mentionedJidList[0]) {
                                            listBlack.table.splice(i,1)
                                            fs.writeFileSync('blacklist.json', JSON.stringify(listBlack, null));
                                            await bot.reply(from, 'Usuario removido da Lista Negra do BOT', id)
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            let listaBlack = fs.readFileSync('blacklist.json');
                            let listBlack = JSON.parse(listaBlack);
                            for(let i = 0; i < listBlack.table.length; i++) if(mentionedJidList[0] === listBlack.table[i].numero) return bot.reply(from, 'Esse usuario já está na Lista Negra do BOT',id)
                            let lista = fs.readFileSync('whitelist.json');
                            let listShow = JSON.parse(lista);
                            for(let i = 0; i < listShow.table.length; i++){
                                if(author === listShow.table[i].numero){
                                    addBlackList(mentionedJidList[0])
                                    await bot.reply(from, 'Usuario adicionado na Lista Negra do BOT', id)
                                }
                            }
                        }
                        break

                    default:
                        if (command.startsWith('#')) {
                            const userdev = author.replace('@c.us', '')
                            if (userdev !== '553298033583')return await bot.sendText(from, `Somente Adm's do Bot pode utlizar esses comandos !`)
                            console.log('pika')
                        }
                }
            }



} catch (err) {
        console.log(color('[EROR]', 'red'), err)
    }
}
