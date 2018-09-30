<template lang="pug">
  .vue-loading(ref="mask")
    .loading-wrap(v-show="showLoading" ref="wrap")
      .loader-inner
        scroll-loading
</template>
<script>
import scrollLoading from './scrollLoading'
export default {
	data() {
		return {
			showLoading: 'true'
		}
	},
	components: {
		scrollLoading
	},
	methods: {
		show(type, option) {
			let defaultColor = {
				maskColor: '#ffffff',
				wrapColor: 'rgba(0, 0, 0, 0)'
			}
			option = Object.assign(defaultColor, option)

			let maskColor = option.maskColor
			let wrapColor = option.wrapColor
			if (type === 'mask') {
				this.showLoading = false
			} else if (type === 'pageLoading') {
				this.$refs.mask.style.backgroundColor = maskColor
			} else {
				this.$refs.wrap.style.backgroundColor = wrapColor
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
  .vue-loading {
    position absolute
    left 0
    right 0
    bottom 0
    top 0
    display flex
    justify-content center
    align-items center
    z-index 99
    .loading-wrap {
      width 100px
      height 100px
      position relative
      padding 20px
      border-radius 10px
    }
  }
  .loader-inner {
    position relative
    width 100%
    height 100%
  }
</style>
