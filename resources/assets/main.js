// lib
import '@/vendor/js/tinymce/tinymce.5.1.min.js'
window.tinymce.baseURL = 'https://static.3xw.ch/tinymce/5.1'
window.tinymce.suffix = '.min'

//import ATTACHMENT 'resources/assets/plugins/tinymce.js';

// init
import Textarea from '@/components/Textarea.vue'


Vue.component(Textarea.name, Textarea)
