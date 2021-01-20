/* Mau Ngapain 
  Biasa Mau Ngubah
  Ooo Kasih Nama Gw Su
 Mau Reuplod?
 Kasih Nama Gw Su*/

const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { mnc } = require('./src/mnc')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { donasi } = require('./src/donasi')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const lolis = require('lolis.life')
const loli = new lolis()
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const penguna = JSON.parse(fs.readFileSync('./src/penguna.json'))
const speed = require('performance-now')
const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
const imgbb = require('imgbb-uploader')
const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
const {vip} = require('./vipmenu/vip')
const vcard = 'BEGIN:VCARD\n'
            + 'VERSION:3.0\n' // Versi Bot Kamu
            + 'FN:Mr.Virtex\n' // Nama kamu
            + 'ORG:FROZEBO%;\n' // Nama bot
            + 'TEL;type=CELL;type=VOICE;waid=6281539336834:+62 815-3933-6834\n' //Nomor whatsapp kamu
            + 'END:VCARD'
prefix = '!' // prefix bot kamu
blocked = []

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./BarBar.json') && client.loadAuthInfo('./BarBar.json')
	client.on('connecting', () => {
		start('2', 'Connecting...')
	})
	client.on('open', () => {
		success('2', 'Connected')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./BarBar.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Halo @${num.split('@')[0]}\nSelamat datang di group *${mdata.subject}*`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Sayonara @${num.split('@')[0]}👋`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

	client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
                        if (!mek.hasNewMessage) return
                        mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = 'Your-Api-Key'
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: '[⏳]Tunggu 1± menit Gan',
				success: '✔️ Berhasil ✔️',
				user: 'Maaf Kak Kamu Belum Terdaftar Di Data Base Kami Silakan Ketim ${prefix}user',
				nulis: '*[❗] Wait Sedang Serching*',
				error: {
					stick: '❌ Gagal, terjadi kesalahan saat mengkonversi gambar ke sticker ❌',
					Iv: '❌ Link tidak valid ❌'
				},
				only: {
					vip: '[❗] Perintah Ini Hanya Untuk User Premium',
					group: '❌ Perintah ini hanya bisa di gunakan dalam group! ❌',
					ownerG: '❌ Perintah ini hanya bisa di gunakan oleh owner group! ❌',
					ownerB: '❌ Perintah ini hanya bisa di gunakan oleh owner bot! ❌',
					admin: '❌ Perintah ini hanya bisa di gunakan oleh admin group! ❌',
					Badmin: '❌ Perintah ini hanya bisa di gunakan ketika bot menjadi admin! ❌',
					user: '[❗] Maaf Kamu Belum Terdaftar Di Database Silahkan Ketik !daftar',
				},
					bar2: {
						sabar: '*[⏳] Wait Sedang Di Proses Tunggu 1± Menit*',
						berhs: '*[❗]Berhasi Kak *',
						vip: '_[❗] Fitur Ini Hanya Untuk User Premium!!!_',
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = ["6281539336834@s.whatsapp.net"] // Nomor Kamu 
            const vipNumber = ["6281539336834@s.whatsapp.net"] // jangan di ubah su
			const isGroup = from.endsWith('@g.us')
			const mhankaipi = 'Your' // api mhankbarbar kamu
            const tobzapi = 'Your' // api tobz kamu
            const apiy = 'Your' // api kamu 
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isOo = penguna.includes(sender)
			const isVip = vipNumber.includes(sender)
			const date = new Date().toLocaleDateString()
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			switch(command) {
				case 'help':
				case 'menu':
				    if (!isOo) return reply(mess.only.user)
					client.sendMessage(from, help(prefix), text, {quoted :mek})
					break  
					case 'ramalanjodoh':
					if (!isOo) return reply(mess.only.user)
                    op =  body.slice(13)
                    nama1 = op.split("|")[0];
                    nama2 = op.split("|")[1];
                    anu = await fetchJson (`http://api-melodicxt.herokuapp.com/api/primbon-ramalan-jodoh?name1=${nama1}&name2=${nama2}&apiKey=${apiy}`, {method: 'get'})
                    bupp = await getBuffer(anu.result.thumb)
                    teks = `*❥POSITIF*'${anu.result.positif}\n*❥NEGATIF*:${anu.result.negatif}`
                    clinet.sendMessage(from, bupp, image, {quoted: mek, caption: teks})
                    break
					case 'firetxt':
					if (!isOo) return reply(mess.only.user)
					gg = body.slice(8)
                    reply(mess.wait)
                    anu = await fetchJson (`https://api.zeks.xyz/api/tfire?text=${gg}&apikey=Beli Sendiri`, {method: 'get'})
                    butt = await getBuffer(anu.result)
                    client.sendMessage(from, butt, image, {quoted: mek, caption: 'nih'})
                    break
					case 'tpp':
					if (!isOo) return reply(mess.only.user)
					reply(mess.wait)
					if (args.length < 1) return reply('*Textnya mana om?*')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = body.slice(5).trim()
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/ttp?text=${teks}&apikey=${tobzapi}`, {method: 'get'})
					if (anu.error) return reply(anu.error) 
					gett = await getBuffer(anu.base64)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						bufferhgf = fs.readFileSync(rano)
						client.sendMessage(from, bufferhgf, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break 
					case 'daftar':
					client.updatePresence(from, Presence.composing)
					if (isOo) return reply('*Kak Susah Terdaftar 🙂*')
					if (args.length < 1) return reply(`Parameter Salah\nCommand : ${prefix}daftar nama|umur\nContoh : ${prefix}daftar MR|12`)
					var reg = body.slice(8)
					var jeneng = reg.split("|")[0];
					var umure = reg.split("|")[1];
						penguna.push(sender)
						fs.writeFileSync('./src/penguna.json', JSON.stringify(penguna))
						client.sendMessage(from, `\`\`\`Pendaftaran berhasil Berhasi Kak Daftar Id STM08GK8PPHBSJDH10J\`\`\`\n\n\`\`\`Pada ${date} ${time}\`\`\`\n\`\`\`[Nama]: ${jeneng}\`\`\`\n\`\`\`[Nomor]: wa.me/${sender.split("@")[0]}\`\`\`\n\`\`\`[Umur]: ${umure}\`\`\`\n\`\`\`Selamat Mengunakan Bot Kami ☺️\`\`\`\n\`\`\`silahkan\`\`\`\n\`\`\`kirim ${prefix}help\`\`\`\n\`\`\`\nTotal Pengguna ${penguna.length}\`\`\``, text, {quoted: mek})
					break
					case 'urlimg':
					if (!isOo) return reply(mess.only.user)
					if (args.length < 1) return reply(`Text Nya mana Um???`)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbar.tech/api/url2image?tipe=android&url=${body.slice(7)}&apiKey=${mhankaipi}`, {method: 'get'})
					buffet = await getBuffer(anu.result)
					client.sendMessage(from, buffet, image, {quotes: mek, caption: 'nih'})
					break  
					case 'tebakgambar':
					if (!isOo) return reply(mess.only.user)
					anu = await fetchJson(`http://api-melodicxt.herokuapp.com/api/tebak-gambar?apiKey=${apiy}`, {method: 'get'})
					buppp = await getBuffer(anu.result.img)
					setTimeout( () => {
					client.sendMessage(from, '*➸ Jawaban :* '+anu.result.jawaban, text, {quoted: mek}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_10 Detik lagi…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_20 Detik lagi_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_30 Detik lagi_…', text) // ur cods
					}, 2500) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, buppp, image, { caption: '_Jelaskan Apa Maksud Gambar Ini_', quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					break 
					case 'nulis2':
					if (!isOo) return reply(mess.only.user)
					reply(mess.wait)
					if (args.length < 1) return reply(`[❗] Text Nya mana Um`)
					bupps = await fetchJson(`http://api-melodicxt.herokuapp.com/api/joki-nulis?text=${body.slice(7)}&apiKey={apiy}`, {method: 'get'})
					kopp = await getBuffer(bupps.result.result)
					client.sendMessage(from, kopp, image, {quoted: mek, caption: 'Nih Dasar Orang Malas'})
					break
					case 'owner':
					if (!isOo) return reply(mess.only.user)
					client.sendMessage(from, {displayname: "Jeff", vcard: vcard}, MessageType.contact, { quoted: mek})
					reply(`Ini Kak Kaku Loh Jangan Macan Macan Nanti ku block  >//<`)
					break
                    case 'block':
                    if (!isOo) return reply(mess.only.user)
				 client.updatePresence(from, Presence.composing) 
				 client.chatRead (from)
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					client.blockUser (`${body.slice(7)}@c.us`, "add")
					client.sendMessage(from, `perintah Diterima, memblokir ${body.slice(7)}@c.us`, text)
					break
                  case 'ownergrup':
				  case 'ownergroup':
				 if (!isOo) return reply(mess.only.user)
                  client.updatePresence(from, Presence.composing) 
                  if (!isOwner) return reply(`[❎] Perintah Di Tolak`)
                  if (isGroup) return reply(mess.only.group)
                                 options = {

          text: `Owner Group ini adalah : @${groupOwner.split("@")[0]}`,

          contextInfo: { mentionedJid: [groupOwner] }

           }

           client.sendMessage(from, options, text, { quoted: mek } )
				break
					case 'nimecry':
					if (!isOo) return reply(mess.only.user)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/cry?apikey=${tobzapi}`, {method: 'get'})
					buffftg = await getBuffer(anu.result)
					client.sendMessage(from, buffftg, image, {quoted: mek})
					break
					case 'emojitopng':
					if (!isOo) return reply(mess.only.user)
					ty = body.slice(1)
					if (!isVip) return reply(`[❗] Peritah Di Tolak Karena Anda User Biasa!!!`)
					reply(mess.wait)
					anu = await getBuffer(`https://api.zeks.xyz/api/emoji-image?apikey=apivinz&emoji=${body.slice(7)}`, {method: 'get'} )
					client.sendMessage(from, anu, image, {quoted: mek, caption: 'Nih'})
				    break
                    case 'infomobil':
                    if (!isOo) return reply(mess.only.user)
                    reply(mess.wait)
                    anu = await fetchJson(`https://api.vhtear.com/infomobil?merk=${body.slice(7)}&apikey=beli`)
                    buffty = await getBuffer(anu.image)
                    client.sendMessage(from, buffty, image, {quoted: mek, caption: 'nih'})
                    teks = '*TITLE*:${anu.title}\n*HARGA*:${anu.harga}\n\n\n*SPECIFIKASI*:${anu.spesifikasi}'
                    reply(teks)
                    break 
                    case 'pintserch':
                    if (!isOo) return reply(mess.only.user)
                    pint = body.slice(11)
                    reply(mess.wait)
                    anu = await fetchJson(`https://api.zeks.xyz/api/pin?q=${pint}&apikey=`)
                    bufft = await getBuffer(anu.result)
                    client.sendMessage(from, bufft, image, {quoted: mek, caption: '☺️'})
                    break
					case 'you':
					reply(mess.only.bar2.sabar)
					break 
                    case 'unblock':
                    if (!isOo) return reply(mess.only.user)
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
				    client.blockUser (`${body.slice(9)}@c.us`, "remove")
					client.sendMessage(from, `perintah Diterima, membuka blokir ${body.slice(9)}@c.us`, text)
				    break
                    case 'testime':
                    if (!isOo) return reply(mess.only.user)
					setTimeout( () => {
					client.sendMessage(from, '100', text) // ur cods
					client.sendMessage(from, '50', text) // ur cods
					client.sendMessage(from, '60', text) // ur cods
					}, 10000) // 1000 = 1s,
					break
			   case 'mnc':
			   case 'menuminecraft':
			        if (!isOo) return reply(mess.only.user)
					client.sendMessage(from, mnc(prefix), text)
					break 
			    case 'ytm3':
			    if (!isOo) return reply(mess.only.user)
			    if (args.length < 1) return reply('_[❗] Url Tidak ada!!!_')
			    lobby = body.slice(9)
			    reply(`[❗] Wait Searching Tunggu 3± menit`)
			    anu1 = await fetchJson(`https://arugaz.my.id/api/media/ytaudio?url=${lobby}`, {method: 'get'})
			    bufft = await getBuffer(anu1.result.thumb)
			    bufflin = await getBuffer(anu1.result.dl_link)
			    tekspn = `*➥Size*:${anu1.result.filesizeF}\n*➥TITLE*:${anu1.result.title}\n\n\n\n\n _Sedang Mendownload Mp3_`
			   client.sendMessage(from, bufft, image, {quoted: mek, caption: tekspn})
			   client.sendMessage(from, bufflin, audio, {mimetype: 'audio/mp4', quoted: mek})
			   break   
			  case 'wallpper':
			  if (!isOo) return reply(mess.only.user)
			  reply(`[❗] Wait`)
			  anu = await fetchJson(`http://api-melodicxt.herokuapp.com/api/random/wallpaper?apiKey=${apiy}`)
			  buff = await getBuffer(anu.data.result)
			  client.sendMessage(from, buff, image, {quoted: mek})
			break
		      case 'happymod':
		      if (!isOo) return reply(mess.only.user)
		      if (args.length < 1) return reply(`*Mod Apa Yang mau Um Cari?*`)
		      reply(mess.wait)
		      anu = await fetchJson(`https://tobz-api.herokuapp.com/api/happymod?q=${body.slice(7)}&apikey=${tobxapi}`, {method: 'get'})
		      buffter = await getBuffer(anu.result.image)
		      teks = `*➥NAME*:${anu.result.title}\n*➥PRICE*:${anu.price}\n*➥PURCHASE*:${anu.purchase}\n*➥${anu.root}*\n*➥SIZE*:${anu.size}\n*➥VERSION*:${anu.version}\n\n\n\n*➥Link*:${anu.download}`
		      client.sendMessage(from, buffter, image, {quoted: mek, caption: teks})
		      reply(teks)
		      break 
			  case 'chord':
			  if (!isOo) return reply(mess.only.user)
			  if (args.length < 1) return reply(`*[❗] Om Nayari Lagu apa????*`)
			  reply(mess.wait)
			  anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/chord?q=${body.slice(7)}`, {method: 'get'})
		      buff = await getBuffer(anu.result)
			  teks = `_Wah Lagu Nya Jelek Loh_\n\n\n\n${anu.result}`
			  reply(teks)
			  break  
			  if (!isOo) return reply(mess.only.user)
			  case 'spamcall'://jangan di ubah
              if (args.length < 1) return reply(`[❗] Maaf Nomor nya mana??`)
              reply(mess.wait)
              anu = await fetchJson(`https://tobz-api.herokuapp.com/api/spamcall?no=${body.slice(9)}&apikey=${tobzapi}`, {method: 'get'})
              teks = `${anu.logs}`
              reply(teks)
              break 
              case 'randomnime':
              if (!isOo) return reply(mess.only.user)
              anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomanime?apikey=${tobzapi}`, {method: 'get'})
              buffer = await getBuffer(anu.result)
              client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ihhh wobu >//<'})
              break
              case 'jokerlogo':
              if (!isOo) return reply(mess.only.user)
              if (args.length < 1) return reply(`*[❗] Text Tidak ada Tolong Masukan Paramenter ^_^*`)
              reply(mess.wait)
              anu = await fetchJson(`https://tobz-api.herokuapp.com/api/textpro?theme=jokerlogo&text=${body.slice(9)}&apikey=Beli Work`)
              buty = await getBuffer(anu.result)
              client.sendMessage(from, buty, image, {quoted: mek, caption: '✨Jadi'})
              if (anu.error) return reply(anu.error)
              break        
              case 'csgologo':
              if (!isOo) return reply(mess.only.user)
              if (args.length < 1) return reply(`[❗] Text Tidak Ada Tolong Masukan Parameter ^_^*`)
              reply(mess.wait)
              conn = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=csgo&text=${body.slice(9)}&apikey=${tobzapi}`)
              str = await getBuffer(conn.result)
              client.sendMessage(from, str, image, {quoted: mek, caption: 'Mabar Om'})
              break 
              case 'kpop':
              if (!isOo) return reply(mess.only.user)
              anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomkpop?apikey=${tobzapi}`, {method: 'get'})
              buffte = await getBuffer(anu.result)
              client.sendMessage(from, buffte, image, {quoted: mek, caption: 'Ih gay'})
              break 
              case 'randomhentai':
              if (!isOo) return reply(mess.only.user)
              if (!isNsfw) return reply(`*[❗] Nsfw Non Aktif !*`)
              anu = await fetchJson(`https://tobz-api.herokuapp.com/api/hentai?apikey=${tobzapi}`, {method: 'get'})
              tobat = await getBuffer(anu.result)
              client.sendMessage(from, tobat, image, {quoted: mek, caption: '*Tobat Bodo*'})
                break 
                case 'nsfw':
                    if (!isOo) return reply(mess.only.user)
					if (!isGroup) return reply(ind.groupo())
					if (!isGroupAdmins) return reply(ind.admin())
					if (args.length < 1) return reply('Boo :𝘃')
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply(' *sudah aktif*  !!')
						nsfw.push(from)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('❬ 𝗦𝗨𝗞𝗦𝗘𝗦 ❭ 𝗠𝗲𝗻𝗴𝗮𝗸𝘁𝗶𝗳𝗸𝗮𝗻 𝗳𝗶𝘁𝘂𝗿 𝗻𝘀𝗳𝘄 𝗱𝗶 𝗴𝗿𝗼𝘂𝗽 𝗶𝗻𝗶')
					} else if (Number(args[0]) === 0) {
						nsfw.splice(from, 1)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('❬ 𝗦𝗨𝗞𝗦𝗘𝗦 ❭ 𝗠𝗲𝗻𝗼𝗻𝗮𝗸𝘁𝗶𝗳𝗸𝗮𝗻 𝗳𝗶𝘁𝘂𝗿 𝗻𝘀𝗳𝘄 𝗱𝗶 𝗴𝗿𝗼𝘂𝗽 𝗶𝗻𝗶️')
					} else {
						reply(' *Ketik perintah 1 untuk mengaktifkan, 0 untuk menonaktifkan* \n𝗰𝗼𝗻𝘁𝗼𝗵: 𝗻𝘀𝗳𝘄 𝟭')
					}
					break
			    case 'stalkig'://jangan di ubah
                if (!isOo) return reply(mess.only.user)
                if (args.length < 1) return reply(`_[❗] Usernama Nya Mana Um???_`)
                reply(mess.wait)
                anu = await fetchJson(`https://mhankbarbar.tech/api/stalk?username=${body.slice(7)}&apiKey=${mhankaipi}`, {method: 'get'})
                buffir = await getBuffer(anu.Profile_pic)
                client.sendMessage(from, buffir, image, {quoted: mek, caption: reply})
                reply = `*username:${anu.Name}\nfollower:${anu.Jumlah_Followers}\nfollowing:${anu.Jumlah_Following}\n*JumlauPostingan*:${anu.Jumlah_Post}`
                break
                case 'coolmoji':
                    const bis =[`𒀱`,`𐂡`,`° ᭄`,`🦅`,`🌸`]
                    const bes = bis[Math.floor(Math.random() * bis.length)]
                    client.sendMessage(from, '_NIH_\n'+ bes, text, { quoted: mek })
                   break 
               case 'joox':
               reply(mess.wait)
               if (!isOo) return reply(mess.only.user)
				if (args.length < 1) return reply('Nama lagunya apa kak?')
                    anu = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${body.slice(7)}&apikey=${tobzapi}`, {method: 'get'})
                    buffter = await getBuffer(anu.result.thumb)
                    teks = `*➥ALBUM*:${anu.result.album}\n*➥UPLOAD*:${anu.result.dipublikasi}\n*➥JUDUL*:${anu.result.judul}\n\n\n Sedang Mendownload Lagu`
                    client.sendMessage(from, buffter, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result.mp3)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', quoted: mek})
					break
				 case 'lirik':
				 if (!isOo) return reply(mess.only.user)
			     if (args.length < 1) return reply(`❎Text Nya Mana Om❎`)
			     sus = body.slice(7)
			     reply(mess.wait)
			     anu = await fetchJson(`https://tobz-api.herokuapp.com/api/lirik?q=${sus}&apikey=${tobzapi}`, {method: 'get'})
			     teks = `${anu.result.lirik}`
			     reply(teks)
			     break
                 case 'bisakah':
					bisakah = body.slice(1)
					if (!isOo) return reply(mess.only.user)
					const bisa =['Bisa','Tidak Bisa','Coba Ulangi']
					const keh = bisa[Math.floor(Math.random() * bisa.length)]
					client.sendMessage(from, 'Pertanyaan : *'+bisakah+'*\n\nJawaban : '+ keh, text, { quoted: mek })
					break
                case 'vipmenu':
                 if (!isVip) return reply(`*[❗] Fitur Ini Hanya Untuk User Premium*`)
                 if (!isOo) return reply(mess.only.user)
                 client.sendMessage(from, vip(prefix), text, {quoted: mek})
                 break
				case 'kapankah':
				   if (!isOo) return reply(mess.only.user)
					kapankah = body.slice(1)
					const kapan =['Besok','Lusa','Tadi','4 Hari Lagi','5 Hari Lagi','6 Hari Lagi','1 Minggu Lagi','2 Minggu Lagi','3 Minggu Lagi','1 Bulan Lagi','2 Bulan Lagi','3 Bulan Lagi','4 Bulan Lagi','5 Bulan Lagi','6 Bulan Lagi','1 Tahun Lagi','2 Tahun Lagi','3 Tahun Lagi','4 Tahun Lagi','5 Tahun Lagi','6 Tahun Lagi','1 Abad lagi','3 Hari Lagi']
					const koh = kapan[Math.floor(Math.random() * kapan.length)]
					client.sendMessage(from, 'Pertanyaan : *'+kapankah+'*\n\nJawaban : '+ koh, text, { quoted: mek })
					break
           case 'apakah':
           if (!isOo) return reply(mess.only.user)
					apakah = body.slice(1)
					const apa =['Iya','Tidak','Bisa Jadi','Coba Ulangi']
					const kah = apa[Math.floor(Math.random() * apa.length)]
					client.sendMessage(from, 'Pertanyaan : *'+apakah+'*\n\nJawaban : '+ kah, text, { quoted: mek })
					break
				case 'rate':
					rate = body.slice(1)
					if (!isOo) return reply(mess.only.user)
					const ra =['4','9','17','28','34','48','59','62','74','83','97','100','29','94','75','82','41','39']
					const te = ra[Math.floor(Math.random() * ra.length)]
					client.sendMessage(from, 'Pertanyaan : *'+rate+'*\n\nJawaban : '+ te+'%', text, { quoted: mek })
					break
                case 'random':
                  radom = body.slice(1)
                  if (!isOo) return reply(mess.only.user)
                  const re =['apa anjim','apa lu','anjim lu']
                  const tp = re[Math.floor(Math.random() * re.length)]
                  client.sendMessage(from, '+ tp' , text, {quoted: mek})
                  break
                   if (text.includes('P')){
                  client.sendMessage(id, 'Sama sama, semoga harimu menyenangkan :)' ,MessageType.text, {quoted: mek});
                   }
                case 'donasi':
                case 'donate':
                   if (!isOo) return reply(mess.only.user)
                   client.sendMessage(from, donasi(prefix), text)
                   break
                case 'ttp': 
                    if (!isOo) return reply(mess.only.user)
					if (args.length < 1) return reply('Textnya mana um?')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					ttp = body.slice(5).trim()
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/text2image?text=${ttp}&apiKey=${mhankaipi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						buff = fs.readFileSync(rano)
						client.sendMessage(from, buff, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break
                case 'gay':  
                    if (!isOo) return reply(mess.only.user)
					gatauda = body.slice(11)
					anu = await fetchJson(`https://arugaz.herokuapp.com/api/howbucins`, {method: 'get'})
					reply(anu.desc+anu.persen)
					break
                case 'tiktokdown':
                if(!isVip) return reply(bar2.vip)
                if (!isOo) return reply(mess.only.user)
                reply(mess.wait)
                anu = await fetchJson(`https://cuans-api.herokuapp.com/api/tiktok?URL=${body.slice(7)}`)
                bufft = await getBuffer(anu.image)
                teks = `_JUDUL_:${anu.textInfo}\n_PROFILE_${anu.nameInfo}\n_UPLOAD_:${anu.timeInfo}\n\n\n_Sedang Mendownload_`
                bufvid = await getBuffer(anu.mp4direct)
                client.sendMessage(from, bufvid, video, {quoted: mek})
                client.sendMessage(from, bufft, image, {quoted: mek, caption: teks})
                break
				case 'blocklist': 
				    if (!isOo) return reply(mess.only.user)
					teks = 'This is list of blocked number :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
				case 'ocr':
				    if (!isOo) return reply(mess.only.user)
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Foto aja mas')
					}
					break
                    case 'ytmp4': 
                    if (!isOo) return reply(mess.only.user)
					if (args.length < 1) return reply('❎Url Tidak Di Temukan❎')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/ytv2?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					break 
					case 'artinama':
					if (!isOo) return reply(mess.only.user)
					arti = body.slice(8)
					if (args.length < 1) return reply(`[❗] Text Nya Mana Om???`)
					anu = await fetchJson(`http://api-melodicxt.herokuapp.com/api/primbon-arti-nama?name=${arti}&apiKey=administrator${apiy}`, {method: 'get'})
					teks = `*➸NAMA*:${arti}\n*➸ARTI*:${anu.result}`
					reply(teks)
					break 
					case 'artimimpi':
					if (!isOo) return reply(mess.only.user)
					artis = body.slice(11)
					if (args.length < 1) return reply(`[❗] Text Nya mana Om`)
					anu = await fetchJson(`http://api-melodicxt.herokuapp.com/api/primbon-arti-mimpi?query=${artis}&apiKey=${apiy}`, {method: 'get'})
					teks = `*➥MIMPI*:${artis}\n*➥ARTI*:${anu.result}`
					reply(teks)
					break 
					case 'tiktokinfo':
					if (!isOo) return reply(mess.only.user)
					reply(mess.wait)
					surat = body.slice(11)
					if (args.length < 1) return reply(`Maaf Text Nya mana???`)
					anup = await fetchJson (`http://api-melodicxt.herokuapp.com/api/tikok/profile?user=${surat}&apiKey=${apiy}`, {method: 'get'})
					buffter = await getBuffer(anup.avatarThumb)
					teks = `*❥NICK*:${anup.infoUser.data.nickname}\n*❥FOLLOWER*:${anup.followerCount}\n*❥FOLLOWING*:${anup.followingCount}\n*❥VIDEO*:${anup.videoCount}`
					client.sendMessage(from, buffter, image, {quoted: mek, caption: teks})
					reply(teks)
					break
                    case 'text3d':
                     if (!isOo) return reply(mess.only.user)
                      if (!isVip) return reply(`_Wkwkwkwkw Mana Bisa Om_`)
              	    if (args.length < 1) return reply('teksnya mana kak?')
                    teks = `${body.slice(8)}`
                    if (teks.length > 10) return client.sendMessage(from, 'Teksnya kepanjangan, Maksimal 10 kalimat', text, {quoted: mek})
                    buff = await getBuffer(`https://docs-jojo.herokuapp.com/api/text3d?text=${teks}`, {method: 'get'})
                    client.sendMessage(from, buff, image, {quoted: mek, caption: `${teks}`})
			     	break
                case 'shorturl':
                    if (!isOo) return reply(mess.only.user)
                    anu = await fetchJson(`https://tobz-api.herokuapp.com/api/shorturl?url=${body.slice(10)}`)
			        hasil = `${anu.result}`
			        reply(hasil)
			        break
			    case 'fototiktok':
			         if (!isOo) return reply(mess.only.user)
                    gatauda = body.slice(12)
                    anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${body.slice(8)}`)
			        buff = await getBuffer(anu.result.result)
                    reply(anu.result)
			        break
                     case 'setpp': 
                        if (!isOo) return reply(mess.only.user)
                        if (!isGroup) return reply(mess.only.group)
                       if (!isGroupAdmins) return reply(mess.only.admin)
                        if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                       media = await client.downloadAndSaveMediaMessage(mek)
                         await client.updateProfilePicture (from, media)
                        reply('✔️Suksesk Kak Menganti Nya ^_^')
                    break		
                    case 'grup':
					case 'pintu': 
					if (!isOo) return reply(mess.only.user)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args[0] === 'buka') {
					    reply(`✔️Berhasi Membuka Grup Kak✔️`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
						reply(`✔️Berhasi Tutup Grup Kak ^_^✔️`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break				
					case 'setname':
					if (!isOo) return reply(mess.only.user)
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                client.groupUpdateSubject(from, `${body.slice(9)}`)
                client.sendMessage(from, 'Succes, Ganti Nama Grup', text, {quoted: mek})
                break
                case 'setdesc':
                if (!isOo) return reply(mess.only.user)
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                client.groupUpdateDescription(from, `${body.slice(9)}`)
                client.sendMessage(from, 'Succes, Ganti Deskripsi Grup', text, {quoted: mek})
                break
                    case 'client':
                    teks = `Command Yang Benar Adala {prefix}listclient*`
                    reply('*[⏳] Wait Tunggu 1+ menit*')
                    reply (err.message())
                   break
				case 'sticker':
					case 'stiker':
					case 's':
					 if (!isOo) return reply(mess.only.user)
					 if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'Your-ApiKey'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								client.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
							})
						})
					/*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.on('start', function (cmd) {
								console.log('Started :', cmd)
							})
							.on('error', function (err) {
								fs.unlinkSync(media)
								console.log('Error :', err)
							})
							.on('end', function () {
								console.log('Finish')
								fs.unlinkSync(media)
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)*/
					} else {
						reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
					}
					break
                case 'report': 
                     if (!isOo) return reply(mess.only.user)
                     const pesan = body.slice(8)
                      if (pesan.length > 300) return client.sendMessage(from, 'Maaf Teks Terlalu Panjang, Maksimal 300 Teks', msgType.text, {quoted: mek})
                        var nomor = mek.participant
                       const teks1 = `*[REPORT]*\nNomor : @${nomor.split("@s.whatsapp.net")[0]}\nPesan : ${pesan}`

                      var options = {
                         text: teks1,
                         contextInfo: {mentionedJid: [nomor]},
                     }
                    client.sendMessage('6281539336834@s.whatsapp.net', options, text, {quoted: mek})
                    reply('Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.')
                    break  
                    case 'emasbutton':
                    if (!isOo) return reply(mess.only.user)
                    if (args.length < 1) return reply(`text nya mana om`)
                    reply(`[❗] Bot Sedang Menjiplak Button`)
                    anu = await fetchJson(`https://api.zeks.xyz/api/gplaybutton?text=${body.slice(10)}&apikey=${apiy}`, {method: 'get'})
                    buffer = await getBuffer(anu.result)
                    client.sendMessage(from, buffer, image, {quoted: mek, caption: 'nih'})
                    break
                  case 'silverbutton':
                  if (!isOo) return reply(mess.only.user)
                  if (args.length < 1) return reply(`Text Nya mana Um`)
                  reply(`[❗] Bot Sedang Menjiplak Button`)
                  anu = await fetchJson(`https://api.zeks.xyz/api/splaybutton?text=${body.slice(13)}&apikey=${apiy}`, {method: 'get'})
                  buffer = await getBuffer(anu.result)
                  client.sendMessage(from, buffer, image, {quoted: mek, caption: 'nih'})
                  break 
                  case 'nickff':
                  if (!isOo) return reply(mess.only.user)
                  reply(mess.wait)
                  anu = await fetchJson(`https://api.zeks.xyz/api/nickepep?apikey=${apiy}`)
                  reply(anu.result)
                  break
                  case 'covid':
                  if (!isOo) return reply(mess.only.user)
				   if (args.length < 1) return reply(`_Text nya Mana Om_`)
                   client.updatePresence(from, Presence.composing) 
                   data = await fetchJson(`https://arugaz.herokuapp.com/api/corona?country=${body.slice(7)}`)
                   if (data.result) reply(data.result)
                   hasil = `Negara : ${data.result.country}\n\nActive : ${data.result.active}\ncasesPerOneMillion : ${data.result.casesPerOneMillion}\ncritical : ${data.result.critical}\ndeathsPerOneMillion : ${data.result.deathsPerOneMillion}\nrecovered : ${data.result.recovered}\ntestPerOneMillion : ${data.result.testPerOneMillion}\ntodayCases : ${data.result.todayCases}\ntodayDeath : ${data.result.todayDeath}\ntotalCases : ${data.result.totalCases}\ntotalTest : ${data.result.totalTest}`
                   reply(hasil)
                   break        
                case 'tomp3':                 
                if (!isOo) return reply(mess.only.user)
                client.updatePresence(from, Presence.composing) 
				if (!isQuotedVideo) return reply('❌ reply videonya um ❌')
				reply(mess.wait)
			    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
				media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Gagal, pada saat mengkonversi video ke mp3 ❌')
						bufferlkj = fs.readFileSync(ran)
						client.sendMessage(from, bufferlkj, audio, {mimetype: 'audio/mp4', quoted: mek})
						fs.unlinkSync(ran)
					})
					break
                case 'ytmp3':
                if (!isOo) return reply(mess.only.user)
                    yt = body.slice(9)
                    if (!isVip)return reply(mess.only.bar2.vip)
					if (args.length < 1) return reply('Urlnya mana um?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://cuans-api.herokuapp.com/api/ytmus?URL=`+ yt)
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Filesize* : ${anu.filesize}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp3', filename: `${anu.title}.mp3`, quoted: mek})
					break
				case 'tts':
				case 'gtts':
				if (!isOo) return reply(mess.only.user)
					if (args.length < 1) return client.sendMessage(from, 'Kode bahasanya mana om?', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, 'Textnya mana om', text, {quoted: mek})
					dtt = body.slice(7)
					ranm = getRandom('.mp3')
					dtt.length > 600
					? reply('Textnya kebanyakan om')
					: gtts.save(ranm, dtt, function() {
						client.sendMessage(from, fs.readFileSync(ranm), audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
						fs.unlinkSync(ranm)
					})
					break
				case 'meme':
				if (!isOo) return reply(mess.only.user)
					meme = await kagApi.memes()
					buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break
				case 'memeindo':
				if (!isOo) return reply(mess.only.user)
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://imgur.com/${memein.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break 
			   case 'quran':
			if (!isOo) return reply(mess.only.user)
			   if (args.length < 1) return reply(`[❗] Text Nya mana Om???`)
			   reply(mess.wait)
			   buff = await getBuffer(anu.link)
			   anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/alkitabsearch?q=${body.slice(7)}`, {method: 'get'})
			   teks = `*➸AYAT*:${anu.ayat}\n*➸DESC*:${anu.isi}`
			   client.sendMessage(from, buff, audio, {mimetype: 'audio/mp4', quoted: mek, caption: teks})
			   break 
			    case 'katabaik':
			if (!isOo) return reply(mess.only.user)
			    reply(mess.wait)
			    anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/renungan`, {method: 'get'})
			    wib = `*➸JUDUL*:${anu.judul}\n*➸ISI*:${anu.Isi}\n\n\n\n*➸PELAJARAN*:${anu.pesan}\n\n*[MADE BY ARUGAZ]*`
			    reply(wib)
			    break 
			    case 'jadwaltv':
			    if (!isOo) return reply(mess.only.user)
                reply(mess.wait)
                anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/jadwaltv?ch=${body.slice(7)}`, {method: 'get'})
                buff = await getBuffer(anu.result)
                teks = `*➸Channel:${body.slice(9)}*\n\n\n*➸JADWAL*:${anu.result}`
                reply(teks)
                break
               //wibu
               case 'waifu':
               reply('_bot lagi nyarih nih_')
               if (!isOo) return reply(mess.only.user)
               lol = await fetchJson(`https://docs-jojo.herokuapp.com/api/waifu2`, {method: 'get'})
               buff = await getBuffer(lol.img)
               client.sendMessage(from, buff, image, {quoted: mek, caption: 'ihh wibu'})
               break 
               case 'thunder':
               if (!isOo) return reply(mess.only.user)
                anu = body.slice(7)
                if (anu.length > 30) return reply('_text nya kepanjangan om_')
                if (args.length < 1) return reply(`_text nya mana kak_`)
                reply('_Bot Lagi Ngetik Nih_')
                 anu = await getBuffer(`https://arugaz.my.id/api/textpro/thundertext?text=`+ anu)
                 client.sendMessage(from, anu, image, {quoted: mek, caption: '_jadi on_'})
                 break
                 case 'blooadtext':
                 if (!isOo) return reply(mess.only.user)
                  ank = body.slice(7)
                  reply(mess.wait)
                   if (args.length < 30) return reply(`_text nya mana kak?_`)
                   if(ank.length > 10) return reply(`_maaf kak text nya kepanajang ):`)
                    anu = await getBuffer(`https://arugaz.my.id/api/textpro/bloodtext?text=`+ ank)
                    client.sendMessage(from, anu, image, {quoted: mek, caption: '❗'})
                    break 
                    case 'watertext':
                    if (!isOo) return reply(mess.only.user)
                     yu = body.slice(7)
                     reply(mess.wait)
                      if(args.length < 1) return reply(`_Text Nya Mana Kak???_`)
                      if(yu.length > 30) return reply(`_Text Nya Ke banyakan Kak :>_`)
                      anu = await getBuffer(`https://arugaz.my.id/api/textpro/dropwater?text=`+ yu)
                       client.sendMessage(from, anu, image, {quoted: mek, caption: '👍'})
                       break 
                       case 'bluetext':
                       if (!isOo) return reply(mess.only.user)
                        hg = body.slice(7)
                        reply(mess.wait)
                         if(args.length < 1) return reply(`_Text Nya Mana Kak_`)
                         if(hg.length > 30) return reply(`_kepanjangan kak :<_`)
                          bagus = await getBuffer(`https://arugaz.my.id/api/flamingtext/smurf?text=`+ hg)
                           client.sendMessage(from, bagus, image)
                           break
               case 'neko':
               if (!isOo) return reply(mess.only.user)
                  anu = await getBuffer(`https://docs-jojo.herokuapp.com/api/nekonime`, {method: 'get'})
                  client.sendMessage(from, anu, image, {quoted: mek, caption: '✔️'})
                  break
               case 'infonom':
               if (!isOo) return reply(mess.only.user)
                tu = body.slice(1)
                 anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/infonomor?no=`+ tu)
                  reply(anu.nomor+anu.op+anu.international)
                  break  
                    case 'quotes':
                    if (!isOo) return reply(mess.only.user)
					quotedz = await fetchJson(`https://docs-jojo.herokuapp.com/api/randomquotes`, {method: 'get'})
					if (quotedz.error) return reply(quotedz.error)
					buffer = await getBuffer(quotedz.data)
					buffer = await getBuffer(quotedz.author)
					reply(quotedz.author+quotedz.quotes)
					break
                  case 'husbu':
                  if (!isOo) return reply(mess.only.user)
                   anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/husbuando`, {method: 'get'})
                   supr = await getBuffer(anu.img)
                   client.sendMessage(from, supr, image, {quoted: mek, caption: 'teks'})
                   break
               case 'pornhub':
               if (!isOo) return reply(mess.only.user)
                bal = body.slice(8)
                reply(mess.wait)
                anu = await getBuffer(`https://docs-jojo.herokuapp.com/api/phblogo?text2=PornHub&text1=`+ bal)
                client.sendMessage(from, anu, image, {quoted: mek, caption: '✔️'})
                break
				case 'setprefix':
				if (!isOo) return reply(mess.only.user)
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`Prefix berhasil di ubah menjadi : ${prefix}`)
					break
                    case 'loli':
                    if (!isOo) return reply(mess.only.user)
                    anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomloli?apikey=${tobzapi}`, {method: 'get'})
                    butt = await getBuffer(anu.result)
                    client.sendMessage(from, butt, image, {quoted: mek, caption: 'Nih loli'})
				    break 
				case 'neko':
				if (!isOo) return reply(mess.only.user)
				anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nekonime?apikey=${tobzapi}`, {method: 'get'})
				bupp = await getBuffer(anu.result)
				client.sendMessage(from, bupp, image, {quoted: mek, caption: 'Nih Neko'})
				break 
				case 'husbu':
				if (!isOo) return reply(mess.only.user)
				anu = await fetchJson(`https://tobz-api.herokuapp.com/api/husbu?apikey=${tobzapi}`, {method: 'get'})
				bupp = await getBuffer(anu.result.image)
				teks = `*➥NAMA*:${anu.result.name}`
				client.sendMessage(from, bupp, image, {quoted: mek, caption: teks})
				break
				case 'hilih':
				if (!isOo) return reply(mess.only.user)
					if (args.length < 1) return reply('Teksnya mana um?')
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/hilih?teks=${body.slice(7)}`, {method: 'get'})
					reply(anu.result)
					break 
			    case 'waifu1':
			if (!isOo) return reply(mess.only.user)
			    anu = await fetchJson(`https://tobz-api.herokuapp.com/api/waifu?apikey=${tobzapi}`, {method: 'get'})
			    bupp = await getBuffer(anu.result.image)
			    teks = `*➥DESC*:${anu.result.desc}\n*➥NAMA*:${anu.result.name}\n\n\nIhh Wibu`
			    client.sendMessage(from, bupp, image, {quoted: mek, caption: teks})
			    break
				case 'yt2mp3':
				if (!isOo) return reply(mess.only.user)
					if (args.length < 1) return reply('Urlnya mana um?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/yta?url=${args[0]}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Filesize* : ${anu.filesize}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
					break
				case 'bacot':
				if (!isOo) return reply(mess.only.user)
				anu = await fetchJson(`https://thicc.mywaifulist.moe/waifus/7434/0959dcf698dd95694dbc67245600d87964c6d9e3e4ea54c951c59996c9f5ea4d_thumb.png`)
				buffer = await getBuffer(anu.result)
				client.sendMessage(from, buffer, image, {quoted: m})
				reply(anu.result)
				break
				case 'tiktok':
				if (!isOo) return reply(mess.only.user)
					if (args.length < 1) return reply('Urlnya mana um?')
					if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/tiktok?url=${args[0]}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {quoted: mek})
					break
                    case 'infogc':
                    if (!isOo) return reply(mess.only.user)
				client.updatePresence(from, Presence.composing)
				if (!isGroup) return reply(mess.only.group)
					try {
					ppimg = await client.getProfilePicture(from)
				} catch {
					ppimg = 'https://i.ibb.co/NthF8ds/IMG-20201223-WA0740.jpg'
				}
					let buf = await getBuffer(ppimg)
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `*Nama grup :* ${groupName}\n*Deskripsi :* ${groupDesc}\n*Jumlah Admin :* ${groupAdmins.length}\n*Jumlah Member :* ${groupMembers.length}`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}]`
					}
					client.sendMessage(from, buf, image, {quoted: mek, caption: teks})
					break
				case 'tiktokstalk':
				if (!isOo) return reply(mess.only.user)
					try {
						if (args.length < 1) return client.sendMessage(from, 'Usernamenya mana um?', text, {quoted: mek})
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `*ID* : ${user.id}\n*Username* : ${user.uniqueId}\n*Nickname* : ${user.nickname}\n*Followers* : ${stats.followerCount}\n*Followings* : ${stats.followingCount}\n*Posts* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
						buffer = await getBuffer(user.avatarLarger)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('Kemungkinan username tidak valid')
					}
					break
                case 'getses':
                if (!isOo) return reply(mess.only.user)
                    if (!isOwner) return reply(from, 'Perintah ini hanya untuk Owner bot', id)
                    const sesPic = await client.getScrenShot()
                    client.sendFile(from, sesPic, 'session.png', 'Neh...', id)
                    break
                  case 'speed':
                  if (!isOo) return reply(mess.only.user)
                    const timestamp = speed();
                    const latensi = speed() - timestamp
                    client.sendMessage(from, `Speed: ${latensi.toFixed(4)} _Second_`, text, { quoted: mek})
                    break
				case 'nulis':
				if (!isOo) return reply(mess.only.user)
				 reply('_BOT lagi Negtik Nich_')
				 gaming = body.slice(6)
				 gph1 = gaming.split("|")[0];
				 gph2 = gaming.split("|")[1];
				 gph3 = gaming.split("|")[2];
				 anu = await getBuffer(`https://api.zeks.xyz/api/magernulis?nama=${gph1}&kelas=${gph2}&text=${gph3}`, {method: 'get'})
				 client.sendMessage(from, anu, image, {quoted: mek, caption: 'Jadi nich'})
				break
                case 'githubprofile':
                if (!isOo) return reply(mess.only.user)
                 reply(mess.wait)
                  ims = await fetchJson(`https://tobz-api.herokuapp.com/api/githubprofile?username=${body.slice(7)}&apikey=${tobzapi}`, {method: 'get'})
                  buff = await getBuffer(ims.result.avatar)
                  client.sendMessage(from, buff, image, {quoted: mek, caption: teks})
                  teks = `*->Username*:${ims.result.username}\n*->Biography*:${ims.result.biography}\n*->Follow*:${ims.result.followings}\n*->Follower*:${ims.result.follower}`
                  reply(teks)
                  break
                case 'bitly':
                reply(mess.wait)
                if (!isOo) return reply(mess.only.user)
                anu = await fetchJson(`https://tobz-api.herokuapp.com/api/bitly?url=${body.slice(7)}&apikey=${tobzapi}`, {method: 'get'})
                reply(anu.result)
                break
                case 'pubglogo':
                 reply(mess.wait)
                 if (!isOo) return reply(mess.only.user)
                 anu = await fetchJson(`https://tobz-api.herokuapp.com/api/photooxy?theme=pubg&text1=${body.slice(9)}&text2=ByArugaz&apikey=${tobzapi}`)
                 buff = await getBuffer(anu.result)
                 client.sendMessage(from, buff, image, {quoted: mek, caption: '*Api Key From Tobz*'})
                 break 
                case 'mod':
                if (!isOo) return reply(mess.only.user)
                 reply(mess.wait)
                 anu = await fetchJson(`https://tobz-api.herokuapp.com/api/moddroid?q=${body.slice(7)}&apikey=${tobazapi}`, {method: 'get'})
                 teks = `*TiITLE*:${anu.title}\n*GENRE*:${anu.genre}\n*VERSION*:${anu.latest_version}\n*SIZE*:${anu.size}\n*PUBLISHED*:${anu.publisher}\n\n\n\n*LINK*:${anu.download}`
                 reply(teks)
				case 'url2img':
				if (!isOo) return reply(mess.only.user)
					tipelist = ['desktop','tablet','mobile']
					if (args.length < 1) return reply('Tipenya apa um?')
					if (!tipelist.includes(args[0])) return reply('Tipe desktop|tablet|mobile')
					if (args.length < 2) return reply('Urlnya mana um?')
					if (!isUrl(args[1])) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/url2image?tipe=${args[0]}&url=${args[1]}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buff = await getBuffer(anu.result)
					client.sendMessage(from, buff, image, {quoted: mek})
					break
				case 'tstiker':
				case 'tsticker':
				if (!isOo) return reply(mess.only.user)
					if (args.length < 1) return reply('Textnya mana um?')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = body.slice(9).trim()
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/text2image?text=${teks}&apiKey=${mhankaipi}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						client.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break 
					case 'susu':
					if (!isOo) return reply(mess.only.user)
					if (!isNsfw) return reply(`[❎] Nsfw Belum Di Hidupin Kan`)
					res = await fetchJson(`https://nekos.life/api/v2/img/boobs`, {method: 'get'})
						buffermm = await getBuffer(res.result)
						client.sendMessage(from, buffermm, image, {quoted: mek, caption: 'ni anjim'})
					break
                    case 'simi':
                    if (!isOo) return reply(mess.only.user)
                    if (args.length < 1) return reply(`Text Nya mana Um???`)
                    anu = await fetchJson(`https://mhankbarbar.tech/api/samisami?text=${body.slice(7)}`)
                    reply(anu.result)
                    break 
                    case 'urlimg'://url mana
                    if (!isOo) return reply(mess.only.user)
                    reply(mess.wait)
                    anu = await fetchJson(`https://mhankbarbar.tech/api/url2image?tipe=android&url=${body.slice(7)}&apiKey=${mhankaipi}`, {method: 'get'})
                    bc = await getBuffer(anu.result)
                    client.sendMessage(from, bc, image, {quoted: mek, caption: '⭐'})
                    break
                    case 'linkminecraft':
                    reply('*Ini Om Link Nya* https://www.mediafire.com/file/9mh4urow1vc4dt3/Minecraft_1.16.100.apk/file')
                    break
				case 'tagall':
				if (!isOo) return reply(mess.only.user)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `*#* @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
                                case 'tagall2':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					reply(teks)
					break
                                case 'tagall3':
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, teks, text, {detectLinks: false, quoted: mek})
					break
				case 'clearall':
				if (!isOo) return reply(mess.only.user)
					if (!isOwner) return reply('Kamu siapa?')
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply('Sukses delete all chat :)')
					break
				case 'bc':
				if (!isOo) return reply(mess.only.user)
					if (!isOwner) return reply('Kamu siapa?')
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `[ Ini Broadcast ]\n\n${body.slice(4)}`})
						}
						reply('Suksess broadcast')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[ Ini Broadcast ]\n\n${body.slice(4)}`)
						}
						reply('Suksess broadcast')
					}
					break
                                case 'promote':
                                if (!isOo) return reply(mess.only.user)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Berhasil Promote\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(from, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Berhasil Promote @${mentioned[0].split('@')[0]} Sebagai Admin Group!`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break
                case 'mapm':
                   if (args.length < 1) return reply('*Pilih Tepe Nya Kak* \n *->!redstone*\n*->!parkur*')
                   reply('Coming Soon')
                   break
				case 'demote':
				if (!isOo) return reply(mess.only.user)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Berhasil Demote\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Berhasil Demote @${mentioned[0].split('@')[0]} Menjadi Member Group!`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'add':
				if (!isOo) return reply(mess.only.user)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('Yang mau di add jin ya?')
					if (args[0].startsWith('08')) return reply('Gunakan kode negara mas')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Gagal menambahkan target, mungkin karena di private')
					}
					break
				case 'kick':
				if (!isOo) return reply(mess.only.user)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'Perintah di terima, mengeluarkan :\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`Perintah di terima, mengeluarkan : @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break 
				case 'listadmins':
				if (!isOo) return reply(mess.only.user)
					if (!isGroup) return reply(mess.only.group)
					teks = `List admin of group *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
                                case 'linkgroup':
                                if (!isOo) return reply(mess.only.user)
                                        if (!isGroup) return reply(mess.only.group)
                                        if (!isGroupAdmins) return reply(mess.only.admin)
                                        if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                                        linkgc = await client.groupInviteCode(from)
                                        reply('https://chat.whatsapp.com/'+linkgc)
                                        break
                                case 'leave':
                                if (!isOo) return reply(mess.only.user)
                                        if (!isGroup) return reply(mess.only.group)
                                        if (isGroupAdmins || isOwner) {
                                        	if (!isOwner) return reply(`[❗] Maaf Fitur Ini Hanya Untuk Owner`)
                                            client.groupLeave(from)
                                        } else {
                                            reply(mess.only.admin)
                                        }
                                        break
				case 'toimg':
				if (!isOo) return reply(mess.only.user)
					if (!isQuotedSticker) return reply('❌ reply stickernya um ❌')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Gagal, pada saat mengkonversi sticker ke gambar ❌')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '>//<'})
						fs.unlinkSync(ran)
					})
					break 
			    case 'trigger':
			   
				case 'simi':
				if (!isOo) return reply(mess.only.user)
					if (args.length < 1) return reply('Textnya mana um?')
					teks = body.slice(5)
					anu = await simih(teks) //fetchJson(`https://mhankbarbars.herokuapp.com/api/samisami?text=${teks}`, {method: 'get'})
					//if (anu.error) return reply('Simi ga tau kak')
					reply(anu)
					break
				case 'simih':
				if (!isOo) return reply(mess.only.user)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isSimi) return reply('Mode simi sudah aktif')
						samih.push(from)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('Sukses mengaktifkan mode simi di group ini ✔️')
					} else if (Number(args[0]) === 0) {
						samih.splice(from, 1)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('Sukes menonaktifkan mode simi di group ini ✔️')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
					break
                case 'img':
                if (Number(args[1]) === 0) {
                } else if (Number(args[0]) === 0) {
                	buffer = await getBuffer('https://c4.wallpaperflare.com/wallpaper/976/117/318/anime-girls-404-not-found-glowing-eyes-girls-frontline-wallpaper-preview.jpg')
                	client.sendMessage(from, buffer, image, {quoted: mek, caption: '._.'})
                if (err) return reply('mess.err')
                } else {
                	reply(' Text Nya Mana Um???')
                }
                break
                case 'grass':
                	if (!isGroup) return reply('❎maaf bro kamh bukan di grup❎')
                    if (args.length < 1) return reply(' Text Nya mana Um???')
                    reply('Hmmm ._.')
                    
                break
                case 'toxic':
                if (!isOo) return reply(mess.only.user)
                teet = body.slice(7)
                reply(mess.wait)
                buffer = await getBuffer('https://arugaz.my.id/api/textpro/toxictext?text='+ teet)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: 'ini'})
                break 
                case 'wolflogo':
                if (!isOo) return reply(mess.only.user)
                 tyx = body.slice(7)
                 reply(`_[❗] Wait Searching_`)
                 if(args.length < 1) return reply(mess.eror)
                 if(tyx.length > 23) return reply(`_Text Nya Kepanjangan Om_`)
                  anu = await getBuffer(`https://docs-jojo.herokuapp.com/api/wolf?text2=BY_FROZEBOT&text1`+ tyx)
                  client.sendMessage(from, anu, image, {quoted: mek, caption: '😂'})
                  break 
                case 'play': 
                if (!isOo) return reply(mess.only.user)
                reply(mess.wait)
                if (!isVip) return reply(`[❗] Maaf Peritah Ini Hanya Untuk User Premium!!`)
                play = body.slice(5)
                anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=Beli`)
                if (anu.error) return reply(anu.error)
                 infomp3 = `*Lagu Ditemukan!!!*\nJudul : ${anu.result.title}\nSource : ${anu.result.source}\nUkuran : ${anu.result.size}\n\n*TUNGGU SEBENTAR LAGI DIKIRIM MOHON JANGAN SPAM YA SAYANG*`
                buffer = await getBuffer(anu.result.thumbnail)
                lagu = await getBuffer(anu.result.url_audio)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
                break 
                case 'rip':
                if (!isOo) return reply(mess.only.user)
                reply(mess.wait)
                anu = await getBuffer(`https://api.zeks.xyz/api/rip?apikey=Beli&img=${body.slice(4)}`)
                client.sendMessage(from, anu, image, {quoted: mek, caption: 'nih'})
                break
                case 'surah':
                if (!isOo) return reply(mess.only.user)
                anu = await fetchJson(`https://api.zeks.xyz/api/randomquran`, {method: 'get'})
                buffter = await getBuffer(anu.result.audio)
                teks = `*➥ARTI*:${anu.result.arti}\n*➥AYAT*:${anu.result.ayat}\n*➥KETERANGAN*:${anu.result.keterangan}`
                client.sendMessage(from, buffter, audio, {mimetype: 'audio/mp4', quoted: mek})
                reply(teks)
                break
                 case 'katacinta':
                 if (!isOo) return reply(mess.only.user)
                 anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/katacinta`, {method: 'get'})
                 reply(anu.result)
                 break
                case 'infohoax':
                if (!isOo) return reply(mess.only.user)
                reply(`_[❗] Wait Sedang Browsing_`)
                anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/infohoax`, {method: 'get'})
                anu2 = await getBuffer(anu.data.image)
                client.sendMessage(from, anu2, image, {quoted: mek, caption: teks})
                teks = `*JUDUL*:${anu.data.title}\n*KEPASTIAN*:${anu.result.tag}\n\n\n*FULL SOURCE*:${anu.result.link}`
                break 
                case 'ytserch':
                if (!isOo) return reply(mess.only.user)
                if (args.length < 1) return reply(`Maaf Kak Text Nya Mana??`)
                reply(mess.wait)
                anu = await fetchJson(`https://arugaz.my.id/api/media/ytsearch?query=${body.slice(9)}`)
                buffter = await getBuffer (anu.result.thumbnail)
                teks = `*➥NAMA*:${anu.result.title}\n*➥DURASI*:${anu.result.duration}\n*➥DESC*:${anu.snippet}\n*➥UPLOAD*'${anu.result.uploadDate}\n\n\n*➥URL*:${anu.result.url}\n\n\n Jika Ingin Menjadi Video Atau Video Silakan Pake fitur ytmp ^_^`
                client.sendMessage(from, buffter, image, {quoted: mek, caption: teks})
                break
                case 'coollogo':
                case 'glitchtext':
                if (!isOo) return reply(mess.only.user)
                op = body.slice(7)
                bsy = body.slice(7)
                 if(args.length < 1) return reply(`_Yang Mau Di Tulis Apaan Kak_`)
                 reply(`_[❗] Wait Sedang Di Proses_`)
                 fg = await getBuffer(`https://docs-jojo.herokuapp.com/api/ttlogo?text1=${bsy}&text2=`+ op)
                 client.sendMessage(from, fg, image, {quoted: mek, caption: 'Jadi Jir 😂'})
                 break
                case 'trsl':
                if (!isOo) return reply(mess.only.user)
                  trsl = body.slice(8)
                  reply('*[🕒] Wait Sedang di Translate*')
                   anu = await fetchJson('https://arugaz.my.id/api/edu/translate?lang=en&text='+ trsl)
                   reply(anu.result)
                   break 
                 case 'tiktokpict':
                 if (!isOo) return reply(mess.only.user)
                  reply(`_Bot Lagi Nyarih Nih_`)
                  b = await fetchJson(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${body.slice(7)}`)
                  buff = await getBuffer(b.result)
                  client.sendMessage(from, buff, image, {quoted: mek, caption: '....'})
                  break  
                case 'pastebin':
                if (!isOo) return reply(mess.only.user)
                if (args.length < 1) return reply(`Maaf Text Nya mana`)
                asu = body.slice(9)
                reply(mess.wait)
                nama = asu.split("|")[0];
                teks = asu.split("|")[1];
                anu = await fetchJson (`https://api.zeks.xyz/api/pastebin?text=${teks}&name=${nama}&apikey=api`, {method: 'get'})
                hasil = `${anu.result}`
                reply(hasil)
                break 
                case 'phubcomment':
                if (!isOo) return reply(mess.only.user)
                if (args.length < 1) return reply(`Mana Text Nya??`)
                an = body.slice(12)
                name = an.split("|")[0];
                img = an.split("|")[1];
                txt = an.split("|")[2];   
                reply(mess.wait)
                anu = await fetchJson(`https://api.zeks.xyz/api/phub?apikey=apiv&img=${img}&username=${name}&msg=${text}`, {method: 'get'})
                buffte = await getBuffer(anu.result)
                client.sendMessage(from, buffte, image, {quoted: mek})
                break
                case 'imoji':
                if (!isOo) return reply(mess.only.user)
				reply(mess.wait)
				anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/emoji2png?emoji=`, {method: 'get'})
				if (anu.error) return reply(anu.error)
				buffer = await getBuffer(anu.result)
			    client.sendMessage(from, buffer, image, {quoted: mek})
				break
                case 'fancy':
                if (!isOo) return reply(mess.only.user)
                 fncy = body.slice(1)
                 reply('*[⏳] Sedang Menampilkan Text*')
                 buffer = await getBuffer('https://arugaz.my.id/api/random/text/fancytext?text='+ fncy)
                 reply(buffer.result)
                 break
                case  'textglud':
                if (!isOo) return reply(mess.only.user)
                 glud = body.slice(7)
                 reply(mess.wait)
                  buffer = await getBuffer('https://arugaz.my.id/api/textpro/glue3d?text='+ glud)
                  client.sendMessage(from, buffer, image, {quoted: mek, caption: '^_^'})
                  break
                case 'cooltext':
                if (!isOo) return reply(mess.only.user)
                  texp = body.slice(7)
                   reply(mess.wait)
                   buffer = await getBuffer('https://arugaz.my.id/api/textpro/bokehtext?text='+ texp)
                   client.sendMessage(from, buffer, image, {quoted: mek, caption: 'mahkasih',})
                   break   
                   case 'giftext':
                   if (!isOo) return reply(mess.only.user)
                    gif = body.slice(7)
                     reply(mess.wait)
                     buffer = await getBuffer('https://arugaz.my.id/api/flamingtext/memories?text='+ gif)
                     client.sendMessage(from, buffer, sticker, {quoted: mek, caption: 'nih kak'})
                     break
                case 'neko':
                if (!isOo) return reply(mess.only.user)
                 nime = await fetchJson(`https://docs-jojo.herokuapp.com/api/nekonime`, {method: 'get'})
                 buff = await getBuffer(nime.result)
                 client.sendMessage(from, buff, image, {quoted: mek, caption: '/:'})
                 break 
                 case 'ytmp3':
                 vidl = body.slice(9)
                 reply(mess.wait)
                 buffer = await getBuffer('https://st4rz.herokuapp.com/api/yta2?url='+ vidl)
                 client.sendMessage(from, buffer, image, {quoted: m})
                 break
                 case 'wiki':
                 if (!isOo) return reply(mess.only.user)
                    if (args.length < 1) return reply('teks nya mana om?')
                    teks = body.slice(5)
                    reply(mess.wait)
                    anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/wiki?q=${teks}`, {method: 'get'})
                    if (anu.error) return reply(anu.error) 
                    buff = await getBuffer(anu.img)
                    bufferfff = await getBuffer(anu.result)
                   hasil = `_[❗] Menurut Wekipedia_\n${anu.result}`
                  reply(hasil)
                  break 
                 case 'wikie':
                 if (!isOo) return reply(mess.only.user)
                 if (args.length < 1) return reply(`Yang Mau Om Tau apa?`)
                 reply(mess.wait)
                 anu = await fetchJson(`https://arugaz.my.id/api/edu/enwiki?query=${body.slice(7)}`, {method: 'get'})
                 bufft = await getBuffer(anu.wiki)
                 hasip = `*[❗]According to Wekepidia are*\n\n\n${anu.results.extract}`
                 reply (hasip)
                 break
                 case 'tiktokpp':
                 if (!isOo) return reply(mess.only.user)
                  reply(`_[❗] Wait Sedang Mencari_`)
                  insy = body.slice(5)
                  anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=`+ insy)
                  if (anu.error) return reply('_[❗] Terjadi Keselakah Pada Api key!!_')
                  if (data.error) return reply(data.error)
                  if (data.result) return reply(data.result)
                  buffer = await getBuffer(data.result)
                  client.sendMessage(from, buffer, image, {quoted: mek, caption: 'berhasil'})
                  break 
                  case 'infogmp':
                  if (!isOo) return reply(mess.only.user)
                  anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/infogempa`, {method: 'get'})
                  buff = await getBuffer(anu.data.map)
                  teks = `_Tanggal_:${anu.result.waktu}\n_Sekala_:${anu.result.magnitude}\n_Kedalaman_:${anu.result.kedalaman}\n_Kordinat_:${anu.result.koordinat}_Lokasi_:${anu.result.lokasi}`
                  client.sendMessage(from, buff, image, {quoted: mek, caption: teks})
                 break
                 case 'corona':
                 if (!isOo) return reply(mess.only.user)
                 if (args.length < 1) return reply('*Kode Negara Nya mana Kak??*')           
                 reply(mess.wait)
                 anu = await fetchJson('https://arugaz.herokuapp.com/api/corona?country=${body.slice(7)}')
                 buff = await getBuffer(anu.results)
                 client.updatePresence(from, Presence.composing) 
                 cont = `*->NEGARA*:${anu.result.country}\n*->KASUS*:${anu.result.cases}\n*->KEMATIAN*:${anu.result.death}\n*->KASUS_ACTIVE*:${anu.result.active}\n _Selalu Pake Masker Saat Berpergiaan😷_`
                 reply(cont)
                 break 
                 case 'hokinum':
                 if (!isOo) return reply(mess.only.user)
                 if (args.length < 1) return reply('*Mana Nomor Nya???*')
                 tt = body.slice(7)
                 reply(mess.wait)
                 buffer = await getBuffer('https://arugaz.my.id/api/primbon/nomorhoki?nomor='+ tt)
                 client.sendMessage(from, buffer, text, {quoted: mek})
                 break 
                case 'addvip':
                if (!isOo) return reply(mess.only.user)
                    if (!isOwner) return rsply(`Peritah ini hanya untuk owner!!`)
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = '╭────「 *🔱PREMIUM🔱* 」──*\n│+ *Nomor* : \n│+ *Expired*: *30 Days*\n│+ *Status*: *ACTIVE*\n│ Thx for Upgrade to Premium🥰\n*╰──────「 *FROZE_BOT* 」────'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.sendMessage(from, mentioned)
					} else {
						mentions(`╭────「 *PREMIUM👑* 」──*\n│+ *Number* : @${mentioned[0].split('@')[0]}\n│+ *Expired*: *30 Days*\n│+ *Status*: *ACTIVE*\n│ Thx for Upgrade to Premium🥰\n*╰──────「 *FROZE* 」────`, mentioned, true)
					client.sendMessage(from, mentioned)
					reply(`*Berhasil MenjadiKan @${_.split('@')[0]} Premium*`)
				    }
					break
				case 'welcome':
				if (!isOo) return reply(mess.only.user)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Udah aktif um')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Sukses mengaktifkan fitur welcome di group ini ✔️')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Sukses menonaktifkan fitur welcome di group ini ✔️')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
					}
                                      break
				case 'clone':
					if (!isGroup) return reply(mess.only.group)
					if (!isOo) return reply(mess.only.user)
					if (!isOwner) return reply(' *Kamu SIAPA* ?') 
					if (args.length < 1) return reply(' *TAG YANG MAU DI CLONE!!!* ')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`Foto profile Berhasil di perbarui menggunakan foto profile @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply(' *Yah gagal ;(, coba ulangi ^_^* ')
					}
					break
                    case 'info':
                    if (!isOo) return reply(mess.only.user)
                     client.sendMessage(from, '*[NAMA]:❄️FROZEBOT❄️*\n*[VERSI]:1.0*\n*[PREFIX]!*\n*[GITHUB]:SOON*\n*[OWNER]:https:wa.me/+6281539336835*\n*[MADE BY❄️FROZEBOT❄️]*', text, {quoted: mek})
                     break
                    case 'bc': 
                    if (!isOo) return reply(mess.only.user)
					if (!isOwner) return reply(' *LU SIAPA* ?') 
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `❮ 𝗙𝗥𝗢𝗭𝗘 𝗕𝗢𝗧 𝗕𝗥𝗢𝗔𝗗𝗖𝗔𝗦𝗧 ❯\n\n${body.slice(4)}`})
						}
						reply('𝗦𝗨𝗞𝗦𝗘𝗞 𝗕𝗥𝗢𝗔𝗗𝗖𝗔𝗦𝗧 𝗕𝗥𝗢')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `❮ 𝗙𝗥𝗢𝗭𝗘 𝗕𝗢𝗧 𝗕𝗥𝗢𝗔𝗗𝗖𝗔𝗦𝗧  ❯\n\n${body.slice(4)}`)
						}
						reply('𝙨𝙪𝙘𝙘𝙚𝙨𝙨 𝙗𝙧𝙤𝙖𝙙𝙘𝙖𝙨𝙩 ')
					}
				break
                case 'testu':
                if(!isGroup) return reply(mess.only.group)
                reply('waw') 
                break  
                case 'yt3':
                if (!isOo) return reply(mess.only.user)
                if (args.length < 1) return reply(`Maaf Text Nya mana Kak???`)
                bob = body.slice(7)
                reply(mess.wait)
                anu = await fetchJson(`https://tobz-api.herokuapp.com/api/yta?url=${bob}&apikey=BotWeA`, {method: 'grt'})
                buffgg = await getBuffer(anu.thumb)
                buff = await getBuffer(anu.result)
                teks = `*➥TITLE*:${anu.title}\n\n*➥SIZE*:${anu.filesize}\n\n\*Sedang Mendownload Mp3*`
                client.sendMessage(from, buffgg, image, {quoted: mek, caption: teks})
                client.sendMessage(from, buff, audio, {mimetype: 'audio/mp4', quoted: mek})               
                break 
                case 'ssweb':
                if (!isOo) return reply(mess.only.user)
                if (args.length < 1) return reply(`Text Nya mana Om`)
                reply(mess.wait)
                ano = await fetchJson(`http://api-melodicxt.herokuapp.com/api/ssweb?url=${body.slice(7)}&apiKey=${apiy}`, {method: 'get'})
                beb = await getBuffer(ano.result)
                client.sendMessage(from, beb, image, {quoted: mek, caption: 'nih bang'})
                break 
                case 'apkpure':
                if (!isOo) return reply(mess.only.user)
                reply(mess.wait)
                anu = await fetchJson(`https://api.zeks.xyz/api/apkpure?q=${body.slice(7)}&apikey=a`)
                boppe = await getBuffer(anu.result.image)
                teks = `*➥TITLE*:${anu.result.title}\n*➥DESCRIPTION*:${anu.result.description}\n*➥DEVELOPER*:${anu.result.detail_author}\n*➥SPEK*:${anu.result.detail_sdk}\n\n\n\n*Link*:${anu.result.download_link}`
                client.sendMessage(from, boppe, image, {quoted: mek, caption: teks})
                break
                case 'infonegara':
                if (!isOo) return reply(mess.only.user)
                if (args.length < 1) return reply(`*Negara Nya Mana Om???*`)
                reply(mess.wait)
                anu = await fetchJson(`https://api-melodicxt.herokuapp.com/api/info-country-v1?country=${body.slice(7)}&apiKey=${apiy}`, {method: 'get'})
                buff = await getBuffer(anu.result.FlagPng)
                teks = `*➸NAMA*:${anu.result.Name}\n*➸AREA*:${anu.result.Area}\n*➸REGION*:${anu.result.Region}\n\n\n*HAPPY ALWAS*`
                client.sendMessage(from, buff, image, {quoted: mek, caption: teks})
                break 
                case 'serchimg':
                if (!isOo) return reply(mess.only.user)
                if (args.length < 1) return reply(`*Parameter Nya mana Om???*`)
                cont = body.slice(9)
                reply(mess.wait)
                 anu = await fetchJson(`http://api-melodicxt.herokuapp.com/api/image-search?query=${cont}&apiKey=${apiy}`, {method: 'get'})
                 if (anu.error) return reply(anu.error)
                 buffet = await getBuffer(anu.result)
                 client.sendMessage(from, buffet, image, {quoted: mek, caption: 'Nih'})
                 break 
                case 'tahtah':
                if (!isOo) return reply(mess.only.user)
                 reply(mess.wait)
                 butf = await getBuffer(`https://api.vhtear.com/hartatahta?text=${body.slice(5)}&apikey=K2021Chikanot`)
                  client.sendMessage(from, butf, image, {quoted: mek, caption: 'Nih Anjim'})
                  break
                case 'google':
                if (!isOo) return reply(mess.only.user)
                if (args.length < 1) return reply(`[❗] Text. Nya Mana Om???`)
                reply(mess.wait)
                teks = body.slice(7)
                anu = await fetchJson(`https://api.vhtear.com/googlesearch?query=${teks}&apikey=K2021Chikanot`, {method: 'get'})
                buffjj = await getBuffer(anu.result.data)
                client.sendMessage(from, buffjj, image, {quoted: mek, caption: '*Ini Yang Saya Temukan*'+ teks})
                break
                case 'nsfwneko':
                if (!isOo) return reply(mess.only.user)
                if (!isNsfw)return reply(`*[❗] Nsfw Sedang Off Silakan Aktifkan*`)
                anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nsfwneko?apikey=${tobzapi}`, {method: 'get'})
                buffjh = await getBuffer(anu.result)
                client.sendMessage(from, buffjh, image, {quoted: mek, caption: '*Tobat Tobat Kak*'})
                break
                case 'mememaker': 
                if (!isOo) return reply(mess.only.user)
                gqh = body.slice(7)
                glq1 = gqh.split("|")[0];
                glq2 = gqh.split("|")[1];
                url = gqh.split("|")[2];
                reply(mess.wait)
                anu = await fetchJson(`http://api-melodicxt.herokuapp.com/api/meme-maker?url=${url}&text=${glq1}|${glq2}`, {method: 'get'})
                buffkjj = await getBuffer(anu.result.result)
                client.sendMessage(from, buffkjj, image, {quoted: mek, caption: 'nih'})
                break 
         case 'phubcmd':
         if (!isOo) return reply(mess.only.user)
         if (args.length < 1) return reply(`Maaf Text Nya mana Ya :(`)
         reply(mess.wait)
         coba = body.slice(7)
         glb1 = coba.split("|")[0];
         glb2 = coba.split("|")[1];
         glb3  = coba.split("|")[2];
         reply(mess.wait)
         anp = await getBuffer(`https://api.zeks.xyz/api/phub?apikey=You api&img=${glb1}&username=${glb2}&msg=${glb3}`)
         client.sendMessage(from, anp, image, {quoted: mek, caption: 'Wah Om Sukan Nonton ._.'})
         break 
        case 'trigger':
        if (!isOo) return reply(mess.only.user)
        if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
        reply(mess.wait)
        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
	    media = await client.downloadMediaMessage(encmedia)
        anu = await getBuffer(`https://api.zeks.xyz/api/triger?apikey=You Api&img=${body.slice(9)}`)
        client.sendMessage(from, anu, gif, {quoted: mek})
        } else {
        	reply(`gambar om`)
        }
        break
        case 'infocuaca':
        if (!isOo) return reply(mess.only.user)
        tels = body.slice(10)
        if (args.length < 1) return reply('Daerahnya dimana kak?')
        reply(mess.wait)
        anu = await fetchJson(`https://mhankbarbar.tech/api/cuaca?q=${tels}&apiKey=${mhankaipi}`)
        tect = `*➥TEMPAT* : ${anu.tempat}\n*➥ANGIN* : ${anu.angin}\n*➥CUACA* : ${anu.cuaca}\n*➥SUHU* : ${anu.suhu}\n*➥KELEMBAPAN* : ${anu.kelembapan}`
        client.sendMessage(from, tect, {quoted: mek})
        break 
        case 'kbbi':
        if (!isOo) return reply(mess.only.user)
        kbb = body.slice(5)
        reply(mess.wait)
        anu = await fetchJson (`https://mhankbarbar.tech/api/kbbi?query=${kbb}&lang=id&apiKey=${mhankaipi}`, {method: 'get'})
        teks = `*[❗] Menurut Kamus Kbbi*\n\n*${anu.result}*`
        reply(teks)
        break 
        case 'infofilm':
        if (!isOo) return reply(mess.only.user)
        reply(mess.wait)
        kpp = body.slice(9)
        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/film?q=${kpp}&apikey=${tobzapi}`, {method: 'get'})
        buffte = await getBuffer(anu.thumb)
        teks = `*❥JUDUL*'${anu.judul}\n*❥GENRE*:${anu.genre_negara}\n*❥RATING*:${anu.rating}\n*❥LINK*:${anu.link}`
        client.sendMessage(from, buffte, image, {quoted: mek, caption: teks})
        break
				case 'wait':
				if (!isOo) return reply(mess.only.user)
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('Foto aja mas')
					}
					break
				default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[WARN]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}
// abis 
	
starts()