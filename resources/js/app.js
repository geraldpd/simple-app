/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Vue from 'vue'

import Vuetify from 'vuetify'
Vue.use(Vuetify)

import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Routes from './routes/Route.js'

Vue.use(Vuetify)

import User from './helpers/User.js'
window.User = User;

window.Vue = require('vue').default;

window.EventBus = new Vue()

Vue.component('app', require('./components/App.vue').default);

const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    router: new VueRouter(Routes),
});