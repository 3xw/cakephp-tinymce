<template lang="html">
  <div class="input form-group textarea" :class="{required : init.required}">
    <label>{{init.label}}</label>
    <div :id="slug" :class="init.class">
      <slot/>
    </div>
  </div>
</template>

<script>
//window helper
window.slug = function(str)
{
  return str.replace(/\./gi, '')
}

// component
export default
{
  name: 'tinymce-textarea',
  props: {
    id: String,
    init:
    {
      type: Object,
      label: String,
      class: String,
      default(){ return {} }
    }
  },
  created()
  {
    if(!window.vueTinymce) window.vueTinymce = {}
    window.vueTinymce[this.id] = this
  },
  computed:
  {
    slug()
    {
        return window.slug(this.id)
    },
    name(id)
    {
      let
      sections = this.id.split('.'),
      name = ''

      for(let i = 0;i < sections.length;i++)
      {
        if(i > 0) name += '['+sections[i]+']'
        else name += sections[i];
      }
      return name
    },
    cInit()
    {
      let field = this.name
      return Object.assign({
        'selector': '#'+window.slug(this.id),
        'paste_enable_default_filters': true,
        'paste_preprocess': this.pastePreprocess,
        'relative_urls': false,
        'remove_script_host' : false,
        'convert_urls' : true,
        'setup'(editor)
        {
          editor.on('submit', (e) => {
            e.preventDefault()
            $('[name="'+window.slug(this.id)+'"]').attr('name', field).attr('value', this.getContent())
            $('form').submit()
          });
        }
      }, this.init)
    }
  },
  mounted()
  {
    window.tinymce.baseURL = 'https://static.3xw.ch/tinymce'
    window.tinymce.suffix = '.min'
    window.tinymce.init(this.cInit)

  },
  methods:
  {
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
