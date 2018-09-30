<template lang="pug">
	div
		ion-icon(name="alert")
</template>
<script>
export default {
	data() {
		return {}
	},
	computed: {},
	async mounted() {
		this.demo() // 这是一个异步方法
		console.log(1)
		console.log(this.max(1, 2, 3, 4, 5, 6, 7))
		console.log('2.999' | 0)
		let a = true
		console.log(a.toString())
	},
	methods: {
		async demo() {
			try {
				await this.sleep(111)
			} catch (e) {
				console.log(e)
			}
		},
		sleep(wait) {
			return new Promise((res, rej) => {
				setTimeout(function() {
					rej('报错了呢')
				}, 10000)
			})
		},
		max(...x) {
			return x.reduce((m, n) => {
				m < n && (m = n)
				return m
			})
		}
	},
	components: {}
}
</script>

<style lang="stylus" scoped>

</style>
