<?
use Cake\Core\Configure;

// dependencies
$this->append('template', $this->element('Trois/Tinymce.Component/tinymce'));
$this->Html->script([
  '../trois/tinymce/js/tinymce/tinymce.min.js?v='.md5_file(ROOT.'/vendor/3xw/cakephp-tinymce/webroot/js/tinymce/tinymce.min.js'),
  '../trois/tinymce/js/element/component/tinymce.js?v='.md5_file(ROOT.'/vendor/3xw/cakephp-tinymce/webroot/js/element/component/tinymce.js')
],['block' => true]);

// data
//$init = array_merge(Configure::read('Trois/Tinymce.init'), isset($init)?:[]);
?>

<!-- sidebar baby -->
<tinymce id="<?= $field ?>" :init="<?= isset($init)? htmlspecialchars(json_encode($init, JSON_FORCE_OBJECT), ENT_QUOTES, 'UTF-8'):'{}' ?>" >
  <?= isset($value)? $value: '' ?>
</tinymce>
