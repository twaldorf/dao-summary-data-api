import express, { Router } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { index, proposalSummary } from './routes'
import { connect, getProposalById, getProposalSummary } from './db'
import { regenProposalSummary, votesOfProposal } from './voteSum'

export const app = express()
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

async function testConnect():Promise<void> {
  const db = await connect(app)
  regenProposalSummary("6e3408a0-d38f-11eb-976f-4b50abb26a02", app)
}
// testConnect()

const port = process.env.PORT

app.route('/proposal/:id').get(proposalSummary)
app.get('/', index)

export const server = app.listen(port, () => {
  console.log(`Serving on ${port}`)
})

module.exports = { app, server }
