// Main 

Vue.component('progress-view', {
	data: function() {
		return {
			progress: 90
		}
	}
})

var app = new Vue({
	el: "#root",
	data: {
		name: "Alejandro"
	}
})
