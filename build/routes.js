"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
var index = function (req, res) {
    res.status(200).send({ response: "Test" });
};
exports.index = index;
module.exports = { index: exports.index };
