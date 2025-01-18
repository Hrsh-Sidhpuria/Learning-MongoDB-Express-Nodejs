const { log } = require("console");
const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url == "/about") {
    res.end("This is a About page");
  } else if (req.url == "/profile") {
    res.end("This is a Profile page");
  } else {
    res.end("hello World");
  }
});

server.listen(3000);
