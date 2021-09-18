## DAO Summary Data API
The purpose of this API is to act as a responsive read-only data interface for scenes and dashboards building on top of Decentraland DAO data info. 

The API consumes the dcl singer tap and turns the collection of votes and proposals into a meaningful set of summarized proposals with status and VP counts.

This API prevents every scene from doing basic analysis like "what votes are associated with a proposal ID?" and "which choice won x proposal?" with data directly from the governance API. It also allows dashboards to do bigger analysis across all votes and all proposals without loading all data.

## Routes
`/index` returns 200
`/proposal?id=`