<template lang='pug'>
    .family-detail
        .top-bg
        .detail-box
            .info-box
                .main-info
                    img(src="../../assets/image/familyBind/head-icon.png")
                    .right-info
                        .row1
                            .name 张三
                            img(:src="ssssss")
                            .age 4岁
                        .row2
                            .ship
                                div 关系
                                .selcect-ship(@click="showSelector")
                                    div {{selectorValue}}
                                    .triangle
                                md-selector(v-model="isSelectorShow"
                                :data="roleList"
                                :default-index="0"
                                title="家庭关系"
                                @choose="onSelectorChoose($event)")
                            .parent
                                span 家长
                                span.name 李四
                                span.change 更换
                .id-card 身份证号：3332*******306018
                .phone
                    span 手机号：132119832455
                    span.change 更换
            .card-list
                .card-item(v-for="card in cardlist" :style="{ backgroundColor:checkCard(card.type).color}")
                    .name 周杰杰
                        span.gender 女
                    .card 就诊卡号
                        span.card-num 123456
                    .id-card 身份证号
                        span.card-num 8787978987
                    .tag
                        div(:style="{ color:checkCard(card.type).color}") {{checkCard(card.type).text}}
            .detail-btn
                md-button(@click="junmToAddPhone") 添加就诊卡

</template>

<script>
import { Button, Selector } from 'mand-mobile'
import man from '../../assets/image/familyBind/man.png'
import female from '../../assets/image/familyBind/female.png'
export default {
	name: '',
	data() {
		return {
			ssssss: '',
			cardlist: [{ type: 1 }, 2, 3],
			isSelectorShow: false,
			roleList: [
				{
					text: '女儿'
				},
				{
					text: '儿子'
				},
				{
					text: '孙子'
				}
			],
			selectorValue: ''
		}
	},
	props: [],
	computed: {},
	created() {},
	mounted() {
		this.ssssss = man
		this.initSelect()
	},
	methods: {
		initSelect() {
			this.selectorValue = this.roleList[0].text
		},
		showSelector() {
			this.isSelectorShow = true
		},
		onSelectorChoose({ text }) {
			this.selectorValue = text
		},
		checkCard(type) {
			return type === 1
				? {
						color: '#4787FF',
						text: '医保卡'
				  }
				: {
						color: '#1CD169',
						text: '健康卡'
				  }
		}
	},
	watch: {},
	components: {
		[Button.name]: Button,
		[Selector.name]: Selector
	}
}
</script>

<style lang="stylus">
    .top-bg
        background-color mainBlue
        height 256px
    .detail-box
        padding 0 30px 30px
    .info-box
        margin-top -200px
        padding 30px
        background-color white
        border-radius 10px
        .main-info
            display flex
            img
                width 120px
                height 120px
            .right-info
                padding 15px 0
                margin-left 20px
                display flex
                flex-flow wrap
                >div
                    width 100%
                .row1
                    display flex
                    align-items center
                    .name
                        font-size 32px
                    .age
                        font-size 24px
                        margin-left 10px
                    img
                        width 30px
                        height 30px
                        margin-left 10px
                .row2
                    font-size 28px
                    display flex
                    align-items center
                    margin-top 10px
                    .ship
                        display flex
                        align-items center
                        .selcect-ship
                            font-size 24px
                            margin-left 15px
                            padding 5px
                            border 1px solid #666666
                            border-radius 10px
                            display flex
                            align-items center
                            .triangle
                                margin-top 8px
                                margin-left 5px
                                border-width: 8px;
                                border-style: solid;
                                border-color: #D4D1D1 transparent  transparent transparent;
                    .parent
                        margin-left 30px
                        span
                            margin-left 15px
        .id-card
            padding 15px 30px
            background-color backgroundColor
            border-radius 30px
            margin-top 20px
        .phone
            margin-top 20px
            padding 10px 30px
            .change
                margin-left 15px
    .change
        color themeColor
    .card-list
        margin-top 30px
        .card-item
            margin-top 20px
            padding 30px
            color white
            font-size 24px
            border-radius 10px
            position relative
            span
                margin-left 15px
            .name
                font-size 26px
                span
                    margin-left 25px
                    font-size 24px
            .card
                margin-top 30px
            .id-card
                margin-top 20px
            .tag
                position absolute
                right 20px
                top 20px
                background-color rgba(255,255,255,0.5)
                transform: skew(-10deg);
                padding 5px 7px
                >div
                    font-size 22px
                    transform: skew(10deg);
    .detail-btn
        margin-top 30px
</style>
