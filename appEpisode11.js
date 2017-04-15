// Main app


Vue.component('tabs', {

	template: `
		<div>
			<ul class="nav nav-pills">
				<li v-for="t in tabs" :class="{ active: t.isActive }">
					<a :href="t.href" @click="selectTab( t )"> {{ t.name }}</a>
				</li>
			</ul>
			<div class="tab-content">
				<slot></slot>
			</div>
		</div>
		`,
	data() {
		return {
			tabs: []
		}
	},
	created() {
		this.tabs = this.$children;
	},
	methods: {
		selectTab( selectTab ) {
			this.tabs.forEach( tab => {
				tab.isActive = ( tab.name === selectTab.name )
			});
		}
	}
})

Vue.component('tab', {
	template: `<div v-show="isActive"><slot></slot></div>`,
	props: {
		name: { required: true },
		selected: { default: false }
	},
	data: function() {
		return {
			isActive: false
		}
	},
	mounted() {
		this.isActive = this.selected
	},
	computed: {
		href() {
			return "#" + this.name.toLowerCase().replace(/ /g, '-');
		}
	}
})

var app = new Vue({
	el: "#root"
});