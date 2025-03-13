import express from "express";
import path from "path";
import chalk from "chalk";

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (excluding .html, .css, .js, .webbed)
app.use("/public", express.static(path.join(process.cwd(), "public"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".html") || filePath.endsWith(".css") || filePath.endsWith(".js") || filePath.endsWith(".webbed")) {
      res.status(403).end("Forbidden");
    }
  }
}));

// Serve HTML files via router
app.get("*", (req, res) => {
  const filePath = path.join(process.cwd(), "src", req.path === "/" ? "index.html" : req.path);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send("404 Not Found");
    }
  });
});

export function startServer() {
  app.listen(PORT, () => {
    console.log(chalk.green(`🚀 Webbed server running at http://localhost:${PORT}`));
  });
}
