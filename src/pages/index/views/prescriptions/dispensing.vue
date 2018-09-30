<template lang='pug'>
	.prescription-dispensing
		.QR-code-box
			.title 审核成功！凭取药码在XXX药店取药。
			.QR-code-img
					img(:src="qrcodeBase64")
		.info
			.order-info
				#order-num 订单号：2130812381321
				#address 取药地址：浙江省杭州市下城区中河北路220号
				#time 取药时间：2018-09-08
				#prize 订单总额：
					span ￥66.60
			.drug-info
				.title 药品明细
				.drug-list
					.drug-item
						div 通用名
						div 数量
						div 价格
					.drug-item(v-for="n in 5")
						div 氨氯地平阿托他汀钙片
						div 1
						div ￥66.60
</template>
<script>
import QRCode from 'qrcode'
export default {
	name: '',
	data() {
		return {
			qrcodeBase64: ''
		}
	},
	props: [],
	computed: {},
	created() {},
	mounted() {
		this.makeQrcode('SADSAADSHJASJHDASJHDAKJSDA')
	},
	methods: {
		// 生成二维码
		makeQrcode(orderNum) {
			let opts = {
				errorCorrectionLevel: 'H',
				type: 'image/jpeg',
				margin: 0,
				color: {
					light: '#ffffff',
					dark: '#404040'
				}
			}
			QRCode.toDataURL(orderNum.toString(), opts)
				.then(url => {
					this.qrcodeBase64 = url
				})
				.catch(err => {
					console.error(err)
				})
		}
	},
	watch: {},
	components: {}
}
</script>

<style lang="stylus" >
	.prescription-dispensing
		.QR-code-box
			padding 50px 0
			text-align center
			background-color white
			border-bottom  1px solid mainBorder
			.title
				font-size 32px
				color #E51C23
			.QR-code-img
				width 450px
				height 450px
				border 1px solid mainBorder
				padding 10px
				margin 0 auto
				margin-top 40px
				img
					width 100%
		.info
			margin-top 20px
			.order-info
				font-size 28px
				padding 20px 30px
				background-color white
				margin-top 20px
				border-top 1px solid mainBorder
				border-bottom 1px solid mainBorder
				line-height 50px
				#prize span
					color red
			.drug-info
				background-color white
				border-bottom 1px solid mainBorder
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

</style>
