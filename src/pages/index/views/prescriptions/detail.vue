<template lang='pug'>
.prescription-detail
	.user-hos-info
		.hos 医院：台州市人民医院
		.user
			.person 姓名：
				span#name 苏苏
				span#gender 女
				span#age 18岁
			.hos-card 医保卡号：45645646
			.id-card 身份证号：415646855645
	.prescription-info
		.order-info
			#order-num 处方号：4748596485
			#order-time 2018-8-8
		.diagnosis-info
			.result 诊断结果：流行性感冒
			.drug-info
				.title 药品明细：
				.drug-title
					div 通用名
					div 厂家
					div 规格
					div 数量
				.drug-item
					md-check-list(ref="radio-group"
					:options="options"
					iconPosition="left"
					max="0"
					icon="circle-right"
					iconInverse="circle"
					iconSize="md"
					@change="getChange")
						.radio-item(slot="content" slot-scope="{ option }")
							div 氨氯地平阿托他汀钙片
							div 辉瑞制药有限公司
							div 5mg/10mg*7s
							div 1瓶
		md-button.find-pharmacy(@click="jumpToPharmacy") 搜索药店
</template>
<script>
import { CheckList, Button } from 'mand-mobile'
export default {
	name: '',
	data() {
		return {
			options: [{ value: '选项1' }, { value: '选项2' }, { value: '选项3' }]
		}
	},
	props: [],
	computed: {},
	created() {},
	mounted() {},
	methods: {
		jumpToPharmacy() {
			this.$router.push({ name: 'prescriptions-pharmacy' })
		}
	},
	watch: {},
	components: {
		[CheckList.name]: CheckList,
		[Button.name]: Button
	}
}
</script>

<style lang="stylus" >
	.prescription-detail
		padding-bottom btnPadding
		.user-hos-info
			border-bottom 1px solid mainBorder
			background-color white
			.hos
				padding 20px 30px
				border-bottom 1px solid mainBorder
			.user
				padding 30px 30px
				line-height 50px
				#gender,#age
					margin-left 30px
		.prescription-info
			background-color white
			margin-top 20px
			border-bottom 1px solid mainBorder
			border-top 1px solid mainBorder
			.order-info
				padding 20px 30px
				display flex
				justify-content space-between
				border-bottom 1px solid mainBorder
			.diagnosis-info
				.title,.result
					padding 20px 30px
				.md-radio-content
					width 100%
				.radio-item,.drug-title
					display flex
					width 100%
					>div
						font-size 26px
						overflow-wrap: break-word;
						/*color mainFontColor*/
						width 27.5%
						text-align center
						padding 0 10px
						&:last-child
							width 15%
							text-align center
				.drug-title
					width auto
					margin 0 30px
					padding 20px 0
					padding-left 60px
					border-bottom 1px solid mainBorder
					>div
						text-align center
		.find-pharmacy
			border-radius 0
			position fixed
			bottom 0
</style>
