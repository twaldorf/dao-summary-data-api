export interface ChoiceWithVp {
    name: String
    vp: number
}

interface Info {
    title: string,
    author: string,
    description: string,
    choices: Array<string>,
    choiceVps?: Array<ChoiceWithVp>,
    winner?: string | ChoiceWithVp,
    expires: Date,
    updated: Date
}

export interface CleanProposal {
    _id?: string
    id: string
    info: Info
    votes: Array<RawVote>
}

export type RawProposal = typeof import("./exampleRawProposal.json");
export type RawVote = typeof import("./exampleRawVote.json");

export interface Snapshot_Proposal {

}