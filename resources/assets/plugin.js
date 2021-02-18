// VENDOR
import './vendor/js/tinymce/tinymce.5.1.min.js'

// COMPONENTS
import Textarea from './components/Textarea.vue'


// WORK
const
components = [Textarea],
install = function(Vue, { store })
{
  // set vendor globals
  window.tinymce.baseURL = 'https://static.3xw.ch/tinymce/5.1'
  window.tinymce.suffix = '.min'

  // add components
  components.forEach(component => Vue.component(component.name, component))
}

// EXPORT
export default
{
  version: '4.0.0',
  install,
}
