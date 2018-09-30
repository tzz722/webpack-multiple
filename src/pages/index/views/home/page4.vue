<template lang="pug">
    main-wrap
        .open(@click="tzz") 打开
</template>

<script>
export default {
	name: 'page4',
	data() {
		return {}
	},
	props: [],
	computed: {},
	created() {},
	mounted() {},
	methods: {
		tzz() {
			this.JB.register(
				'tttt',
				{
					type: 'page',
					page: '123',
					data: { a: '1' }
				},
				data => {
					this.JB.call('getData', data)
				}
			)
			this.JB.send('tttt')
			window.JSBridge.call('tttt', '111')
			console.log(this.crypto.HmacSHA1('Message', '11').toString())
			console.log(this.numeral(1000).format('0,0'))
			console.log(this.moment('2018/08/08').format('llll'))
		}
	},
	watch: {},
	components: {}
}
</script>

<style lang="stylus" scoped>
  .item
    background-color: teal;
    text-align: center;
    height: 100%;

  .open
    font-size 100px
    color blueviolet
    text-align center
    margin-top 200px

</style>
