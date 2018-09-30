<template lang='pug'>
	.prescription-index
		md-tabs.main-tab(:titles="titles" @indexChanged="changeMainTab")
			div(v-for="(title, index) of titles" :key="index")
				.order-not-check(v-if="title === '待处理处方'")
					.order-item(v-for="item in orderNoChecked" @click="jumpToPharmacyInfo")
						md-field
							md-field-item(name="hos"
							title="台州市人民医院"
							align="right"
							value="2018-08-01")
							md-field-item(name="prescription"
							arrow="arrow-right"
							align="right"
							:value="selectorValue")
								div(slot="left") 处方号 1021231
								.order-type 订单未提供
				.order-check(v-if="title === '已处理处方'")
					<!--md-tabs.tabs-checked(:titles="titlesChecked" @indexChanged="changeChildTab")-->
						div(v-for="(title, index) of titles" :key="index")
							.order-not-check(v-if="title === '待处理处方'")
								.order-list(v-for="item in orderNoChecked")
									md-field.order-item
										md-field-item(name="hos"
										title="台州市人民医院"
										align="right"
										value="2018-08-01")
										.no-checked-content
											div
												#orderNum 订单号：212132145646
												#prescriptionNum 处方号：212132145646
											.order-type 待审核
</template>
<script>
import { Tabs, Field, FieldItem } from 'mand-mobile'
import api from '../../assets/js/api/prescriptions'
export default {
	name: '',
	data() {
		return {
			titles: ['待处理处方', '已处理处方'],
			titlesChecked: ['待审核', '待取药', '已完成', '审核未通过', '全部'],
			orderNoChecked: [],
			orderChecked: []
		}
	},
	props: [],
	computed: {},
	created() {},
	async mounted() {
		this.orderNoChecked = [0, 1]
		this.orderChecked = [0, 1]
		await api.mainSearch(
			{
				KH: 'b06554282'
			},
			() => {
				console.log(1)
			}
		)
	},
	methods: {
		changeMainTab(index, preIndex) {
			console.log(this.titles[index])
		},
		changeChildTab(index, preIndex) {
			console.log(this.titlesChecked[index])
		},
		jumpToPharmacyInfo() {
			this.$router.push({ name: 'prescriptions-detail' })
		}
	},
	watch: {},
	components: {
		[Tabs.name]: Tabs,
		[FieldItem.name]: FieldItem,
		[Field.name]: Field
	}
}
</script>

<style lang="stylus" >
	.prescription-index
		.order-item
			margin-top 20px
			border-top 1px solid mainBorder
			border-bottom 1px solid mainBorder
			>div
				font-size 28px
				line-height 50px
	.no-checked-content
		padding 30px
		display flex
		justify-content space-between
	.order-type
		color mainBlue
</style>
