"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regenProposalSummary = exports.votesOfProposal = void 0;
var db_1 = require("./db");
var util_1 = require("./util");
//get proposals from db from array of IDs (25 at a time):array of proposals
//TODO include checkout/update timeout to avoid regenerating inactive proposals
var votesOfProposal = function (proposalId, app) { return __awaiter(void 0, void 0, void 0, function () {
    var votesOf;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, app.locals.database.collection('dao-votes').find({ proposal_id: proposalId }).toArray()];
            case 1:
                votesOf = _a.sent();
                return [2 /*return*/, votesOf];
        }
    });
}); };
exports.votesOfProposal = votesOfProposal;
var genCleanProposal = function (rawProposal, app) { return __awaiter(void 0, void 0, void 0, function () {
    var user, id, _a, name, body, end, choices, votes;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user = rawProposal.user, id = rawProposal.id;
                _a = rawProposal.snapshot_proposal, name = _a.name, body = _a.body, end = _a.end;
                choices = rawProposal.configuration.choices;
                return [4 /*yield*/, (0, exports.votesOfProposal)(id, app)];
            case 1:
                votes = _b.sent();
                return [2 /*return*/, {
                        id: id,
                        info: {
                            title: name,
                            description: body,
                            author: user,
                            choices: choices,
                            expires: new Date(end)
                        },
                        votes: votes
                    }];
        }
    });
}); };
var regenProposalSummary = function (proposalId, app) { return __awaiter(void 0, void 0, void 0, function () {
    var proposalRaw, proposal, choicesWithVp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, db_1.getProposalById)(proposalId)];
            case 1:
                proposalRaw = _a.sent();
                return [4 /*yield*/, genCleanProposal(proposalRaw, app)];
            case 2:
                proposal = _a.sent();
                choicesWithVp = (0, util_1.getChoicesWithVp)(proposal);
                proposal.info.choiceVps = choicesWithVp;
                // const winnerChoiceIndex = getWinnerIndexFromChoices(proposal.info.choiceVps)
                return [4 /*yield*/, app.locals.database.collection('summary').insertOne(proposal)];
            case 3:
                // const winnerChoiceIndex = getWinnerIndexFromChoices(proposal.info.choiceVps)
                _a.sent();
                return [2 /*return*/, app.locals.database.collection('summary').findOne({ id: proposalId })];
        }
    });
}); };
exports.regenProposalSummary = regenProposalSummary;
module.exports = { votesOfProposal: exports.votesOfProposal, regenProposalSummary: exports.regenProposalSummary };