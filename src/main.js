import { Bot } from "./services/Bot.js";
import axios from "axios";
import { config } from "dotenv";
config();

// Define base config for axios
axios.defaults.baseURL = `${process.env.PTERO_HOST}/api/client` ;
axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.PTERO_TOKEN}`;
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

// Generate and launch Bot
const bot = new Bot();
bot.run();
