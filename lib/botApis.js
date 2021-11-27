const axios = require('axios')
require('dotenv').config()
const { fetchJson } = require('../utils/fetcher')
const fs = require('fs-extra')
const cheerio = require("cheerio");
const setting = JSON.parse(fs.readFileSync('./settings/setting.json'))


const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function rankgay(groupMembers){
    const membrosgay = groupMembers
    const primeirogay = membrosgay[Math.floor(Math.random() * membrosgay.length)];
    const segundogay = membrosgay[Math.floor(Math.random() * membrosgay.length)];
    const terceirogay = membrosgay[Math.floor(Math.random() * membrosgay.length)];
    const quartogay = membrosgay[Math.floor(Math.random() * membrosgay.length)];
    const quintogay = membrosgay[Math.floor(Math.random() * membrosgay.length)];
    const gayresult = `🏳‍🌈🏳‍🌈‍ Os mais boiolas do grupo\n1. @${primeirogay.replace(/[@c.us]/g, '')}\n2. @${segundogay.replace(/[@c.us]/g, '')}\n3. @${terceirogay.replace(/[@c.us]/g, '')}\n4. @${quartogay.replace(/[@c.us]/g, '')}\n5. @${quintogay.replace(/[@c.us]/g, '')}\n`
    return gayresult;
}

function rankfeio(groupMembers){
    const membrosfeio = groupMembers
    const primeirofeio = membrosfeio[Math.floor(Math.random() * membrosfeio.length)];
    const segundofeio = membrosfeio[Math.floor(Math.random() * membrosfeio.length)];
    const terceirofeio = membrosfeio[Math.floor(Math.random() * membrosfeio.length)];
    const quartofeio = membrosfeio[Math.floor(Math.random() * membrosfeio.length)];
    const quintofeio = membrosfeio[Math.floor(Math.random() * membrosfeio.length)];
    const feioresult = `🤮🤮‍ Os mais feios do grupo\n1. @${primeirofeio.replace(/[@c.us]/g, '')}\n2. @${segundofeio.replace(/[@c.us]/g, '')}\n3. @${terceirofeio.replace(/[@c.us]/g, '')}\n4. @${quartofeio.replace(/[@c.us]/g, '')}\n5. @${quintofeio.replace(/[@c.us]/g, '')}\n`
    return feioresult;
}
function rankqi(groupMembers){
    const membrosQi = groupMembers
    const primeiroQi = membrosQi[Math.floor(Math.random() * membrosQi.length)];
    const segundoQi = membrosQi[Math.floor(Math.random() * membrosQi.length)];
    const terceiroQi = membrosQi[Math.floor(Math.random() * membrosQi.length)];
    const quartoQi = membrosQi[Math.floor(Math.random() * membrosQi.length)];
    const quintoQi = membrosQi[Math.floor(Math.random() * membrosQi.length)];
    const Qiresult = `🤓🤓‍ Os mais inteligentes do grupo\n1. @${primeiroQi.replace(/[@c.us]/g, '')}\n2. @${segundoQi.replace(/[@c.us]/g, '')}\n3. @${terceiroQi.replace(/[@c.us]/g, '')}\n4. @${quartoQi.replace(/[@c.us]/g, '')}\n5. @${quintoQi.replace(/[@c.us]/g, '')}\n`
    return Qiresult;
}

function ranklindo(groupMembers){
    const membroslindo = groupMembers
    const primeirolindo = membroslindo[Math.floor(Math.random() * membroslindo.length)];
    const segundolindo = membroslindo[Math.floor(Math.random() * membroslindo.length)];
    const terceirolindo = membroslindo[Math.floor(Math.random() * membroslindo.length)];
    const quartolindo = membroslindo[Math.floor(Math.random() * membroslindo.length)];
    const quintolindo = membroslindo[Math.floor(Math.random() * membroslindo.length)];
    const lindoresult = `😎😎‍ Os mais lindos do grupo\n1. @${primeirolindo.replace(/[@c.us]/g, '')}\n2. @${segundolindo.replace(/[@c.us]/g, '')}\n3. @${terceirolindo.replace(/[@c.us]/g, '')}\n4. @${quartolindo.replace(/[@c.us]/g, '')}\n5. @${quintolindo.replace(/[@c.us]/g, '')}\n`
    return lindoresult;
}

