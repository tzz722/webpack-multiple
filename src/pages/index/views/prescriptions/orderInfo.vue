<template lang='pug'>
	.prescription-order
		md-field.order-item
			md-field-item(title="配送方式："
			align="left")
				md-button(type="ghost-primary") 上门自提
			md-field-item(title="药店门店："
			align="left"
			value="xxxx药店")
			md-field-item(title="取药地址："
			align="left"
			value="浙江省杭州市下城区中河北路220号")
			md-field-item(title="取药时间："
			align="right"
			@click.native="isDatePickerShow = true")
				.choose-time(slot="right") {{datePickerValue}}
					i.time-select
						img(src = "../../assets/image/prescriptions/time.png")
			md-date-picker(ref="datePicker"
			v-model="isDatePickerShow"
			type="date"
			today-text="&(今天)"
			title="选择取药时间"
			:custom-types="['yyyy', 'MM','dd']"
			:default-date="currentDate"
			:minDate="currentDate"
			@confirm="onDatePickerConfirm")
		.drug-warp
			drug-info
		md-action-bar(:actions="data" @click="submitOrder") &yen;0.00
		md-dialog(title="处方外配"
		:closable="true"
		v-model="orderDialog.open"
		:btns="orderDialog.btns") 订单提交成功
</template>
<script>
import {
	Field,
	FieldItem,
	DatePicker,
	ActionBar,
	Button,
	Dialog
} from 'mand-mobile'
import DrugInfo from './components/drugInfo'
export default {
	name: '',
	data() {
		return {
			currentDate: new Date(),
			isDatePickerShow: false,
			datePickerValue: '',
			data: [{ text: '提交订单' }],
			orderDialog: {
				open: false,
				btns: [
					{
						text: '确认',
						handler: ''
					}
				]
			}
		}
	},
	props: [],
	computed: {},
	created() {},
	mounted() {
		this.$nextTick(() => {})
	},
	methods: {
		onDatePickerConfirm(columnsValue) {
			this.datePickerValue = this.$refs.datePicker.getFormatDate('yyyy-MM-dd')
		},
		submitOrder() {
			this.orderDialog.open = true
		}
	},
	watch: {},
	components: {
		DrugInfo,
		[Dialog.name]: Dialog,
		[Button.name]: Button,
		[FieldItem.name]: FieldItem,
		[Field.name]: Field,
		[DatePicker.name]: DatePicker,
		[ActionBar.name]: ActionBar
	}
}
</script>

<style lang="stylus" >
	.prescription-order
		padding-bottom btnPadding
		.choose-time
			display flex
			align-items center
			.time-select
				display inline-block
				img
					width 40px
					margin-top 10px
					margin-left 20px
		.drug-warp
			background-color white
			margin-top 20px
			border-top 1px solid mainBorder
			border-bottom 1px solid mainBorder
		.md-action-bar
			border-top 1px solid mainBorder
		.md-action-bar-text
			width 70%!important
		.md-button-inner
			font-size 28px
			color mainBlue
		.md-button.ghost-primary::after
			border-color mainBlue
</style>
