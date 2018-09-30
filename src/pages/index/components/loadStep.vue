<template lang="pug">
  .load-step
    .show-img
      img(ref='img')
    .hide-img(ref="hideImg")
      img(src="../assets/image/load/1.png")
      img(src="../assets/image/load/2.png")
      img(src="../assets/image/load/3.png")
      img(src="../assets/image/load/4.png")
      img(src="../assets/image/load/5.png")
      img(src="../assets/image/load/6.png")
      img(src="../assets/image/load/7.png")
      img(src="../assets/image/load/8.png")
</template>

<script>
export default {
	name: '',
	data() {
		return {
			minheight: 0
		}
	},
	props: ['y', 'maxY', 'finishBack', 'isRun'],
	computed: {},
	created() {},
	mounted() {
		this.imglist = [].slice.call(this.$refs.hideImg.querySelectorAll('img'))
		this.imglenth = this.imglist.length
		this.inititem = -1 // 防止重复触发更换图片
	},
	methods: {
		changeSrc(actitem) {
			if (this.inititem === actitem) return
			this.$refs.img.src = this.imglist[actitem].src
			this.inititem = actitem
		}
	},
	watch: {
		y(vnew) {
			let changeIndex = () => {
				if (vnew <= this.minheight) {
					this.changeSrc(0)
				} else if (vnew >= this.minheight + this.maxY) {
					this.changeSrc(this.imglenth - 1)
				} else {
					let index = Math.floor(
						((vnew - this.minheight) / this.maxY) * this.imglenth
					)
					if (this.finishBack >= index) {
						this.changeSrc(this.finishBack)
						return
					}
					this.changeSrc(index)
				}
			}
			if (this.finishBack) {
				changeIndex()
			} else {
				if (vnew > 0) {
					changeIndex()
				}
			}
		}
	},
	components: {}
}
</script>

<style lang="stylus" scoped>
  .load-step {
    width 100%
    img {
      width 100%
    }
    .show-img {
      display flex
      justify-content center
      align-items center
    }
    .hide-img {
      display none
    }
  }
</style>
