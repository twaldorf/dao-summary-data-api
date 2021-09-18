import { Request, Response } from 'express'
import { getProposalById } from './db'

export const index = (req:Request, res:Response):void => {
    res.status(200).send({response:"Test"})
}

export const proposalSummary = (req:Request, res:Response):void => {
    const id = req.params.id
    const proposal = getProposalById(id)
    res.status(200).send({response:"Test"})
}

module.exports = { index }
