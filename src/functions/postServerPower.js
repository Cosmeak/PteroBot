const axios = require("axios");
require("dotenv").config();

module.exports = async (id, signal) => {
	return await axios.post(`${process.env.PTERO_HOST}/api/client/servers/${id}/power`, {
		"headers": {
			"Accept": "application/json",
			"Content-Type": "application/json",
			"Authorization": `Bearer ${process.env.PTERO_TOKEN}`,
		},
		"body": {
			"signal": signal,
		},
	});
};
