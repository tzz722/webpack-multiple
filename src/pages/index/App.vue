<template lang="pug">
  .app-Warp
    router-view(v-if="reloadshow")
    vue-ins-progress-bar
</template>

<script>
export default {
	name: '',
	data() {
		return {
			reloadshow: true
		}
	},
	props: [],
	computed: {},
	created() {
		this.$insProgress.start()
		this.$router.beforeEach((to, from, next) => {
			this.$insProgress.start()
			next()
		})
		this.$router.afterEach((to, from) => {
			this.$insProgress.finish()
		})
	},
	mounted() {
		this.$nextTick(() => {
			this.$insProgress.finish()
		})
	},
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
	components: {}
}
</script>

<style lang="stylus">

</style>
