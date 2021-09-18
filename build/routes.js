"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proposalSummary = exports.index = void 0;
var db_1 = require("./db");
var index = function (req, res) {
    res.status(200).send({ response: "Test" });
};
exports.index = index;
var proposalSummary = function (req, res) {
    var id = req.params.id;
    var proposal = (0, db_1.getProposalById)(id);
    res.status(200).send({ response: "Test" });
};
exports.proposalSummary = proposalSummary;
module.exports = { index: exports.index };
