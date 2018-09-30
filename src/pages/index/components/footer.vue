<template lang="pug">
  footer
    div(v-for="item in list" :style="{'width':100/list.length+'%'}" class="footer-item"
    :class="{'footer-item-act':route === item.routename}"
    @click="Jump(item.routename)") {{item.name}}
</template>

<script>
import { TAB_LIST } from '../assets/js/config'

export default {
	name: '',
	data() {
		return {
			route: '',
			list: []
		}
	},
	props: [],
	computed: {},
	created() {
		this.route = this.$route.name
		this.list = TAB_LIST
	},
	mounted() {},
	methods: {
		Jump(routename) {
			if (routename === this.route) {
				return
			}
			this.$router.push({ name: routename })
		}
	},
	watch: {
		$route(vnew) {
			this.route = vnew.name
		}
	},
	components: {}
}
</script>

<style lang="stylus">
  footer
    display: flex
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    height: 100px
    background-color: #ffffff
    font-size: 36px
    .footer-item
      text-align: center
      height: 100%
      display: flex
      align-items: center
      justify-content: center
    .footer-item-act
      background-color: #d6d6d6

</style>
