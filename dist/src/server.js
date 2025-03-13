"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDevServer = startDevServer;
// server.ts (Server Logic Only)
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const fs_1 = __importDefault(require("fs"));
const chokidar_1 = __importDefault(require("chokidar"));
// Setup server and WebSocket logic
function startDevServer() {
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    const io = new socket_io_1.Server(httpServer);
    const PORT = process.env.PORT || 3000;
    // Serve static files
    app.use("/public", express_1.default.static(path_1.default.join(process.cwd(), "public"), {
        setHeaders: (res, filePath) => {
            if (filePath.endsWith(".html") || filePath.endsWith(".css") || filePath.endsWith(".js") || filePath.endsWith(".webbed")) {
                res.status(403).end("Forbidden");
            }
        }
    }));
    // Serve HTML files
    app.get("*", (req, res) => {
        const filePath = path_1.default.join(process.cwd(), "src", req.path === "/" ? "index.html" : req.path);
        fs_1.default.readFile(filePath, "utf8", (err, data) => {
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
        console.log(chalk_1.default.blue("🔌 Browser connected to WebSocket"));
    });
    // Watch for file changes
    const watcher = chokidar_1.default.watch([path_1.default.join(process.cwd(), "src"), path_1.default.join(process.cwd(), "public")]);
    watcher.on("change", (filePath) => {
        console.log(chalk_1.default.yellow(`📝 File changed: ${filePath}. Refreshing browser...`));
        io.emit("reload"); // Notify all clients to refresh
    });
    // Start the server
    httpServer.listen(PORT, () => {
        console.log(chalk_1.default.green(`🚀 Webbed development server running at http://localhost:${PORT}`));
    });
}
