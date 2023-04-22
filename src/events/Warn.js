const { Events } = require("discord.js");
const Logger = require("../services/Logger");

// When the client is ready, run this code (only once)
module.exports = {
	name: Events.Warn,
	execute(warn) {
		Logger.warn(warn);
	},
};
