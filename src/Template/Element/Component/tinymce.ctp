<!-- tinymce -->
<script type="text/x-template" id="tinymce">
  <div class="input form-group textarea">
    <label>{{init.label}}</label>
    <div :id="id" :class="init.class">
      <slot/>
    </div>
  </div>
</script>
