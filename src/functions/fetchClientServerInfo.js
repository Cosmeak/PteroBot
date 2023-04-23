import axios from "axios";
import { config } from "dotenv";
config();

export default async (id) => {
	const headers = {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"Authorization": `Bearer ${process.env.PTERO_TOKEN}`,
	};

	let response = await axios.get(`${process.env.PTERO_HOST}/api/client/servers/${id}`, {
		"headers": headers,
	});

	const server = response.data.attributes;

	response = await axios.get(`${process.env.PTERO_HOST}/api/client/servers/${id}/resources`, {
		"headers": headers,
	});

	server.stats = response.data.attributes;

	return server;
};
