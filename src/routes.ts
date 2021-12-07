import { Request, Response, NextFunction } from 'express'
import { app } from './app'
import { getProposalById, getProposalSummary } from './db'
import { regenProposalSummary, genCleanProposal } from './voteSum'
import { getRawProposal } from './fetch'

export const index = (req:Request, res:Response, next:NextFunction):void => {
    res.send({response:"Index"})
}

export const proposalSummary = async (req:Request, res:Response):Promise<void> => {
    const id = req.params.id
    const proposal = await getProposalSummary(id)
    if (proposal) {
        const refreshedProposal = proposal.info.updated < proposal.info.expires ? await regenProposalSummary(id, req.app) : proposal
        res.send({proposal: refreshedProposal})
    } else {
        try {
            const newRawProposal = await getRawProposal(id)
            const newClean = await genCleanProposal(newRawProposal, req.app)
            if (newClean) {
                const newProposal = await getProposalSummary(id)
                res.send({proposal: newProposal})
            } else {
                throw('error generating new proposal')
            }
        } catch (e) {e}
    }
    return
}

module.exports = { index, proposalSummary }
