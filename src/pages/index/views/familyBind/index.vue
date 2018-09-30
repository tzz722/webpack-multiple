<template lang="pug">
    .my-family
        .hint 添加家人，帮家人使用预约挂号等医疗服务
        .family-list
            .family-item(v-for="item in list" @click="junmToDetail")
                .family-img
                    img(:src="item.img")
                    .family-status {{item.status}}
                .family-role {{item.role}}
                .family-info
                    span {{item.name}}
                    span {{item.age}}岁
            .family-add(@click="junmToAdd")
                img(class="family-add-img" src="../../assets/image/familyBind/add.png")
</template>

<script>
import son from '../../assets/image/familyBind/son.png'
import dauther from '../../assets/image/familyBind/dauther.png'
import mother from '../../assets/image/familyBind/mother.png'
import father from '../../assets/image/familyBind/father.png'
import other from '../../assets/image/familyBind/other.png'
export default {
	name: 'familyBind-index',
	data() {
		return {
			info: '',
			list: '',
			roleImg: ''
		}
	},
	props: [],
	computed: {},
	created() {},
	mounted() {
		this.list = [
			{ img: son, name: '张三', age: '2', role: '儿子', status: '未认证' },
			{ img: dauther, name: '李四', age: '3', role: '女儿', status: '未认证' },
			{
				img: mother,
				name: '王五',
				age: '4',
				role: '妈妈',
				status: '实名待认证'
			},
			{ img: father, name: '赵六', age: '5', role: '爸爸', status: '未认证' }
		]
	},
	methods: {
		junmToDetail() {
			this.$router.push({ name: 'familyBind-detail' })
		},
		junmToAdd() {
			this.$router.push({ name: 'familyBind-add' })
		}
	},
	watch: {},
	components: {}
}
</script>

<style lang="stylus" scoped>
    .my-family
        background-color #F5F5F5
        padding:22px
        .hint
            color fontColor
            font-size 24px
        .family-list
            margin-top 10px
            display flex
            justify-content space-between
            flex-flow wrap
            .family-item, .family-add
                background-color white
                height: 340px;
                width 340px
                margin-top 16px
                border-radius 5px
            .family-item
                text-align center
                font-size 24px
                line-height 24px
                padding 28px
                >div
                    width 100%
                .family-img
                    margin 0 auto
                    position relative
                    width 180px
                    height 180px
                    img
                        width 100%
                    .family-status
                        position absolute
                        bottom 0
                        left 50%
                        transform translate(-50%,10%)
                        color #FF8400
                        background-color #FFF3E6
                        border 1px solid #FF8400
                        border-radius 14px
                        line-height 30px
                        padding 0 15px
                        white-space nowrap
                .family-role
                    color mainFontColor
                    margin-top 20px
                .family-info
                    margin-top 15px
                    color fontColor
                    span
                        margin 0 5px
            .family-add
                display flex
                justify-content center
                align-items center
                .family-add-img
                    width 80px
                    height 80px


</style>
