<template lang="pug">
  .loader
    .dot
    .dot
    .dot
    .dot
    .dot
</template>
<script>
export default {
	data() {
		return {
			showStr: true
		}
	},
	components: {},
	methods: {
		show() {
			this.showStr = true
		},
		hide() {
			this.showStr = false
		}
	}
}
</script>

<style lang="stylus" scoped>
  /*.loader
    position absolute
    top 50%
    left 50%
    transform translate3d(-50%,-50%,0)
    display flex
  .dot
    width 24px
    height 24px
    background #3ac
    border-radius 100%
    display inline-block
    animation slide 1s infinite

  for n in (1..5)
    .dot:nth-child({n})
      animation-delay (.1s * n)
      background red(#3ac, (50 * n))

  @keyframes slide
    0%
      transform scale(1)
    50%
      opacity .3
      transform scale(2)
    100%
      transform scale(1)*/
</style>
