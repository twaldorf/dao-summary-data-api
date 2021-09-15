import { Request, Response } from 'express'

export const index = (req:Request, res:Response):void => {
    res.status(200).send({response:"Test"})
}

module.exports = { index }