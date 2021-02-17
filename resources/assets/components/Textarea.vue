<template lang="html">
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
    init: Object
  },
  data: ()=>({
    editor: null,
    config: {
      paste_enable_default_filters: true,
      relative_urls: false,
      remove_script_host : false,
      convert_urls: true,
    }
  }),
  created()
  {
    if(!window.vueTinymce) window.vueTinymce = {}
    window.vueTinymce[this.id] = this
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
    delete window.vueTinymce[this.id]
  },
  destroyed()
  {

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
      return Object.assign({}, this.config, this.init, { paste_preprocess: this.pastePreprocess })
    }
  },
  methods:
  {
    update(e)
    {
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
      args.content = args.content.replace(/<(div|style|meta|link|pclass|span|svg|path|pre|code).*?>/gi, '')
    }
  }
}
</script>
