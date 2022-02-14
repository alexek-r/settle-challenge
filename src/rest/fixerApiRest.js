require("dotenv").config();
import axios from 'axios';


const getApi = async (path) => {

    const urlBase = process.env.API_FIXER_URL;
    let response = null;

    await axios.get(urlBase + path)
        .then(r => {
            response = r.data;
        })
        .catch(err => console.log("Error ", err));

    return response;
}

export { getApi };