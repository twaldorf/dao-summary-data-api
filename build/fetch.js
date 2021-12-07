"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRawProposal = void 0;
const node_https_1 = require("node:https");
const url = 'csjdaoisjdaoisdj';
const timeout = 'time';
const getRawProposal = async (id) => {
    (0, node_https_1.get)(`https://governance.decentraland.org/api/proposal/${id}`, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);
        res.on('data', (d) => {
            process.stdout.write(d);
        });
    }).on('error', (e) => {
        console.error(e);
    });
    // console.log(data)
};
exports.getRawProposal = getRawProposal;
//# sourceMappingURL=fetch.js.map