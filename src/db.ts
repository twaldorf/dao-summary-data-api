import { application, Application } from 'express'
import { Collection, Db, MongoClient } from 'mongodb'
import { RawProposal } from './types'

const client = new MongoClient('mongodb://localhost:27017')
let app:Application

export async function connect(appObject:Application):Promise<Boolean> {
    try {
      await client.connect()
      const database = client.db('test')
      appObject.locals.database = database
      app = appObject
      return true
    } catch (e) { 
        console.error(e)
        return false
    } finally {
    //   await client.close()
    }
}

export function close(app:Application):void {
    client.close()
}

export const getProposalById = (proposalId:String):Promise<RawProposal> => {
    const proposals = app.locals.database.collection('dao-proposals')
    const proposal = proposals.findOne({id: proposalId})
    return proposal
}

  module.exports = { connect, close, getProposalById }
