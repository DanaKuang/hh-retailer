import 'babel-polyfill';

import Vue from 'vue';

import router from './router'
import App from './App';

import './assets/lib/flexible.js'
import 'components/global.js'

console.log('hello world')

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})



