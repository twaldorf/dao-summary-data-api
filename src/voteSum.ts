import { Application } from "express";
import { Collection } from "mongodb";
import { getProposalById } from "./db";
import { RawProposal, CleanProposal } from "./types";
import { getChoicesWithVp, getWinnerIndexFromChoices } from "./util";

//get proposals from db from array of IDs (25 at a time):array of proposals

//TODO include checkout/update timeout to avoid regenerating inactive proposals

export const votesOfProposal = async (proposalId:String, app:Application) => {
    const votesOf = await app.locals.database.collection('dao-votes').find({proposal_id: proposalId}).toArray()
    return votesOf
}

const genCleanProposal = async (rawProposal:RawProposal, app:Application):Promise<CleanProposal> => {
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
            expires: new Date(end)
        },
        votes
    }
}

export const regenProposalSummary = async (proposalId:String, app:Application):Promise<RawProposal> => {
    const proposalRaw = await getProposalById(proposalId)
    let proposal = await genCleanProposal(proposalRaw, app)
    const choicesWithVp = getChoicesWithVp(proposal)
    proposal.info.choiceVps = choicesWithVp
    // const winnerChoiceIndex = getWinnerIndexFromChoices(proposal.info.choiceVps)
    await app.locals.database.collection('summary').insertOne(proposal)
    return app.locals.database.collection('summary').findOne({id: proposalId})
}

module.exports = { votesOfProposal, regenProposalSummary }
