"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regenProposalSummary = exports.genCleanProposal = exports.votesOfProposal = void 0;
const db_1 = require("./db");
const util_1 = require("./util");
//get proposals from db from array of IDs (25 at a time):array of proposals
//TODO include checkout/update timeout to avoid regenerating inactive proposals
const votesOfProposal = async (proposalId, app) => {
    const votesOf = await app.locals.database.collection('dao-votes').find({ proposal_id: proposalId }).toArray();
    return votesOf;
};
exports.votesOfProposal = votesOfProposal;
const genCleanProposal = async (rawProposal, app) => {
    const { user, id } = rawProposal;
    const { name, body, end } = rawProposal.snapshot_proposal;
    const choices = rawProposal.configuration.choices;
    const votes = await (0, exports.votesOfProposal)(id, app);
    return {
        id: id,
        info: {
            title: name,
            description: body,
            author: user,
            choices,
            expires: new Date(end),
            updated: new Date()
        },
        votes
    };
};
exports.genCleanProposal = genCleanProposal;
// regen the proposal summary, or generate for the first time if it doesn't exist in summaryDb
const regenProposalSummary = async (proposalId, app) => {
    // get raw proposal from id (from request parameters)
    const proposalRaw = await (0, db_1.getProposalById)(proposalId);
    // gen and get a clean proposal if the raw proposal exists in the db, else null
    let proposal = proposalRaw ? await (0, exports.genCleanProposal)(proposalRaw, app) : null;
    if (proposal) {
        const choicesWithVp = (0, util_1.getChoicesWithVp)(proposal);
        console.log(choicesWithVp);
        proposal.info.choiceVps = choicesWithVp;
    }
    else {
        throw ('no such proposal');
    }
    // const winnerChoiceIndex = getWinnerIndexFromChoices(proposal.info.choiceVps)
    await app.locals.database.collection('summary').insertOne(proposal);
    const summary = await (0, db_1.getProposalSummary)(proposalId);
    return summary;
};
exports.regenProposalSummary = regenProposalSummary;
module.exports = { votesOfProposal: exports.votesOfProposal, regenProposalSummary: exports.regenProposalSummary };
//# sourceMappingURL=voteSum.js.map