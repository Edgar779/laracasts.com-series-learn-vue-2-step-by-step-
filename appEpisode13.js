// Main 

window.Event = new Vue();

Vue.component('coupon',{
	template: `
		<input placeholder="code" @blur="onCouponApplied" />
	`,
	methods: {
		onCouponApplied() {
			//this.$emit('applied')
			Event.$emit('applied');
		}
	}
})

var app = new Vue({
	el: "#root",
	data: {
		name: "Alejandro"
	},
	created: function() {
		Event.$on('applied', function() {
			console.log('applied')
		})
	}
})
