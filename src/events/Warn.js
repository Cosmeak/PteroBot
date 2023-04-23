import { Events } from "discord.js";
import { Logger } from "../services/Logger.js";

// When the client is ready, run this code (only once)
export default {
  name: Events.Warn,
  execute(warn) {
    Logger.warn(warn);
  },
};
