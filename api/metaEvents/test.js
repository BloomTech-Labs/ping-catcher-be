const threadRankingModel = require("../rankings/threadRankingModel")

async function addMetaEvent({
  res,
  rankResponse,
  slackUser,
  event_key,
  nickname}) {
    let metaResponse
    let addMeta 
    let addThread
    try{
       metaResponse = await MetaEvent.findByText({ event_key })
    }
    catch(err){
      console.log(err)
    }
      if(metaResponse){
        try{
          addThread = await threadRankingModel.add({
            event_id: subResponse.id,
            nickname,
            rankings_id: rankResponse,
            slack_user: slackUser,
            last_accessed: null
          })
          res.status(201)
        }
        catch(err){
          console.log(err)
        }
      } else {
        addMeta = await MetaEvent.add({ event_key })
        addThread = ThreadRanking.add({
          event_id: subResponse.id,
          nickname,
          rankings_id: rankResponse,
          slack_user: slackUser,
          last_accessed: null
        })
        res.status(201)
      }
}