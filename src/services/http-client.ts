const axios = require('axios');

const httpClient = axios.create({
  baseURL: process.env.BACKEND_API_URL,
});

export default httpClient;
