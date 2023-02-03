"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRoute = void 0;
const tslib_1 = require("tslib");
const https_1 = tslib_1.__importDefault(require("https"));
const express_1 = require("express");
const services_1 = require("../../services");
exports.parseRoute = (0, express_1.Router)();
exports.parseRoute.post('/parse', (req, res) => {
    const { sourceMapUrl, errorTrace } = req.body;
    https_1.default.get(sourceMapUrl, clientRes => {
        clientRes.setEncoding('utf8');
        let rawData = '';
        clientRes.on('data', chunk => {
            rawData += chunk;
        });
        clientRes.on('end', () => {
            try {
                const parsedData = JSON.parse(rawData);
                (0, services_1.parse)(parsedData, errorTrace).then(data => res.status(200).json({
                    message: 'OK',
                    data,
                }));
            }
            catch (e) {
                console.error(e.message);
            }
        });
    });
});
