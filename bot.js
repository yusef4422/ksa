const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = "#";
client.on('message',async message => {
    if(message.author.bot || message.channel.type === 'dm') return;
    let cmd = message.content.split(" ")[0].substring(prefix.length);
    let args = message.content.split(" ").slice(1);

    if(cmd === 'quran') {
        let items = [" الفاتحة", " البقرة", " آل عمران", " النساء", " المائدة", " الأنعام", " الأعراف", " الأنفال", " التوبة", " يونس", " هود", " يوسف", " الرعد", " إبراهيم", " الحجر", " النحل", " الإسراء", " الكهف", " مريم", " طه", " الأنبياء", " الحج", " المؤمنون", " النور", " الفرقان", " الشعراء", " النمل", " القصص", " العنكبوت", " الروم", " لقمان", " السجدة", " الأحزاب", " سبأ", " فاطر", " يس", " الصافات", " ص", " الزمر", " غافر", " فصلت", " الشورى", " الزخرف", " الدخان", " الجاثية", " الأحقاف", " محمد", " الفتح", " الحجرات", " ق", " الذاريات", " الطور", " النجم", " القمر", " الرحمن", " الواقعة", " الحديد", " المجادلة", " الحشر", " الممتحنة", " الصف", " الجمعة", " المنافقون", " التغابن", " الطلاق", " التحريم", " الملك", " القلم", " الحاقة", " المعارج", " نوح", " الجن", " المزمل", " المدثر", " القيامة", " الإنسان", " المرسلات", " النبأ", " النازعات", " عبس", " التكوير", " الإنفطار", " المطففين", " الإنشقاق", " البروج", " الطارق", " الأعلى", " الغاشية", " الفجر", " البلد", " الشمس", " الليل", " الضحى", " الشرح", " التين", " العلق", " القدر", " البينة", " الزلزلة", " العاديات", " القارعة", " التكاثر", " العصر", " الهمزة", " الفيل", " قريش", " الماعون", " الكوثر", " الكافرون", " النصر", " المسد", " الإخلاص", " الفلق", " الناس"];
        let sm    = require('string-similarity');
        let fetch = require('node-fetch');
        if(!args[0]) return message.reply('**# من فضلك اكتب اسم السورة من بعد الأمر**');
        
        let bestMatch  = sm.findBestMatch(args[0], items).bestMatch.target;
        let indexMatch = items.indexOf(bestMatch)+1;
        
        fetch(`https://unpkg.com/quran-json@latest/json/surahs/${indexMatch}.json`)
        .then(m => m.json())
        .then(async res => {
            let { verses } = res;
            let output = "";

            verses.forEach(async verse => {
               await (output += `\n` + verse.text); 
            });
            
            
            let messages = [];
            let index = 0;
            let end = 1950;
            
            for(let i = 0; i < output.length; i++) {
                await messages.push(output.slice(index, end));
                
                await (index+=1950);
                await (end+=1950);
                
                if(output.length < end.length) break;
            }
            
            let counter = 0;
          	let msg = await message.channel.send(messages[counter]);
        
          	let left = await msg.react('⬅');
          	let right = await msg.react('➡');
        
          	let collector = await msg.createReactionCollector((reaction, user) => user.id === message.author.id, { time: 15000 });
        
          	collector.on('collect',async collected => {
          		let emoji = collected.emoji.name;
          		let reaction = collected.emoji.name === "⬅" ? left : right;
          		await reaction.remove(message.author).catch(e => {});
          		if(emoji === "➡") {
          			if(counter >= 1) {
          				counter = 0;
          				msg.edit(messages[counter]);
          			} else if(counter <= 0) {
          				counter = 1;
          				msg.edit(messages[counter]);
          			}
          		} else if(emoji === "⬅") {
          			if(counter >= 1) {
          				counter = 0;
          				msg.edit(messages[counter]);
          			} else if(counter <= 0) {
          				counter = 1;
          				msg.edit(messages[counter]);
          			}
          		}
          	});
          	collector.on('end', () => msg.clearReactions());
        });
    }
});
client.login(process.env.BOT_TOKEN);
