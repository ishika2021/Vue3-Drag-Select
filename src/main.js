import { createApp } from 'vue'
import App from './App.vue'
import dragselect from './directives/dragselect'

createApp(App).directive('drag-select',dragselect).mount('#app')
