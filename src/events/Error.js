import { Events } from "discord.js";
import { Logger } from "../services/Logger.js";

export default {
  name: Events.Error,
  execute(error) {
    Logger.error(error);
  },
};
