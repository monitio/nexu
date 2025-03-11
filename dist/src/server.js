"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runServer = runServer;
const http_1 = require("http");
const router_1 = require("./router");
function runServer() {
    const PORT = process.env.PORT || 3000;
    const server = (0, http_1.createServer)((req, res) => (0, router_1.router)(req, res));
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
}
