<template lang='pug'>
	.drug-info
		.title 药品明细
		.drug-list
			.drug-item
				div 通用名
				div 数量
				div 价格
			.drug-item(v-for="n in 20")
				div 氨氯地平阿托他汀钙片
				div 1瓶
				div ￥66.60
		.drug-prize-count 订单总额：
			sapn ￥5555.22
</template>
<script>
export default {
	name: '',
	data() {
		return {}
	},
	props: ['drugList'],
	computed: {},
	created() {},
	mounted() {},
	methods: {},
	watch: {},
	components: {}
}
</script>

<style lang="stylus" scoped>
	.drug-info
		background-color white
		.title
			padding 20px 30px
		.drug-list
			text-align center
			padding 0 30px 20px
			border-bottom 1px solid mainBorder
			.drug-item
				display flex
				align-items center
				>div
					overflow-wrap: break-word;
					padding 15px 10px
				>div:nth-child(1)
					width 50%
				>div:nth-child(2)
					width 15%
				>div:nth-child(3)
					width 35%
		.drug-prize-count
			padding 20px 30px
			text-align right
			sapn
				color red
</style>
