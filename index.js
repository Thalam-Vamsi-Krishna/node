const http = require("http");
const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello My Name is Vamsi Krishna\n");
});
const Port = 4000;
server.listen(Port, "localhost", () => {
  console.log(`Server started on ${Port}`);
});
