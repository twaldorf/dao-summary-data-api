"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWinnerIndexFromChoices = exports.getChoicesWithVp = void 0;
const getChoicesWithVp = (proposal) => {
    const { choices } = proposal.info;
    const vpByChoice = choices.map((choice, index) => {
        const votesFor = proposal.votes.filter((v) => v.choice === index + 1);
        const totalVotesFor = votesFor.reduce((p, c) => { return p + c.voting_power; }, 0);
        return totalVotesFor;
    });
    const choicesWithVp = choices.map((choice, index) => {
        return {
            name: choice,
            vp: vpByChoice[index]
        };
    });
    return choicesWithVp;
};
exports.getChoicesWithVp = getChoicesWithVp;
const getWinnerIndexFromChoices = (choiceVps) => {
    const soloChoiceVps = choiceVps.map(choice => choice.vp);
    const winnerChoiceVp = soloChoiceVps.reduce((p, c) => {
        return p < c ? c : p;
    });
    const winnerChoice = choiceVps.findIndex(e => e.vp === winnerChoiceVp);
    return winnerChoice;
};
exports.getWinnerIndexFromChoices = getWinnerIndexFromChoices;
//# sourceMappingURL=util.js.map