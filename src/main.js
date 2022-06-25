import Vue from 'vue'
import VueFileAgent from 'vue-file-agent';
import 'vue-file-agent/dist/vue-file-agent.css';

Vue.use(VueFileAgent);

import VueKonva from 'vue-konva';

Vue.use(VueKonva);

import UploadImage from 'vue-upload-image';
import drag from "v-drag"
Vue.use(drag, {
    // global configuration
});
// register globally
Vue.component('upload-image', UploadImage)
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
Vue.prototype.$setIntervalCurrentTime = null;
Vue.prototype.$clearIntervalCurrentTime = (clearIntervalMain) => {
    console.log(clearIntervalMain.clearIntervalMain);
    clearInterval(clearIntervalMain.$setIntervalCurrentTime);
};
Vue.config.productionTip = false

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')