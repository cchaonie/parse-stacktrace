import express, { json } from "express";
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import { parseRoute } from './routers/index';

const app = express();

app.use(cookieParser());

app.use(json());

app.use(express.static(path.resolve(process.cwd(), "../dist/client")));

app.use(parseRoute);

const server = http.createServer(app);

server.listen(8080, () => console.log(`[SERVER] listening at port 8080 now`));
