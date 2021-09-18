import express, { Router } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { index } from './routes'
import { connect, getProposalById } from './db'
import { regenProposalSummary, votesOfProposal } from './voteSum'

export const app =express()
app.use(helmet())
dotenv.config()

const origin = process.env.NODE_ENV === 'production' ? ['https://*.decentraland.org', 'https://dao-data-vis.vercel.app'] : '*'

const corsOptions = {
  origin: origin,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
})
app.use(limiter)

app.use(express.json({ type: 'application/json' }))

app.use(index)

async function testRegen():Promise<void> {
  connect(app)
  .then(async (v:Boolean) => {
    if (v) {
        console.log(await regenProposalSummary('6e3408a0-d38f-11eb-976f-4b50abb26a02', app))
    }
  })
}

dotenv.config()
const port = process.env.PORT

app.listen(port, () => {
  console.log(`Serving on ${port}`)
})

testRegen()

module.exports = { app }
