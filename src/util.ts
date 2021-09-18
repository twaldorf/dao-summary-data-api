import { ChoiceWithVp, CleanProposal, RawVote } from "./types"

export const getChoicesWithVp = (proposal:CleanProposal):Array<ChoiceWithVp> => {
    const { choices } = proposal.info
    const vpByChoice = choices.map((choice:string, index:number) => {
        const votesFor = proposal.votes.filter((v:RawVote) =>  v.choice === index + 1)
        const totalVotesFor = votesFor.reduce((p:any,c:any) => {return p + c.vp}, 0)
        return totalVotesFor
    })
    const choicesWithVp = choices.map((choice:string, index:number):ChoiceWithVp => {
        return { 
            name: choice,
            vp: vpByChoice[index]
        }
    })
    return choicesWithVp
}

export const getWinnerIndexFromChoices = (choiceVps:Array<ChoiceWithVp>):number => {
    const soloChoiceVps = choiceVps.map(choice => choice.vp)
    const winnerChoiceVp = soloChoiceVps.reduce((p:number,c:number):number => {
        return p < c ? c : p
    })
    const winnerChoice = choiceVps.findIndex(e => e.vp === winnerChoiceVp)
    return winnerChoice
}