const cep = async (end) => new Promise((resolve, reject) => {
    axios.get(`https://viacep.com.br/ws/${end}/json/`)
        .then((res) => {
            const cepend = `- *Cep :* ${res.data.cep}\n- *Logradouro :* ${res.data.logradouro}\n- *Complemento :* ${res.data.complemento}\n- *Bairro :* ${res.data.bairro}\n- *Localidade :* ${res.data.localidade}\n- *UF :* ${res.data.uf}\n- *IBGE :* ${res.data.ibge}\n- *DDD :* ${res.data.ddd}`
            resolve(cepend)
        })
        .catch((err) => {
            reject(err)
        })
})

function cpf(){
    const numero1 = Math.floor(Math.random() * 9) + 1
    const numero2 = Math.floor(Math.random() * 9) + 1
    const numero3 = Math.floor(Math.random() * 9) + 1
    const numero4 = Math.floor(Math.random() * 9) + 1
    const numero5 = Math.floor(Math.random() * 9) + 1
    const numero6 = Math.floor(Math.random() * 9) + 1
    const numero7 = Math.floor(Math.random() * 9) + 1
    const numero8 = Math.floor(Math.random() * 9) + 1
    const numero9 = Math.floor(Math.random() * 9) + 1
    const numero10 = Math.floor(Math.random() * 7) + 1
    const numero11 = Math.floor(Math.random() * 6) + 1
    return `CPF : ${numero1}${numero2}${numero3}.${numero4}${numero5}${numero6}.${numero7}${numero8}${numero9}-${numero10}${numero11}`
}

function cartao(){
    const bandeira = ["MasterCard", "Visa", "HiperCard", "Elo", "Diners Club", "American Express"]
    const randomband = bandeira[Math.floor(Math.random() * bandeira.length)];

    const cardnumero1 = Math.floor(Math.random() * 5) + 1
    const cardnumero2 = Math.floor(Math.random() * 7) + 1
    const cardnumero3 = Math.floor(Math.random() * 9) + 1
    const cardnumero4 = Math.floor(Math.random() * 3) + 1
    const cardnumero5 = Math.floor(Math.random() * 3) + 1
    const cardnumero6 = Math.floor(Math.random() * 9) + 1
    const cardnumero7 = Math.floor(Math.random() * 8) + 1
    const cardnumero8 = Math.floor(Math.random() * 6) + 1
    const cardnumero9 = Math.floor(Math.random() * 9) + 1
    const cardnumero10 = Math.floor(Math.random() * 7) + 1
    const cardnumero11 = Math.floor(Math.random() * 6) + 1
    const cardnumero12 = Math.floor(Math.random() * 9) + 1
    const cardnumero13 = Math.floor(Math.random() * 9) + 1
    const cardnumero14 = Math.floor(Math.random() * 7) + 1
    const cardnumero15 = Math.floor(Math.random() * 8) + 1
    const cardnumero16 = Math.floor(Math.random() * 9) + 1
    const mesvalid = Math.floor(Math.random() * 12) + 1
    const anovalid = [21, 22, 23, 24, 25, 26]
    const randomano = anovalid[Math.floor(Math.random() * anovalid.length)];
    return `Bandeira : ${randomband}\nValidade : ${mesvalid}/${randomano}\nCodigo : ${cardnumero6}${cardnumero2}${cardnumero15}\nNúmero Cartão : \n${cardnumero1}${cardnumero2}${cardnumero3}${cardnumero4} ${cardnumero5}${cardnumero6}${cardnumero7}${cardnumero8} ${cardnumero9}${cardnumero10}${cardnumero11}${cardnumero12} ${cardnumero13}${cardnumero14}${cardnumero15}${cardnumero16}`
}

module.exports = {
    sleep,
    cep,
    rankgay,
    rankfeio,
    rankqi,
    ranklindo,
    cpf,
    cartao
}

