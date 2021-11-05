"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProposalSummary = exports.getProposalById = exports.close = exports.connect = void 0;
const mongodb_1 = require("mongodb");
const voteSum_1 = require("./voteSum");
const client = new mongodb_1.MongoClient('mongodb://localhost:27017');
let app;
async function connect(appObject) {
    try {
        await client.connect();
        const database = client.db('test');
        appObject.locals.database = database;
        app = appObject;
        return database;
    }
    catch (e) {
        console.error(e);
        return false;
    }
    finally {
        //   await client.close()
    }
}
exports.connect = connect;
function close(app) {
    client.close();
}
exports.close = close;
const getProposalById = async (proposalId) => {
    const proposals = app.locals.database.collection("dao-proposals");
    const proposal = await proposals.findOne({ id: proposalId });
    return proposal;
};
exports.getProposalById = getProposalById;
async function getProposalSummary(id) {
    const proposals = app.locals.database.collection("summary");
    const proposal = await proposals.findOne({ id: id });
    if (!proposal) {
        const regenProposal = await (0, voteSum_1.regenProposalSummary)(id, app);
        if (regenProposal) {
            return regenProposal;
        }
        else {
            throw ('no raw proposal');
        }
    }
    return proposal;
}
exports.getProposalSummary = getProposalSummary;
module.exports = { connect, close, getProposalById: exports.getProposalById, getProposalSummary };
//# sourceMappingURL=db.js.map