import { application, Application } from 'express'
import { Collection, Db, MongoClient, MongoDBNamespace } from 'mongodb'
import { CleanProposal, RawProposal } from './types'
import { regenProposalSummary } from './voteSum'

const client = new MongoClient('mongodb://localhost:27017')
let app:Application

export async function connect(appObject:Application):Promise<Db|Boolean> {
    const dbName = appObject.locals.dbName
    try {
      await client.connect()
      const database = client.db(dbName)
      appObject.locals.database = database
      app = appObject
      return database
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

export const getProposalById = async (proposalId:String):Promise<RawProposal|null> => {
    const proposals = app.locals.database.collection(app.locals.proposalsCollectionName)
    const proposal = await proposals.findOne({id: proposalId})
    return proposal
}

export async function getProposalSummary (id: string):Promise<CleanProposal> {
    const proposals = app.locals.database.collection(app.locals.summariesCollectionName)
    const proposal = await proposals.findOne({id: id})
    if (!proposal) {
        const regenProposal = await regenProposalSummary(id, app)
        if (regenProposal) {
            return regenProposal
        } else {
            throw('no proposal found')
        }
    }
    return proposal
}

module.exports = { connect, close, getProposalById, getProposalSummary }
