import axios from "axios";

export default async (id) => {
	console.log(id);
	try {
		return await axios.post(`/servers/${id}/backups`);
	}
	catch (error) {
		console.log(error.request.data.errors);
	}
};