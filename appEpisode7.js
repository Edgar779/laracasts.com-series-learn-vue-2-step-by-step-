// Main app


Vue.component('task-list', {
	template: `
		<div>
			<task v-for="task in tasks"> {{ task.description }}</task>
		</div>`,
	data() {
		return {
			tasks: [	
				{ description: "Task 1", ready: true },
				{ description: "Task 2", ready: false },
				{ description: "Task 3", ready: true }
			]
		}
	}
})

Vue.component('task', {
	template: '<li><slot></slot></li>',
	data() {
		return {
			message: 'Foobar'
		}
	}
})

var app = new Vue({
	el: "#root"
});