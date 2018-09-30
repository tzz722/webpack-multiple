<template lang='pug'>
	.catalogue
		.model-box(v-for="model in models" )
			.model-title {{model.name}}
			.model-item(v-for="item in getList(model.name)" @click="jumpToPage(item.name)") {{getTitle(item)}}
</template>
<script>
import { routesList } from '../router'

export default {
	name: 'catalogue',
	data() {
		return {
			models: []
		}
	},
	props: [],
	computed: {},
	created() {},
	mounted() {
		this._.remove(routesList, function(n) {
			return n.name === '项目目录'
		})
		this.models = routesList
	},
	methods: {
		getList(name) {
			let index = this._.findIndex(this.models, { name: name })
			return this.models[index].list
		},
		getTitle(item) {
			let title = (item.meta ? `(${item.meta.title})` : '') || ''
			return item.name + title
		},
		jumpToPage(name) {
			this.$router.push({ name: name })
		}
	},
	watch: {},
	components: {}
}
</script>

<style lang="stylus" scoped>
	.model-box
		border 3px solid themeColor
		margin 30px
		border-radius 20px
		overflow hidden
	.model-title
		text-align center
		padding 30px 0
		font-size 50
		background-color themeColor
		color white
	.model-item
		padding 25px
		background-color white
		border-bottom 1px solid gray
</style>
