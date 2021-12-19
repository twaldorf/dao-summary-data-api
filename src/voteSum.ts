import { Application } from "express";
import { Collection } from "mongodb";
import { getProposalById, getProposalSummary } from "./db";
import { RawProposal, CleanProposal } from "./types";
import { getChoicesWithVp, getWinnerIndexFromChoices } from "./util";

//get proposals from db from array of IDs (25 at a time):array of proposals

//TODO include checkout/update timeout to avoid regenerating inactive proposals

export const votesOfProposal = async (proposalId:String, app:Application) => {
    const votesOf = await app.locals.database.collection(app.locals.votesCollectionName).find({proposal_id: proposalId}).toArray()
    return votesOf
}

export const genCleanProposal = async (rawProposal:RawProposal, app:Application):Promise<CleanProposal> => {
    const { user, id } = rawProposal
    const { name, body, end } = rawProposal.snapshot_proposal
    const choices = rawProposal.configuration.choices
    const votes = await votesOfProposal(id, app)
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
    }
}

// regen the proposal summary, or generate for the first time if it doesn't exist in summaryDb
export const regenProposalSummary = async (proposalId:string, app:Application):Promise<CleanProposal> => {
    // get raw proposal from id (from request parameters)
    const proposalRaw = await getProposalById(proposalId)

    // gen and get a clean proposal if the raw proposal exists in the db, else null
    let proposal = proposalRaw ? await genCleanProposal(proposalRaw, app) : null

    if (proposal) {
        const choicesWithVp = getChoicesWithVp(proposal)
        console.log(choicesWithVp)
        proposal.info.choiceVps = choicesWithVp
    } else {
        throw('no such proposal')
    }

    // const winnerChoiceIndex = getWinnerIndexFromChoices(proposal.info.choiceVps)
    await app.locals.database.collection(app.locals.summariesCollectionName).insertOne(proposal)
    const summary = await getProposalSummary(proposalId)
    return summary
}

module.exports = { votesOfProposal, regenProposalSummary }
