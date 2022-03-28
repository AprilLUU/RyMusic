import { HYEventStore } from 'hy-event-store'
import { getRankings } from  '../service/api_music'

const rankingMap = {
  0: 'newRanking',
  1: 'hotRanking',
  2: 'originRanking',
  3: 'upRanking'
}

const rankingStore = new HYEventStore({
  state: {
    newRanking: {},
    hotRanking: {},
    originRanking: {},
    upRanking: {}
  },
  actions: {
    getRankingDataAction(ctx) {
      for (let i = 0; i < 4; i++) {
        getRankings(i).then(
          res => {
            const rankingName = rankingMap[i]
            ctx[rankingName] = res.playlist
            //#region 
            // switch(i) {
            //   case 0:
            //     // console.log('新歌榜', res)
            //     ctx.newRanking = res.playlist
            //     break
            //   case 1:
            //     // console.log('热门榜', res)
            //     ctx.hotRanking = res.playlist
            //     break
            //   case 2:
            //     // console.log('原创榜', res)
            //     ctx.originRanking = res.playlist
            //     break             
            //   case 3:
            //     // console.log('飙升榜', res)
            //     ctx.upRanking = res.playlist
            //     break
            // }
            //#endregion
          }
        )
      }
    }
  }
})

export {
  rankingStore,
  rankingMap
}