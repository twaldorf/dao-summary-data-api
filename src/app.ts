// const express = require('express')
import express, { Router } from 'express'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { index } from './routes'
import { connect, getProposalById } from './db'
import { votesOfProposal } from './voteSum'

const app = express()
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

//test area
connect(app)
  .then(v => {
    if (v) {console.log(getProposalById('6e3408a0-d38f-11eb-976f-4b50abb26a02'))}
  }
)

module.exports = { app }
