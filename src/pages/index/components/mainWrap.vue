<template lang="pug">
  div
    my-header
    section
      transition(:name="transitionName")
        slot(class="main-slot")
    my-footer
</template>

<script>
import { mapState } from 'vuex'
import MyHeader from './header'
import MyFooter from './footer'

export default {
	name: '',
	data() {
		return {
			reloadshow: true,
			allowedtransition: true,
			showmask: false
		}
	},
	props: ['header', 'footer'],
	computed: {
		...mapState({
			direction: state => state.transition.direction
		}),
		transitionName() {
			return this.allowedtransition
				? this.direction === 'forward'
					? 'in'
					: 'out'
				: ''
		}
	},
	created() {},
	mounted() {},
	methods: {
		reloadView() {
			this.reloadshow = false
			this.allowedtransition = false
			this.$nextTick(() => {
				this.reloadshow = true
				setTimeout(() => {
					this.allowedtransition = true
				}, 1000)
			})
		}
	},
	watch: {},
	components: {
		MyHeader,
		MyFooter
	}
}
</script>

<style lang="stylus">
  section
      position: absolute
      top 80px
      bottom 100px
      width 100%
      overflow-y scroll

  .out-enter-active
  .out-leave-active
  .in-enter-active
  .in-leave-active
      will-change transform
      transition all 250ms
      // height 100%
      position absolute
      top 0
      width 100%
      backface-visibility hidden
      perspective 1000

  .out-enter
      opacity 0
      transform translate3d(-100%, 0, 0)

  .out-leave-active
      opacity 0
      transform translate3d(100%, 0, 0)

  .in-enter
      opacity 0
      transform translate3d(100%, 0, 0)

  .in-leave-active
      opacity 0
      transform translate3d(-100%, 0, 0)
</style>
