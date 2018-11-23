(function(scope, Vue){

  Vue.component('tinymce', {
    template: '#tinymce',
    data: function(){
      return {
      }
    },
    props: {

    },
    created: function()
    {

    },
    mounted: function() {
      scope.tinymce.baseUrl = 'http://localhost:8888/prometerre/prometerre.ch/trois/tinymce/js/tinymce/'
      scope.tinymce.init({
        selector: '#mytextarea',
        theme_url: 'http://localhost:8888/prometerre/prometerre.ch/trois/tinymce/js/tinymce/themes/modern/theme.js',
        skin_url: 'http://localhost:8888/prometerre/prometerre.ch/trois/tinymce/js/tinymce/skins/lightgray/',
      })
    },
    methods: {

    }
  });

})(window, Vue);
