import axios from "axios";
import { config } from "dotenv";
config();

export default async (id, signal) => {
  try {
    await axios.post(`${process.env.PTERO_HOST}/api/client/servers/${id}/power`, {
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.PTERO_TOKEN}`,
      },
      "body": {
        "signal": signal,
      },
    });
  }
  catch (error) {
    console.log(error.request.data.errors);
    throw "An error occured with the request to your API...";
  }
};
