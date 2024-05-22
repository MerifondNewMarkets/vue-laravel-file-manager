// styles
import './assets/main.scss';

import { createApp } from 'vue';
import { createStore } from 'vuex';
// store
import fm from './store';
// App
import App from './FileManager.vue';
import { tooltip } from './tooltip.js'



// create new store
const store = createStore({
    strict: import.meta.env.DEV,
    modules: { fm },
});
const mountEl = document.querySelector("#fm");

if (mountEl) {
    const app = createApp(App, { ...mountEl.dataset });
    app.use(store).mount('#fm');
    app.directive('tooltip', tooltip)
    window.fm = app;
}

window.remountFileManager = function () {
    const mountEl = document.querySelector("#fm");
    const app = createApp(App, { ...mountEl.dataset });
    app.use(store).mount('#fm');
    app.directive('tooltip', tooltip)
    window.fm = app;
}
