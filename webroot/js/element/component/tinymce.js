(function(scope, Vue){

  Vue.component('tinymce', {
    template: '#tinymce',
    props: {
      id: String,
      aid: String,
      init: {
        type: Object,
        default: function(){return{}}
      }
    },
    computed:
    {
      cInit: function()
      {
        return Object.assign({
          'selector': '#'+this.id,
          'theme_url': this.$root.$el.dataset.webroot + 'trois/tinymce/js/tinymce/themes/modern/theme.js',
          'skin_url': this.$root.$el.dataset.webroot + 'trois/tinymce/js/tinymce/skins/lightgray/',
          'paste_enable_default_filters': true,
          'paste_preprocess': this.pastePreprocess,
        }, this.init)
      }
    },
    created: function(){
      if(window.aEventHub[this.aid] == undefined){
        window.aEventHub[this.aid] = new Vue();
      }
    },
    mounted: function()
    {
      scope.tinymce.baseURL = this.$root.$el.dataset.webroot + 'trois/tinymce/js/tinymce'
      scope.tinymce.suffix = '.min'
      scope.tinymce.init(this.cInit)
    },
    methods: {
      pastePreprocess: function(plugin, args)
      {
        args.content = args.content.replace(/<[^>]*>/g, function (match) {
          match = match.replace(/ ([^=]+)="[^"]*"/g, function (match2, attributeName) {
            if (['alt', 'href', 'src', 'title', 'target'].indexOf(attributeName) !== -1) {
              return match2;
            }
            return '';
          });
          return match;
        });
        args.content = args.content.replace(/<(div|style|meta|link|pclass|span|svg|path|pre|code).*?>/gi, '');
      },
    }
  });

})(window, Vue);
