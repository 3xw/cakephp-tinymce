<?
use Cake\Core\Configure;
$this->append('template', $this->element('Trois/Tinymce.Component/tinymce'));
$this->Html->script([
  '../trois/tinymce/js/tinymce/tinymce.min.js',
  '../trois/tinymce/js/element/component/tinymce.js',
  //'extranet/element/component/file.js?v='.md5_file(APP.'../webroot/js/extranet/element/component/file.js'),
],['block' => true]);
?>

<!-- sidebar baby -->
<tinymce>
  <?= $value?:'no value' ?>
</tinymce>
