const fs = require("fs");
const http = require("http");
const url = require("url");
const qs = require("querystring");

function readMessages(callback) {
  fs.readFile("messages.txt", "utf8", (err, data) => {
    if (err) {
      callback([]);
    } else {
      const messages = data.trim().split("\n").reverse();
      callback(messages);
    }
  });
}
function writeMessage(message, callback) {
  fs.appendFile("messages.txt", message + "\n", "utf8", (err) => {
    if (err) {
      console.error("Error writing message to file:", err);
    }
    callback();
  });
}
const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  if (req.method === "POST" && reqUrl.pathname === "/submit") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const postData = qs.parse(body);
      const newMessage = postData.message;
      if (newMessage) {
        writeMessage(newMessage, () => {
          readMessages((messages) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write("<h1>Messages</h1>");
            res.write('<form action="/submit" method="post">');
            res.write(
              '<input type="text" name="message" placeholder="Enter your message" required>'
            );
            res.write('<button type="submit">Submit</button>');
            res.write("</form>");
            res.write("<ul>");
            messages.forEach((msg) => {
              res.write(`<li>${msg}</li>`);
            });

            res.write("</ul>");
            res.end();
          });
        });
      }
    });
  } else {
    readMessages((messages) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("<h1>Messages</h1>");
      res.write('<form action="/submit" method="post">');
      res.write(
        '<input type="text" name="message" placeholder="Enter your message" required>'
      );
      res.write('<button type="submit">Submit</button>');
      res.write("</form>");
      res.write("<ul>");
      messages.forEach((msg) => {
        res.write(`<li>${msg}</li>`);
      });
      res.write("</ul>");
      res.end();
    });
  }
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
