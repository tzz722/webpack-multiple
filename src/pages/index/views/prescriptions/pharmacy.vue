<template lang='pug'>
	.prescription-pharmacy
		md-tab-bar(@indexChanged="changeMainTab"
		:show-ink-bar="false")
			div 综合排序
			#prize 价格从低到高
			div 离我最近
			<!--div 好评优先-->
		.prescription-box
			.prescription-num 处方号 ：41564566456
			.prescription-list
				.title 处方用药：
				.table
					.table-title
						div 通用名
						div 厂家
						div 规格
						div 数量
					.table-content
						.table-item
							div 氨氯地平阿托他汀钙片
							div 辉瑞制药有限公司
							div 5mg/10mg*7s
							div 1瓶
		<!--.hint-->
			<!--div 以下药店离您最近，如需查看更多药店，请点击-->
			<!--md-icon(name="arrow-right")-->
		.pharmacy-list
			.title
				div 快乐大药房
				md-icon(name="arrow-right" size="lg")
			.pharmacy-item
				md-radio(ref="radio"
				:options="data"
				:default-index="0"
				icon="circle-right"
				icon-inverse="circle"
				icon-position="left"
				icon-size="md"
				is-slot-scope
				@change="getChange")
					.radio-item
						#address 中和北路店话那就开始的海南鸡卡上的就看撒好的借口 320m
						#price
							div 合计：
								span ￥66.60
							#show-info(@click="jumpToInfo") 价格明细
		md-button.submit(@click="jumpToOrderInfo") 确认
		md-icon.close(v-if="showMore" name="hollow-plus"  color="white")
		md-popup.showMore(v-model="showMore"
		:hasMask="true"
		position="left")
			drug-info.popup-drug
</template>
<script>
import { TabBar, Icon, Radio, Button, Popup } from 'mand-mobile'
import DrugInfo from './components/drugInfo'
export default {
	name: '',
	data() {
		return {
			data: [{ text: '选项1' }, { text: '选项2' }],
			showMore: false
		}
	},
	props: [],
	computed: {},
	created() {},
	mounted() {},
	methods: {
		changeMainTab(index, preIndex) {
			console.log(index)
		},
		jumpToInfo() {
			this.showMore = true
		},
		getChange(option, index) {
			console.log(index)
		},
		jumpToOrderInfo() {
			this.$router.push({ name: 'prescriptions-order' })
		}
	},
	watch: {},
	components: {
		DrugInfo,
		[Popup.name]: Popup,
		[TabBar.name]: TabBar,
		[Icon.name]: Icon,
		[Radio.name]: Radio,
		[Button.name]: Button
	}
}
</script>

<style lang="stylus" >
	.prescription-pharmacy
		padding-bottom btnPadding
		.md-tab-bar
			border-bottom 1px solid mainBorder
			overflow hidden
		.prescription-box
			background-color white
			font-size 28px
			border-top 1px solid mainBorder
			border-bottom 1px solid mainBorder
			margin-top 20px
			>div
				padding 30px 30px
			.prescription-num
				font-size 28px
				border-bottom 1px solid mainBorder
			.table
				font-size 26px
				margin-top 20px
				.table-title,.table-item
					display flex
					/*border 1px solid mainBorder*/
					>div
						line-height 50px
						text-align center
						width 25%
						padding 0 10px
						/*border-right  1px solid mainBorder*/
				.table-item
					>div
						text-align center
						&:last-child
							text-align center
		.hint
			display flex
			align-items center
			justify-content flex-end
			color mainBlue
			padding 20px 30px
		.pharmacy-list
			margin-top 20px
			background-color white
			border-top  1px solid mainBorder
			border-bottom 1px solid mainBorder
			.title
				display flex
				align-items center
				font-size 40px
				padding 20px 0
				margin 0 30px
				border-bottom 1px solid mainBorder
			.pharmacy-item
				.md-field-item-inner
					padding 15px 0!important
				.md-radio-content
					width 100%
				.radio-item
					display flex
					justify-content space-between
					align-items center
				#price
					white-space nowrap
					color mainFontColor
					span
						color red
					#show-info
						color mainBlue
						text-align right
						margin-top 10px
		.submit
			border-radius 0
			position fixed
			bottom 0
		.close
			position fixed
			right 40px
			top 50%
			width 80px
			height 80px
			transform translate(0,-50%) rotate(45deg)
			z-index 9999
			pointer-events: none;
		.showMore
			.md-popup-box
				height 100%
				width 580px
</style>
