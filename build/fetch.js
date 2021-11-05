"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRawProposal = void 0;
require();
const url = 'csjdaoisjdaoisdj';
const timeout = 'time';
const https = require('https');
https.get('https://encrypted.google.com/', (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
    res.on('data', (d) => {
        process.stdout.write(d);
    });
}).on('error', (e) => {
    console.error(e);
});
const getRawProposal = async (id) => {
    const response = await fetch(`https://governance.decentraland.org/api/proposal/${id}`);
    const data = await response.json();
    console.log(data);
};
exports.getRawProposal = getRawProposal;
//# sourceMappingURL=fetch.js.map