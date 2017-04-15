// Main 

Vue.component('modal', {
	template: `
		<div class="modal fade">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <slot name="header"></slot>
		      </div>
		      <div class="modal-body">
		        <slot name="body"></slot>
		      </div>
		      <div class="modal-footer">
		        <slot name="footer"></slot>
		      </div>
		    </div>
		  </div>
		</div>
	`
})

var app = new Vue({
	el: "#root",
	data: {
		name: "Alejandro"
	}
})
