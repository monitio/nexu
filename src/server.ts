// server.ts (Server Logic Only)
import express from "express";
import path from "path";
import chalk from "chalk";
import { createServer } from "http";
import { Server } from "socket.io";
import fs from "fs";
import chokidar from "chokidar";

// Setup server and WebSocket logic
export function startDevServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);
  const PORT = process.env.PORT || 3000;

  // Serve static files
  app.use("/public", express.static(path.join(process.cwd(), "public"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".html") || filePath.endsWith(".css") || filePath.endsWith(".js") || filePath.endsWith(".webbed")) {
        res.status(403).end("Forbidden");
      }
    }
  }));

  // Serve HTML files
  app.get("*", (req, res) => {
    const filePath = path.join(process.cwd(), "src", req.path === "/" ? "index.html" : req.path);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(404).send("404 Not Found");
      }

      const wsScript = `
        <script>
          const socket = new WebSocket("ws://" + location.host);
          socket.addEventListener("message", (event) => {
            if (event.data === "reload") {
              location.reload();
            }
          });
        </script>
      `;
      res.send(data.replace("</body>", wsScript + "</body>"));
    });
  });

  // WebSocket connection
  io.on("connection", (socket) => {
    console.log(chalk.blue("🔌 Browser connected to WebSocket"));
  });

  // Watch for file changes
  const watcher = chokidar.watch([path.join(process.cwd(), "src"), path.join(process.cwd(), "public")]);

  watcher.on("change", (filePath) => {
    console.log(chalk.yellow(`📝 File changed: ${filePath}. Refreshing browser...`));
    io.emit("reload"); // Notify all clients to refresh
  });

  // Start the server
  httpServer.listen(PORT, () => {
    console.log(chalk.green(`🚀 Webbed development server running at http://localhost:${PORT}`));
  });
}
