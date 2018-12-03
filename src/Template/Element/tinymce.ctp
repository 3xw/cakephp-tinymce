<?
use Cake\Core\Configure;
use Cake\Utility\Text;
use Cake\Utility\Inflector;

// data
$settings = array_merge(Configure::read('Attachment.upload'),$settings);
$init = array_merge(Configure::read('Trois/Tinymce'), isset($init)? $init:[]);
$uuid = Text::uuid();

// dependencies
$this->append('template', $this->element('Trois/Tinymce.Component/tinymce'));
$this->Html->script([
  '../trois/tinymce/js/tinymce/tinymce.min.js?v='.md5_file(ROOT.'/vendor/3xw/cakephp-tinymce/webroot/js/tinymce/tinymce.min.js'),
  '../trois/tinymce/js/tinymce/custom/attachments/plugin.min.js?v='.md5_file(ROOT.'/vendor/3xw/cakephp-tinymce/webroot/js/tinymce/custom/attachments/plugin.min.js'),
  '../trois/tinymce/js/element/component/tinymce.js?v='.md5_file(ROOT.'/vendor/3xw/cakephp-tinymce/webroot/js/element/component/tinymce.js'),
],['block' => true]);
?>

<!-- upload -->
<attachment-upload aid="<?= $uuid ?>" settings.sync="<?= htmlspecialchars(json_encode($settings), ENT_QUOTES, 'UTF-8') ?>" ></attachment-upload>
