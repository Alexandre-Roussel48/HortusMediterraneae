import "../../static/sass/pedabotastyle.scss"

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass, faPlus, faCheck, faTrash, faDownload, faPen, faSpinner, faImage, faCamera, faVideo, faHeadphones, faFile, faBook, faCaretDown, faCaretUp, faMinus} from '@fortawesome/free-solid-svg-icons'

import { marked } from 'marked'

library.add(faMagnifyingGlass, faPlus, faCheck, faTrash, faDownload, faPen, faSpinner, faImage, faCamera, faVideo, faHeadphones, faFile, faBook, faCaretDown, faCaretUp, faMinus)

const markedMixin = {
    methods: {
         md: function (input) {
            return marked (input);
        },
    },
};

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.mixin(markedMixin)

app.use(router)

app.config.globalProperties.$url_prefix = "http://127.0.0.1:5000"

app.mount('#app')