<?php
use Cake\Core\Configure;

// data
$init = array_merge(Configure::read('Trois/Tinymce'), isset($init)? $init:[]);
if(!empty($init['content_css'])) $init['content_css'][0] = $this->Url->build('/css/', true).$init['content_css'][0];

$attributes = array_merge(
  [
    'field' => $field,
    ':init' => isset($init)? json_encode($init):[]
  ],
  isset($attributes)? $attributes:[]
);

// echo tag
echo $this->Html->tag(
  'tinymce-textarea',
  isset($value)? $value: '',
  $attributes
);
