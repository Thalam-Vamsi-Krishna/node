const http = require("http");
const routes = require("./routes");

const PORT = 3000;
const server = http.createServer(routes.handler);
console.log(routes.someText);
server.listen(PORT, "localhost");
