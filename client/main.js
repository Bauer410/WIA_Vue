import Vue from 'vue'

import '../imports/ui/plugins'
import App from '../imports/ui/App.vue'
import VueMeteorTracker from 'vue-meteor-tracker';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueMeteorTracker);

Meteor.startup(() => {
  new Vue({
    el: '#app',
    ...App,
  })
})
