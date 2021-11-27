const fs = require('fs-extra')
const {prefix} = JSON.parse(fs.readFileSync('./settings/setting.json'))

exports.comandos = (pushname) => {
    return `
🤖 DCC Bot V1.2 ( ͡❛ ͜ʖ ͡❛)✌

Feito por : @viniie32

Eaee ${pushname}👋️, sou o DCC Bot e esses são meus comandos !


1. *🤖${prefix}gtts*
Para a voz do google falar algo !
Como usar: !gtts (idioma) (Seu Texto)
Exemplo : !gtts pt Bom dia grupo

2. *🏓${prefix}ping*
Para ver seu ping

3. *📷${prefix}toimg*
Para converter sticker em imagem !
Como usar: Responda um sticker com o comando

4. *😜${prefix}sticker*
Converte Midia em Sticker !
Como usar : Responda ou envie a midia com o comando

5. *🔎${prefix}imagem*
pesquisa uma imagem do que você digitou
Como usar : ${prefix}imagem (Sua pesquisa)

6. *🇺🇸${prefix}traduzir*
traduza um texto !
Como usar : responda uma mensagem com ${prefix}traduzir (idioma)

7. *🐸${prefix}memes*
Um meme aleatorio do reddit !

8. *👊${prefix}ppt*
Jogue um pedra, papel ou tesoura com o bot
Como usar : *${prefix}ppt* pedra

9. *🐸${prefix}meme*
Criar um meme com uma foto e dois textos !
Como usar : selecione uma imagem ou envia com o comando ${prefix}meme (texto da parte de cima ) / (texto da parte de baixo)

10. *🎰${prefix}casino*
Veja se você esta com sorte no JackPot !
use *${prefix}casino vitorias* Para ver quantas vitorias voce possui

>> *📥Área dos downloads (Audio e Video)📥* <<

1. *🎵${prefix}play*
Pesquisa e baixa um mp3 do que voce quiser !
Como usar : ${prefix}play (sua pesquisa)

2. *🎸${prefix}ytmp3*
Baixa um .mp3 do yotube !
Como usar : ${prefix}ytmp3 (link do video)

3. *📀${prefix}ytmp4*
Baixa um .mp4 do yotube !
Como usar : ${prefix}ytmp4 (link do video)

>> *🤳Edição de Fotos* <<

1. *🚓${prefix}wasted*

2. *🌈${prefix}raibow*

3. *🎮${prefix}gta*

4. *🗑️${prefix}lixo*

5. *🦗${prefix}bug*

6. *🇨🇳${prefix}socialismo*

7. *⛓${prefix}cadeia*

8. *🎯${prefix}missao*

9. *🐺${prefix}fosco*

10. *😡${prefix}triggered*

11. *👁${prefix}toon*

12. *📺${prefix}bolsotv*

13. *🎌${prefix}edinaldo*


>> *📜Textos em formas📜* <<

Como usar : ${prefix}(forma) (seu texto)
Formas :

blackpink
trumptweet
bolsotweet
veio
phub

>> *🕵️Stalker🕵️* <<

1. *🐱${prefix}github* + (nome do usuario)
2. *💜${prefix}insta* + (nome do usuario)

>> *🔀Comandos aleatorios🔀* <<

1. *🦠${prefix}covid*
2. *☁️${prefix}tempo*
3. *🕶️${prefix}bolsonaro*
4. *🐙${prefix}lula*
5. *🪙${prefix}moeda*
6. *🎲${prefix}dado*
7. *📍${prefix}cep*
8. *🧍${prefix}cpf*
9. *💳${prefix}cartão*
10. *💵${prefix}dolar*
11. *💶${prefix}euro*
12. *💴${prefix}bitcoin*
13. *🐕${prefix}dogecoin*
14. *🤖${prefix}bot*
15. *🎆${prefix}rojão*
16. *🖨️${prefix}print*
17. *🪔${prefix}sobre*
18. *⚽${prefix}tabela*
19. *⚽${prefix}jogos*
20. *🃏${prefix}carta*

>> *🏆Ranks🏆* <<

1. *🏆🏳️‍🌈${prefix}rankgay*
2. *🏆🥸${prefix}rankfeio*
3. *🏆🤓${prefix}rankqi*
4. *🏆☺${prefix}ranklindo*


>> *🏘Comandos para grupos*🏘 <<

1. *💌${prefix}crush*
Quem são o casal do grupo ?

2. *📸${prefix}getpic*
Pegue a foto de alguem do frupo !
Como usar : ${prefix}getpic (@usuario)

3. *✋${prefix}tapa*
Enfia a mão na cara de alguem do grupo !
Como usar : ${prefix}tapa @usuario

4. *🤗${prefix}abraço*
Abrace alguem do grupo !
Como usar : ${prefix}abraço @usuario

5. *💏${prefix}beijo*
Beije alguem do grupo !
Como usar : ${prefix}beijo @usuario

6. *🔫${prefix}tiro*
Atire em alguem do grupo !
Como usar : ${prefix}tiro @usuario

7. *☠${prefix}suicidio*
Se mate !
Como usar : ${prefix}suicidio

>> *👮SOMENTES ADM's👮* <<

1. *➕${prefix}add*
Para adicionar um novo membro no grupo !
Como usar : ${prefix}add (Numero do contato)

2. *🚫${prefix}ban*
Para remover um membro no grupo !
Como usar : ${prefix}ban (Numero do contato)

3. *🆙${prefix}promover*
Para promover um membro no grupo !
Como usar : ${prefix}promover (Numero do contato)

4. *👎${prefix}rebaixar*
Para rebaixar um membro no grupo !
Como usar : ${prefix}rebaixar (Numero do contato)

5. *📣${prefix}geral*
Chamar todos os cornos do grupo !

6. *🔐${prefix}fechargrupo*
Somentes Adm's poderam mandar mensagens !
Ex: !fechargrupo on

7. *👮${prefix}admlist*
Mostre quem são os adm's do grupo !

7. *❌${prefix}del*
Apague as mensagens do BOT !

>> *🤖SOMENTE ADM'S DO BOT🤖* <<

1. *${prefix}blacklist*
Add membros a lista negra do bot

Para mais informações sobre o bot digite *!sobre*`
}
