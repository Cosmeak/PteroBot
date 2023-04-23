import axios from "axios";

export default async (id, signal) => {
	try {
		await axios.post(`/servers/${id}/power`, {
			"signal": signal,
		});
	}
	catch (error) {
		console.log(error.request.data.errors);
		throw "An error occured with the request to your API...";
	}
};
