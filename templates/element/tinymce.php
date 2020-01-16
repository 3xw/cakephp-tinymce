<?
use Cake\Core\Configure;

// add script
$this->Html->script(
  [
    'plugins/tinymce/tinymce.vendor.min.js',
    'plugins/tinymce/tinymce.min.js'
  ],
  ['block' => true]
);

// data
$init = array_merge(
  Configure::read('Trois/Tinymce'),
  isset($init)? $init:[]
);

if(!empty($init['content_css']))
{
  $init['content_css'][0] = $this->Url->build('/css/', true).$init['content_css'][0];
}

echo $this->Html->tag(
  'tinymce-loader',
  isset($value)? $value: '',
  [
    'name' => 'attachment-textarea',
    'props' => json_encode([
      'id' => $field,
      ':int' => isset($init)? htmlspecialchars(json_encode($init), ENT_QUOTES, 'UTF-8'):'{}'
    ])
  ]
);
