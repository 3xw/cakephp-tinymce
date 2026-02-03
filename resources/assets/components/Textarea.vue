<template>
  <div class="input form-group textarea" :class="{required : init.required}">
    <label v-if="init.label">{{init.label}}</label>
    <div :id="name" :class="init.class">
      <slot/>
    </div>
  </div>
</template>

<script>
export default
{
  name: 'tinymce-textarea',
  props: {
    field: String,
    init: Object,
    entity:Object,
    setFiled: Function
  },
  data: ()=>({
    editor: null,
    plugins: [],
    config: {
      paste_enable_default_filters: true,
      relative_urls: false,
      remove_script_host : false,
      convert_urls: true,
    }
  }),
  created()
  {
    // regsiter
    window.vueTinymce[this.name] = this
  },
  mounted()
  {
    this.editor = new window.tinymce.Editor(this.name, this.settings, window.tinymce.EditorManager);
    this.editor.render()
    this.editor.on('init', this.update)
    this.editor.on('Change', this.update)
  },
  beforeDestroy()
  {
    this.editor.destroy()
    this.plugins.map(plugin => {
      plugin.$destroy();
      plugin.$el.parentNode.removeChild(plugin.$el);
    })
    delete window.vueTinymce[this.name]
  },
  computed:
  {
    name()
    {
      let sections = this.field.split('.'), name = ''
      for(let i = 0;i < sections.length;i++) name += i > 0? '['+sections[i]+']': sections[i]
      return name
    },
    settings()
    {
      const settings = Object.assign({}, this.config, this.init, { paste_preprocess: this.pastePreprocess })
      if (settings.attachment_settings) {
        settings.plugins = 'attachment ' + (settings.plugins || '')
        settings.toolbar = 'attachment | ' + (settings.toolbar || '')
      }
      return settings
    }
  },
  methods:
  {
    appendPlugin(plugin)
    {
      this.plugins.push(plugin)
      this.$el.appendChild(plugin.$el)
    },
    update(e)
    {
      if(this.entity)
      {
        this.entity[this.field] = this.editor.getContent()
        this.setFiled(this.entity[this.field])
      }
      window.tinymce.triggerSave()
      //console.log($('[name="'+this.name+'"]')[0].value);
    },
    pastePreprocess(plugin, args)
    {
      args.content = args.content.replace(/<[^>]*>/g, (match) => {
        match = match.replace(/ ([^=]+)="[^"]*"/g, (match2, attributeName) => {
          if (['alt', 'href', 'src', 'title', 'target'].indexOf(attributeName) !== -1) return match2
          return ''
        })
        return match
      })
      args.content = args.content.replace(/<(div|style|meta|link|pclass|span|svg|path|pre|code|text).*?>/gi, '')
    }
  }
}
</script>
