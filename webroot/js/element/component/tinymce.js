(function(scope, Vue){

  Vue.component('tinymce', {
    template: '#tinymce',
    props: {
      id: String,
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
          selector: '#'+this.id,
          'theme_url': this.$root.$el.dataset.webroot + 'trois/tinymce/js/tinymce/themes/modern/theme.js',
          'skin_url': this.$root.$el.dataset.webroot + 'trois/tinymce/js/tinymce/skins/lightgray/'
        }, this.init)
      }
    },
    mounted: function()
    {
      scope.tinymce.baseURL = this.$root.$el.dataset.webroot + 'trois/tinymce/js/tinymce/'
      scope.tinymce.init(this.cInit)
    },
    methods: {

    }
  });

})(window, Vue);
