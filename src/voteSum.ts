import { Application } from "express";
import { Collection } from "mongodb";
import { getProposalById } from "./db";
import { RawProposal, CleanProposal } from "./types";
import { getChoicesWithVp, getWinnerIndexFromChoices } from "./util";

//get proposals from db from array of IDs (25 at a time):array of proposals
//x clean proposals into simple proposals:array of simple proposals
//for each proposal
//x find the votes and collect them:add votes to proposal objects
//x find the vp counts for each choice:add choices with vp to proposal objects
//x find the winner of the proposal:add winning choice to proposal objects
//insert each proposal into the summary db

//TODO include checkout/update timeout to avoid regenerating inactive proposals


export const votesOfProposal = async (proposalId:String, app:Application) => {
    const votesOf = await app.locals.database.collection('dao-votes').find({proposal_id: proposalId})
    return votesOf
}

const genCleanProposal = async (rawProposal:RawProposal, app:Application):Promise<CleanProposal> => {
    const { user, id } = rawProposal.data
    const { choices, name, body, end } = rawProposal.data.snapshot_proposal
    const votes = await votesOfProposal(id, app)
    return {
        info: {
            id: id,
            title: name,
            description: body,
            author: user,
            choices,
            expires: new Date(end)
        },
        votes
    }
}

export const regenProposalSummary = async (proposalId:String, votesOf:Object, app:Application) => {
    const proposalRaw = await getProposalById(proposalId)
    let proposal = await genCleanProposal(proposalRaw, app)
    const { choices } = proposal.info
    const choicesWithVp = getChoicesWithVp(proposal)
    proposal.info.choiceVps = choicesWithVp
    const winnerChoiceIndex = getWinnerIndexFromChoices(proposal.info.choiceVps)
    app.locals.database.collection('summary').insert(proposal)
    // summary.insertMany({proposal_id: proposalid, votesOf: votesOf})
}

module.exports = { votesOfProposal }
