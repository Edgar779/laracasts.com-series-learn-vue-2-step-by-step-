// Dependencies
import axios from 'axios';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import Vue from 'vue';

// Modules
import Auth from './modules/Auth/Auth.vue';
import Home from './modules/Home/Home.vue';
import Stories from './modules/Stories/Stories.vue';
import UserInfo from './modules/Common/UserInfo.vue';


// Declare this component as global
Vue.component('user-info', UserInfo);

Vue.config.debug = true

// State management
Vue.use( Vuex );

const store = new Vuex.Store({
  state: {
  	user: {}
  },
  mutations: {
    login ( state, user ) {
    	state.user = user;
    },
    logout( state ) {
      delete state['user'];
    }
  }
})

window.store = store;

// Router config
Vue.use( VueRouter );

const routes = [
	{ path: '/', component: Auth },
  	{ path: '/home', component: Home },
  	{ path: '/stories', component: Stories }
];

const router = new VueRouter({ routes });

window.router = router;

new Vue({
	el: "#app",
	components: [ Auth, Home ],
  computed: {
    loggedUser() {
      return Object.keys( this.$store.state.user ).length;
    }
  },
	// es6 shortcut for router: router
	router: window.router,
	store: window.store
});
