const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 8080;
const indexPath = path.join(__dirname, "public", "index.html");

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ok", app: "GitHub Actions + Azure Demo" }));
  }

  fs.readFile(indexPath, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      return res.end("Server error: index.html tapılmadı.");
    }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(data);
  });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Demo app listening on port ${PORT}`);
});
