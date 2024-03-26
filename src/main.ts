import './assets/tailwind.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'

import Vue3Toasity, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';


const app = createApp(App).use(
    Vue3Toasity,
    {
      autoClose: 3000,
      // ...
    } as ToastContainerOptions,
  );

  app.use(PrimeVue, {
    unstyled: true
});


app.use(createPinia())
app.use(router)

app.mount('#app')
