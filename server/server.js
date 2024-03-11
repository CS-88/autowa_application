const http = require("http");
const app = require("./app");

const port = process.env.port || 3000;
const server = http.createServer();

server.listen(port, () => {
    console.log("The server started at port ", port);
});