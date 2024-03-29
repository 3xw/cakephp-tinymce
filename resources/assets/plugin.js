// COMPONENTS
import Textarea from './components/Textarea.vue'


// WORK
const
components = [Textarea],
install = function(Vue, { store })
{
  // set vendor globals
  window.tinymce.baseURL = 'https://static.3xw.ch/tinymce/5.10'
  window.tinymce.suffix = '.min'
  window.vueTinymce = {}

  // add components
  components.forEach(component => Vue.component(component.name, component))
}

// EXPORT
export default
{
  version: '4.0.0',
  install,
}
