var { Client } = require("discord.js");
var client = new Client();
var {messageID, roleName} = {
    "messageID": "581623382802432011",
    "roleName": "Ls."
};
client.login(process.env.BOT_TOKEN).then(() => {
    client.on("raw", async (event) => {
        if (event.t !== "MESSAGE_REACTION_ADD") return undefined;
        if (event.d.message_id !== messageID) return undefined;
        var guild  = client.guilds.get(event.d.guild_id);
        if (!guild) return undefined;
        var member = guild.members.get(event.d.user_id);
        if (!member) return undefined;
        var role = guild.roles.find(role => role.name == roleName);
        if (!role) return undefined;
        member.addRole(role).catch(console.error);
    });
});


client.login(process.env.BOT_TOKEN);
