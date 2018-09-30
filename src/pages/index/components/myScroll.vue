<template lang="pug">
  .scroll-wrapper(ref="wrapper")
    .scroll-content
      div(ref="listWrapper")
        slot
        .pullup-wrapper(v-if="pullUpLoad")
          .before-trigger(v-if="!isPullUpLoad")
            div {{pullUpTxt}}
          .after-trigger(v-else)
            <!--div 加载中...-->
            scrollLoading
    .pulldown-wrapper(:style="pullDownStyle + ';height:' + pullDownStop + 'px'" v-if="pullDownRefresh")
      .before-trigger(v-if="beforePullDown")
        load-step(:y="imgY" :maxY="pullDownStop")
      .after-trigger(v-else)
        div(v-if="isPullingDown")
          img(src="../assets/image/load/run.gif")
        div(v-else)
          load-step(finishBack='3' :y="imgY" :maxY="pullDownStop")
</template>

<script>
import BScroll from 'better-scroll'
import scrollLoading from './scrollLoading'
import loadStep from './loadStep'

export default {
	name: 'main-scroll',
	data() {
		return {
			beforePullDown: true,
			isPullingDown: false,
			isPullUpLoad: false,
			pullUpDirty: true,
			overPullUpLoad: false,
			bubbleY: 0,
			pullDownStyle: '',
			width: document.body.clientWidth,
			imgY: 0
		}
	},
	props: {
		options: {
			type: Object,
			default() {
				return {}
			}
		},
		listenScroll: {
			type: Boolean,
			default: false
		},
		direction: {
			type: String,
			default: 'horizontal'
		},
		listenBeforeScroll: {
			type: Boolean,
			default: false
		},
		refreshDelay: {
			type: Number,
			default: 20
		}
	},
	computed: {
		pullDownStop() {
			return (this.options.pullDownRefresh.stop * this.width) / 320
		},
		pullDownInitTop() {
			return -this.pullDownStop
		},
		pullUpLoad() {
			return this.options.pullUpLoad
		},
		pullDownRefresh() {
			return this.options.pullDownRefresh
		},
		pullUpTxt() {
			const pullUpLoad = this.pullUpLoad
			const txt = pullUpLoad && pullUpLoad.txt
			const moreTxt = (txt && txt.more) || ''
			const noMoreTxt = (txt && txt.noMore) || ''
			return this.pullUpDirty ? moreTxt : noMoreTxt
		}
	},
	created() {},
	mounted() {
		this.$nextTick(() => {
			this.initScroll()
		})
	},
	methods: {
		initScroll() {
			if (!this.$refs.wrapper) {
				return
			}
			this.calculateMinHeight()
			let options = Object.assign(
				{},
				{
					scrollY: this.direction === 'horizontal',
					scrollX: this.direction === 'vertical',
					observeDOM: true,
					click: true,
					probeType: 1,
					scrollbar: false,
					pullDownRefresh: false,
					pullUpLoad: false
				},
				this.options
			)
			if (options.pullDownRefresh.stop)
				options.pullDownRefresh.stop = this.pullDownStop
			this.scroll = new BScroll(this.$refs.wrapper, options)

			if (this.listenScroll) {
				this.scroll.on('scroll', pos => {
					this.$emit('scroll', pos)
				})
			}

			if (this.listenBeforeScroll) {
				this.scroll.on('beforeScrollStart', () => {
					this.$emit('before-scroll-start')
				})
			}

			if (this.pullDownRefresh) {
				this.initPullDownRefresh()
			}

			if (this.pullUpLoad) {
				this.initPullUpLoad()
			}
		},
		disable() {
			this.scroll && this.scroll.disable()
		},
		enable() {
			this.scroll && this.scroll.enable()
		},
		refresh() {
			this.calculateMinHeight()
			this.scroll && this.scroll.refresh()
		},
		destroy() {
			this.scroll.destroy()
		},
		scrollTo() {
			this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
		},
		scrollToElement() {
			this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
		},
		clickItem(item) {
			this.$emit('click', item)
		},
		forceUpdate(dirty, callback) {
			if (this.pullDownRefresh && this.isPullingDown) {
				this.isPullingDown = false
				this.reboundPullDown().then(() => {
					this.afterPullDown(dirty, callback)
				})
			} else if (this.pullUpLoad && this.isPullUpLoad) {
				this.isPullUpLoad = false
				this.pullUpDirty = dirty
				callback()
				this.scroll.finishPullUp()
				if (dirty) {
					this.refresh()
				} else {
					this.overPullUpLoad = true
				}
			} else {
				dirty && this.refresh()
			}
		},
		calculateMinHeight() {
			if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullUpLoad)) {
				this.$refs.listWrapper.style.minHeight = `${
					this.getRect(this.$refs.wrapper).height
				}px`
			}
		},
		initPullDownRefresh() {
			this.scroll.on('pullingDown', () => {
				this.beforePullDown = false
				this.isPullingDown = true
				this.$emit('pulling-down')
			})

			this.scroll.on('scroll', pos => {
				this.imgY = pos.y
				if (this.beforePullDown) {
					this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
				} else {
					this.bubbleY = 0
				}
				this.pullDownStyle = `top:${pos.y + this.pullDownInitTop}px`
			})
		},
		initPullUpLoad() {
			this.scroll.on('pullingUp', () => {
				if (!this.overPullUpLoad) {
					this.isPullUpLoad = true
					this.$emit('pulling-up')
				}
			})
		},

		reboundPullDown() {
			const stopTime = this.pullDownRefresh.stopTime || 0
			return new Promise(resolve => {
				setTimeout(() => {
					this.scroll.finishPullDown()
					this.isPullingDown = false
					resolve()
				}, stopTime)
			})
		},

		afterPullDown(dirty, callback) {
			setTimeout(() => {
				this.pullDownStyle = `top:${this.pullDownInitTop}px`
				this.beforePullDown = true
				dirty && this.refresh()
				callback()
			}, this.scroll.options.bounceTime || 0)
		},

		getRect(el) {
			return {
				top: el.offsetTop,
				left: el.offsetLeft,
				width: el.offsetWidth,
				height: el.offsetHeight
			}
		}
	},
	watch: {},
	components: {
		scrollLoading,
		loadStep
	}
}
</script>

<style lang="stylus">
  .scroll-wrapper
    position relative
    height 100%
    overflow hidden
    font-size 14px

  .pulldown-wrapper
    position: absolute
    width: 100%
    left: 0
    display: flex
    justify-content: center
    align-items: flex-end
    .before-trigger
    .after-trigger
      img
        width 100%

  .pullup-wrapper
    display flex
    justify-content center
    align-items center
    height 55px
    .before-trigger
    .after-trigger
      position relative
</style>
