// bot.js

const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

// Ganti ini dengan ID grup kamu
const GROUP_ID = '1203630xxxxxxxx@g.us';

// Lokasi file disimpan ke folder Downloads
const TEXT_FILE = '/data/data/com.termux/files/home/storage/downloads/saved_text.txt';

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('ready', async () => {
    console.log('✅ Bot siap!');

    if (fs.existsSync(TEXT_FILE)) {
        const text = fs.readFileSync(TEXT_FILE, 'utf-8');
        await client.sendMessage(GROUP_ID, text);
        console.log('✅ Pesan terkirim ke grup.');
    } else {
        console.log('⚠️ Belum ada pesan yang disimpan.');
    }
});

client.on('message', async msg => {
    if (msg.body.startsWith('.text')) {
        const match = msg.body.match(/\.text\s+"([\s\S]+)"/);
        if (match && match[1]) {
            fs.writeFileSync(TEXT_FILE, match[1]);
            msg.reply('✅ Pesan disimpan di folder Download.');
        } else {
            msg.reply('⚠️ Format salah. Gunakan: .text "pesan kamu"');
        }
    }
});

client.initialize();
