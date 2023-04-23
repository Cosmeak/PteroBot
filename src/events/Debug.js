import { Events } from "discord.js";
import { Logger } from "../services/Logger.js";
import { config } from "dotenv";
config();

export default {
	name: Events.Debug,
	execute(debug) {
		if (process.env.BOT_MODE === "debug") {
			Logger.info(debug);
		}
	},
};
