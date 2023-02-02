"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importStar(require("express"));
const http_1 = tslib_1.__importDefault(require("http"));
const path_1 = tslib_1.__importDefault(require("path"));
const routers_1 = require("./routers");
const app = (0, express_1.default)();
app.use((0, express_1.json)());
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../dist/client')));
app.use(routers_1.parseRoute);
const server = http_1.default.createServer(app);
server.listen(8080, () => console.log(`[SERVER] listening at port 8080 now`));