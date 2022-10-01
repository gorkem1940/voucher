const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment')
require('moment-duration-format')
const chalk = require('chalk');
const ayarlar = require('./ayarlar.json');
const { Client, Util } = require('discord.js');
require('./util/eventLoader.js')(client);
const fs = require('fs');
const  db  = require('wio.db')
const path = require('path');
const snekfetch = require('snekfetch');
const tags = require('common-tags')




var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

/////////////////// PUBLİC SUNUCU HG MESAJIM //////////////////////
client.on("guildMemberAdd", member => {  
    const kanal = member.guild.channels.cache.find(r => r.id === "848962732438716416");
    const registeryt = "<@&848962719973244958>"
    const tag = "Pârs"
    const kurallar = "<#848962737454972988>"
    const teyit = "† | V.Confirmed" 
    let memberDay = (Date.now() - member.user.createdTimestamp);
    let tarih = moment.duration(memberDay).format("`Y [Yıl], M [Ay], W [Hafta], DD [Gün]`")
    var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
    var üs = üyesayısı.match(/([0-9])/g)
    üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    if(üs) {
      üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
        return {
            '0': `<a:say0_:842169208048844810>`,
            '1': `<a:say1_:842169215330287626>`,
            '2': `<a:say2_:842169220543545424>`,
            '3': `<a:say3_:842169220216520714>`,
            '4': `<a:say4_:842169219759341610>`,                       
            '5': `<a:say5_:842169220514840597>`,
            '6': `<a:say6_:842169220783276093>`,
            '7': `<a:say7_:842169220304732211>`,
            '8': `<a:say8_:842169529416417300>`,
            '9': `<a:say9_:842169529894830111>`}[d];})}

    let user = client.users.cache.get(member.id);
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
   
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Hesap Durumu: (Güvenilir Değil) <a:kaytcarp:841782363218509835>'
  if (kurulus > 1296000000) kontrol = 'Hesap Durumu: (Güvenilir Gözüküyor) <a:kaytk:841782363687092224>'
    moment.locale("tr");
    client.channels.cache.get('848962732438716416').send(`  <a:sseytan:841782368771768350> Sunucumuza Hoşgeldin ${member} - \`${member.id}\` hesabın ${tarih} bu tarihte kurulmuş ve ${kontrol}
    
    <a:sseytan:841782368771768350> Kayıt olmak için \`${teyit}\` soldaki ses kanalllarından birine geçip geçip ${registeryt} yetkisine sahip arkadaşlara teyit vererek kayıt olabilirsin.

    <a:sseytan:841782368771768350> Sunucumuza \`${tag}\` tagımızı ismine ekleyerek yada \`#1902\` etiketimizi alarak bize destek olabilirsin ^^

    <a:sseytan:841782368771768350> Seninle beraber ${üyesayısı} bu kadar kişiyiz.

    <a:sseytan:841782368771768350> İçerdeki eğlenceye ve çekilişlere katılmadan önce ${kurallar} bu kanala bakman iyi olur.
    
    
    
    
    
    
    `)
  });



  client.on("ready", () => {
    client.channels.cache.get("848962740507639878").join();
  })

/////////////////////////////7 EKİP İÇİN HG MESAJI ////////////////////////////////

    client.on("guildMemberAdd", member => {  
        const kanal = member.guild.channels.cache.find(r => r.id === "849354293986328626");
        const registeryt = "<@&849338472052686888>"
        const kurallar = "<#849360708826693722>"
        const teyit = "V.Confirmed (TAGLI)" 
        let memberDay = (Date.now() - member.user.createdTimestamp);
        let tarih = moment.duration(memberDay).format("Y [Yıl], M [Ay], W [Hafta], DD [Gün]")
        var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
        var üs = üyesayısı.match(/([0-9])/g)
        üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
        if(üs) {
          üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
            return {
                '0': `<a:say0_:842169208048844810>`,
                '1': `<a:say1_:842169215330287626>`,
                '2': `<a:say2_:842169220543545424>`,
                '3': `<a:say3_:842169220216520714>`,
                '4': `<a:say4_:842169219759341610>`,                       
                '5': `<a:say5_:842169220514840597>`,
                '6': `<a:say6_:842169220783276093>`,
                '7': `<a:say7_:842169220304732211>`,
                '8': `<a:say8_:842169529416417300>`,
                '9': `<a:say9_:842169529894830111>`}[d];})}
    
        let user = client.users.cache.get(member.id);
          const kurulus = new Date().getTime() - user.createdAt.getTime();  
       
        var kontrol;
      if (kurulus < 1296000000) kontrol = 'Hesap Durumu: <a:kaytcarp:841782363218509835>'
      if (kurulus > 1296000000) kontrol = 'Hesap Durumu: <a:kaytk:841782363687092224>'
        moment.locale("tr");
        client.channels.cache.get('849354293986328626').send(`<a:northyildiz:850139160890572820> **Sunucumuza Hoşgeldin** ${member}
        
         Hesabın **${tarih} bu tarihte kurulmuş** ${kontrol}
    
         Sunucu kurallarımız ${kurallar} kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.
        
         Seninle beraber ${üyesayısı} kişiyiz,Tagımızı alarak bizlere destek olabilirsin, Kayıt olmak için teyit odalarına girip ses teyit vermen gerekiyor ${registeryt} seninle ilgilenecektir.
        
        
        
        `)
      });