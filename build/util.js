"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWinnerIndexFromChoices = exports.getChoicesWithVp = void 0;
var getChoicesWithVp = function (proposal) {
    var choices = proposal.info.choices;
    var vpByChoice = choices.map(function (choice, index) {
        var votesFor = proposal.votes.filter(function (v) { return v.choice === index + 1; });
        var totalVotesFor = votesFor.reduce(function (p, c) { return p + c.vp; }, 0);
        return totalVotesFor;
    });
    var choicesWithVp = choices.map(function (choice, index) {
        return {
            name: choice,
            vp: vpByChoice[index]
        };
    });
    return choicesWithVp;
};
exports.getChoicesWithVp = getChoicesWithVp;
var getWinnerIndexFromChoices = function (choiceVps) {
    var soloChoiceVps = choiceVps.map(function (choice) { return choice.vp; });
    var winnerChoiceVp = soloChoiceVps.reduce(function (p, c) {
        return p < c ? c : p;
    });
    var winnerChoice = choiceVps.findIndex(function (e) { return e.vp === winnerChoiceVp; });
    return winnerChoice;
};
exports.getWinnerIndexFromChoices = getWinnerIndexFromChoices;
