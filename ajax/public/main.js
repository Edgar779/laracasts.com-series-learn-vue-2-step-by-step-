// Dependencies
import axios from 'axios';
import VueRouter from 'vue-router';
import Vue from 'vue';

// Modules
import Auth from './modules/Auth/Auth.vue';
import Home from './modules/Home/Home.vue';

Vue.config.debug = true

Vue.use( VueRouter );

const routes = [
	{ path: '/', component: Auth },
  	{ path: '/home', component: Home }
];

// Routing config
window.router = new VueRouter({ routes });


new Vue({
	el: "#app",
	components: [ Auth, Home ],
	// es6 shortcut for router: router
	router: window.router
});