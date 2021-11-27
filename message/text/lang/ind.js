const fs = require('fs-extra')


exports.wait = () => {
    return `Calma ae parceiro`
}

exports.videoLimit = () => {
    return `O tamanho do vídeo é muito grande!`
}

exports.ok = () => {
    return `Tá na mão patrão`
}

exports.wrongFormat = () => {
    return `Formato errado`
}

exports.groupOnly = () => {
    return `Esse comando só pode ser executado em um grupo`
}

exports.adminOnly = () => {
    return `Somente adm pode fazer isso zé`
}

