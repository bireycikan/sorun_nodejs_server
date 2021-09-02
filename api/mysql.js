const axios = require('axios').default;

const mysql_server_endpoint = "http://localhost:5433";

module.exports = axios.create({
  baseURL: mysql_server_endpoint
})

