import fetch from 'node-fetch';
import Web3 from 'web3';
import { Client, Intents, Guild, BitField } from 'discord.js';
import dotenv from 'dotenv';

const botToken = process.env.BOT_TOKEN;

const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

bot.on("ready", () => {
    console.log("The bot is ready");

    const burnAmountInterval = setInterval (async function () {
	bot.user.setActivity("CYBR Liquidity", {type: 'WATCHING'});
        let liquidity = await getLiquidity();

        console.log("Liquidity: $" + liquidity);
        
        let guilds = bot.guilds.cache.map(guild => guild.id);
	    
        guilds.forEach(async (id) => {
		let guild = bot.guilds.cache.get(id);
	        guild.me.setNickname("$" + liquidity);
	});
    }, 30000);

});



async function getLiquidity() {
    try {
        const url = "https://thecyberenterprise.com/api/get_info.php";
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'accept': 'application/json',
        },
        }).then((response) => {
            return response.json();
        });
        const data = await response;
        
        return data.totalLiquidity;
    
    } catch (error) {
        console.log(error);
    }
}


bot.login(process.env.DISCORD_BOT_TOKEN);
