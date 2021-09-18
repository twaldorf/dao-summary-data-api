"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var cors_1 = __importDefault(require("cors"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var dotenv_1 = __importDefault(require("dotenv"));
var routes_1 = require("./routes");
var db_1 = require("./db");
var app = (0, express_1.default)();
app.use((0, helmet_1.default)());
dotenv_1.default.config();
var origin = process.env.NODE_ENV === 'production' ? ['https://*.decentraland.org', 'https://dao-data-vis.vercel.app'] : '*';
var corsOptions = {
    origin: origin,
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOptions));
var limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 1000, // limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.use(express_1.default.json({ type: 'application/json' }));
app.use(routes_1.index);
//test area
(0, db_1.connect)(app)
    .then(function (v) {
    if (v) {
        console.log((0, db_1.getProposalById)('6e3408a0-d38f-11eb-976f-4b50abb26a02'));
    }
});
module.exports = { app: app };
