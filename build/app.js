"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes");
const db_1 = require("./db");
const voteSum_1 = require("./voteSum");
exports.app = (0, express_1.default)();
exports.app.use((0, helmet_1.default)());
dotenv_1.default.config();
//TO DO move this to a reasonable location
exports.app.locals.dbName = process.env.DB_NAME;
exports.app.locals.proposalsCollectionName = 'daoProposals';
exports.app.locals.votesCollectionName = 'daoVotes';
exports.app.locals.summariesCollectionName = 'daoSummaries';
const origin = process.env.NODE_ENV === 'production' ? ['https://*.decentraland.org', 'https://dao-data-vis.vercel.app'] : '*';
const corsOptions = {
    origin: origin,
    optionsSuccessStatus: 200
};
exports.app.use((0, cors_1.default)(corsOptions));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 1000, // limit each IP to 100 requests per windowMs
});
exports.app.use(limiter);
exports.app.use(express_1.default.json({ type: 'application/json' }));
async function testConnect() {
    const db = await (0, db_1.connect)(exports.app);
    try {
        await (0, voteSum_1.regenProposalSummary)("f3f19d40-17ff-11ec-ac84-77607720a240", exports.app);
    }
    catch (error) {
        console.log(error);
    }
}
testConnect();
const port = process.env.PORT;
exports.app.route('/proposal/:id').get(routes_1.proposalSummary);
exports.app.get('/', routes_1.index);
exports.server = exports.app.listen(port, () => {
    console.log(`Serving on ${port}`);
});
module.exports = { app: exports.app, server: exports.server };
//# sourceMappingURL=app.js.map