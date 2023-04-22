const { Events } = require("discord.js");
const Logger = require("../services/Logger");
require("dotenv").config();

// When the client is ready, run this code (only once)
module.exports = {
	name: Events.Debug,
	execute(debug) {
		if (process.env.BOT_MODE === "debug") {
			Logger.info(debug);
		}
	},
};
