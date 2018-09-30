<template lang='pug'>
    .family-bind-phone
        .family-phone
            md-field
                md-input-item(ref="input0"
                title="手机"
                placeholder="请输入手机号"
                :maxlength="11")
                md-input-item(ref="input0"
                title="验证码"
                placeholder="请输入验证码"
                :maxlength="6")
                    div(class="getCode" slot="right")
                        div 获取验证码
        .family-btn
            md-button(@click="greet") 确认
</template>
<script>
import { InputItem, Field, FieldItem, Button } from 'mand-mobile'
export default {
	name: '',
	data() {
		return {}
	},
	props: [],
	computed: {},
	created() {},
	mounted() {},
	methods: {},
	watch: {},
	components: {
		[Button.name]: Button,
		[FieldItem.name]: FieldItem,
		[InputItem.name]: InputItem,
		[Field.name]: Field
	}
}
</script>

<style lang="stylus" scoped>
    .phone-line
        .md-field-item-title
            width 170px
        input
            width 100%
            height 100%
    .getCode
        height 100%
        padding 0 20px
        display flex
        justify-content center
        align-items center
        font-size 23px
        white-space nowrap
        color mainBlue
        position absolute
        right 0
    .family-btn
        padding 30px 20px
</style>
