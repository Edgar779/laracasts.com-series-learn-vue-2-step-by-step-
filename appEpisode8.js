// Main app


Vue.component('jumbotron', {
	props: {
		title: '',
		body:''
	},
	template: `
		<div class="jumbotron">
			<button @click="$emit('close')">x</button>
  			<h1>{{ title }}</h1>
  			<p> {{ body }}</p>
		</div>`,
	data() {
		return {
			isVisible: true
		}
	}
})

var app = new Vue({
	el: "#root",
	data: {
		jumbotronVisible: false
	},
	methods: {
		showJumbotron() {
			this.jumbotronVisible = true;
		}
	}
});