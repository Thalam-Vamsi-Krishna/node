const http = require("http");
const server = http.createServer((req, res) => {
  let content = `<html><body><h1>Hello, Welcome</h1></body></html>`;
  let homeContent = `<html><body><h1>Hello, Welcome to Home</h1></body></html>`;
  let aboutContent = `<html><body><h1>Hello, Welcome to About us Page</h1></body></html>`;
  let nodeContent = `<html><body><h1>Hello, Welcome to my Node.js project</h1></body></html>`;

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(content);
  } else if (req.url === "/home") {
    res.setHeader("Content-Type", "text/html");
    res.write(homeContent);
  } else if (req.url === "/about") {
    res.setHeader("Content-Type", "text/html");
    res.write(aboutContent);
  } else if (req.url === "/node") {
    res.setHeader("Content-Type", "text/html");
    res.write(nodeContent);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write("404 Not Found");
  }
  res.end();
});

const Port = 4000;
server.listen(Port, "localhost", () => {
  console.log(`Server started on ${Port}`);
});
