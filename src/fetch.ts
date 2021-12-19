import {get} from 'node:https'
import { RawProposal } from './types'

const url = 'csjdaoisjdaoisdj'

const timeout = 'time'

export const getRawProposal = async (id: String):Promise<any> => {

    get(`https://governance.decentraland.org/api/proposals/${id}`, (res) => {
        console.log('statusCode:', res.statusCode)
        console.log('headers:', res.headers)
    
        res.on('data', (d) => {
            process.stdout.write(d);
        })
    
    }).on('error', (e) => {
        console.error(e)
    })
    
    // console.log(data)
}