// pages/home-music/childComponents/area-swiper/index.js
import { queryComponentRect } from '../../../../utils/query-rect'
import { throttle } from '../../../../utils/throttle'

const throttleQueryRect = throttle(queryComponentRect, 1000, { trailing: true })

Component({
  
  properties: {
    banners: {
      type: Array,
      value: []
    }
  },

  data: {
    swiperHeight: 0,
  },

  methods: {
    handleSwiperImageLoaded() {
      //图片加载完成之后获取组件的高度
      throttleQueryRect('.swiper-image', this).then(
        res => {
          this.setData({
            swiperHeight: res.height
          })
        }
      )
      // const timer = setTimeout(() => {
      //   clearTimeout(timer)
      //   throttleQueryRect('.swiper-image', this).then(
      //     res => {
      //       this.setData({
      //         swiperHeight: res.height
      //       })
      //     }
      //   )
      // }, 500)
    },
  }
})
