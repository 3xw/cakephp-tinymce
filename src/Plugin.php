<?php
declare(strict_types=1);

namespace Trois\Tinymce;

use Cake\Core\BasePlugin;
use Cake\Routing\RouteBuilder;
use Cake\Core\PluginApplicationInterface;

class Plugin extends BasePlugin
{
  public function bootstrap(PluginApplicationInterface $app): void
  {
    parent::bootstrap($app);
  }

  public function routes(RouteBuilder $routes): void
  {
    parent::routes($routes);
  }
}
