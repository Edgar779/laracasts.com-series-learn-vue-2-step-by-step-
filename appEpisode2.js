// Main app

var app = new Vue({
	el: "#root",
	data: {
		newName: "",
		href: "AA",
		classname: "red",
		names: ["Alejandro","Oriana"],
		tasks: []
	},
	methods: {
		addName() {
			this.names.push( this.newName );
			this.newName = "";
		}
	},
	mounted: function() {
		this.tasks.push(
			{ description: "Task 1", ready: true },
			{ description: "Task 2", ready: false },
			{ description: "Task 3", ready: true })
	},
	computed: {
		readyTasks() {
			return this.tasks.filter( task => task.ready );
		},
		reversedMessage() {
			return this.newName.split('').reverse().join('');
		}
	}
})