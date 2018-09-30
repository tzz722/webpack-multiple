<template lang='pug'>
    .family-add
        .add-identity-card
            .front
                img(src = "../../assets/image/familyBind/id-card-front.png")
                .hint 身份证人像面
            .reverse
                img(src = "../../assets/image/familyBind/id-card-reverse.png")
                .hint 身份证国徽面
        .add-info
            md-field
                md-field-item(name="name"
                title="家庭关系"
                arrow="arrow-down"
                align="left"
                :value="selectorValue"
                class='select-line'
                @click.native="showSelector")
                md-selector(v-model="isSelectorShow"
                :data="roleList"
                :default-index="0"
                title="家庭关系"
                @choose="onSelectorChoose($event)")
                md-input-item(ref="input0"
                title="姓名"
                placeholder="请输入姓名")
                md-input-item(ref="input0"
                title="身份证号"
                placeholder="请输入身份证号"
                :maxlength="18")
        .add-btn
            md-button(@click="junmToAddPhone") 确定
        md-dialog(v-model="clickDialog.open"
        :closable="false"
        :btns="clickDialog.btns"
        class="add-dialog-click")
            .dialog-hint 该家人与未成年人不在同一户籍内
        md-dialog(:title="showDialog.title"
        :closable="false"
        v-model="showDialog.open"
        class="add-dialog-show"
        :mask-closable = "true"
        )
            .dialog-hint 正在核对户籍....
</template>
<script>
import {
	InputItem,
	Field,
	Selector,
	FieldItem,
	Button,
	Dialog
} from 'mand-mobile'

export default {
	name: '',
	data() {
		return {
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
			selectorValue: '',
			clickDialog: {
				open: false,
				btns: [
					{
						text: '确认',
						handler: this.onBasicConfirm
					}
				]
			},
			showDialog: {
				open: true,
				title: '审核中'
			}
		}
	},
	props: [],
	computed: {},
	created() {},
	mounted() {
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
		junmToAddPhone() {
			this.clickDialog.open = true
			setTimeout(() => {
				this.clickDialog.open = false
				// this.$router.push({ name: "familyBind-add-phone" });
			}, 3000)
		}
	},
	watch: {},
	components: {
		[Dialog.name]: Dialog,
		[Button.name]: Button,
		[FieldItem.name]: FieldItem,
		[Selector.name]: Selector,
		[InputItem.name]: InputItem,
		[Field.name]: Field
	}
}
</script>

<style lang="stylus">
    .add-identity-card
        background-color white
        padding 30px 20px
        display flex
        justify-content space-between
        >div
            width 340px
        img
            width 100%
            border-radius 10px
            box-shadow:2px 2px 10px #d6d6d6;
        .hint
            text-align center
            color fontColor
            font-size 24px
            margin-top 15px
    .add-info
        margin-top 30px
    .select-line
        .md-field-item-title
            width 170px
    .add-btn
        padding 30px 20px
    .add-dialog-click
        .md-popup-box
            border-radius 10px
        a
            background-color themeColor
            color white!important
        .dialog-hint
            padding 90px 0
    .add-dialog-show
        .md-dialog-body
            padding 0
        .md-popup-box
            border-radius 10px
        .md-dialog-actions
            display none
        .md-dialog-title
            width 100%
            padding 20px 0
            margin 0
            background-color themeColor
            color white
        .dialog-hint
            padding 70px 0
</style>
