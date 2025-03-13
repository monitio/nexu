"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = startServer;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Serve static files (excluding .html, .css, .js, .webbed)
app.use("/public", express_1.default.static(path_1.default.join(process.cwd(), "public"), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith(".html") || filePath.endsWith(".css") || filePath.endsWith(".js") || filePath.endsWith(".webbed")) {
            res.status(403).end("Forbidden");
        }
    }
}));
// Serve HTML files via router
app.get("*", (req, res) => {
    const filePath = path_1.default.join(process.cwd(), "src", req.path === "/" ? "index.html" : req.path);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send("404 Not Found");
        }
    });
});
function startServer() {
    app.listen(PORT, () => {
        console.log(chalk_1.default.green(`🚀 Webbed server running at http://localhost:${PORT}`));
    });
}
