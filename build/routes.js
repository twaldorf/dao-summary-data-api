"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proposalSummary = exports.index = void 0;
const db_1 = require("./db");
const voteSum_1 = require("./voteSum");
const fetch_1 = require("./fetch");
const index = (req, res, next) => {
    res.send({ response: "Index" });
};
exports.index = index;
const proposalSummary = async (req, res) => {
    const id = req.params.id;
    try {
        const proposal = await (0, db_1.getProposalSummary)(id);
        if (proposal) {
            const refreshedProposal = proposal.info.updated < proposal.info.expires ? await (0, voteSum_1.regenProposalSummary)(id, req.app) : proposal;
            res.send({ proposal: refreshedProposal });
        }
        else {
            try {
                const newRawProposal = await (0, fetch_1.getRawProposal)(id);
                const newClean = await (0, voteSum_1.genCleanProposal)(newRawProposal, req.app);
                if (newClean) {
                    const newProposal = await (0, db_1.getProposalSummary)(id);
                    res.send({ proposal: newProposal });
                }
                else {
                    throw ('error generating new proposal');
                }
            }
            catch (e) {
                res.status(200).send({ error: 'no such proposal' });
            }
        }
    }
    catch (_a) { }
    return;
};
exports.proposalSummary = proposalSummary;
module.exports = { index: exports.index, proposalSummary: exports.proposalSummary };
//# sourceMappingURL=routes.js.map