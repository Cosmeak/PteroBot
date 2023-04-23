import axios from "axios";

export default async (id) => {
	let response = await axios.get(`/servers/${id}`);
	console.log(response);
	const server = response.data.attributes;
	response = await axios.get(`/servers/${id}/resources`);
	server.stats = response.data.attributes;
	return server;
};
