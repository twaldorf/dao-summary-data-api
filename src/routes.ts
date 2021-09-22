import { Request, Response, NextFunction } from 'express'
import { app } from './app'
import { getProposalById, getProposalSummary } from './db'
import { regenProposalSummary } from './voteSum'

export const index = (req:Request, res:Response, next:NextFunction):void => {
    res.send({response:"Test"})
}

export const proposalSummary = async (req:Request, res:Response):Promise<void> => {
    const id = req.params.id
    const proposal = await getProposalSummary(id)
    if (proposal) {
        const refreshedProposal = proposal.info.updated < proposal.info.expires ? await regenProposalSummary(id, req.app) : proposal
        res.send({proposal: refreshedProposal})
    }
    return
}

module.exports = { index, proposalSummary }
