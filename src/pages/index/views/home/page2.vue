<template lang="pug">
  .lazy(v-lazy-container="{ selector: 'img' }")
    div(v-for="n in 10")
      img(:data-src="img")
</template>

<script>
import img from '../../assets/image/welcome.png'
export default {
	name: 'page2',
	data() {
		return {
			img: img
		}
	},
	props: [],
	computed: {},
	created() {},
	async mounted() {
		async function a() {
			return new Promise((resolve, reject) => {
				reject('挂了')
			})
		}
	},
	methods: {
		back() {
			this.$router.back()
		}
	},
	watch: {},
	components: {}
}
</script>

<style lang="stylus" scoped>
  .lazy{
    img{
      width 300px
      height 350px
      vertical-align middle
    }
  }
</style>
