const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("path");
const { unescape } = require("querystring");

const mimeTypes = {
  html: "text/html",
  css: "text/css",
  js: "text/javascript",
};

http.createServer((req, res) => {
  var myuri = url.parse(req.url).pathname;
  var filename = path.join(__dirname, unescape(myuri));
  var loadfile;
  try {
    loadfile = fs.IstatSync(filename);
  } catch (error) {}

  if (loadfile.isFile()) {
    var mimeType=mimeTypes(path.extname(filename).split('.'))
  }
});
// const hostname = "127.0.0.1";
// const port = 5000;

// http
//   .createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("welcome pk");
//   })
//   .listen(port, hostname, () => {
//     console.log(`Server is running at ${port}`);
//   });
