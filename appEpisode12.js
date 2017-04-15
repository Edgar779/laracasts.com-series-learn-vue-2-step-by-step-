// Main app

Vue.component('coupon',{
	template: `
		<input placeholder="code" @blur="onCouponApplied" />
	`,
	methods: {
		onCouponApplied() {
			this.$emit('applied')
		}
	}
})

var app = new Vue({
	el: "#root",
	data: {
		name: "Alejandro"
	},
	methods: {
		onCouponApplied() {
			console.log("applied")
		}
	}
})
