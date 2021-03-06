<?php 

define('APP_PATH', ROOT_PATH . 'app' . DS);
define('RUNTIME_PATH', ROOT_PATH . 'runtime' . DS);
define('CONF_PATH', ROOT_PATH . 'config' . DS);
define('CORE_PATH', ROOT_PATH . 'sys' .DS . 'core' . DS);

require CORE_PATH.'Loader.php';
$loader = new core\Loader();
$loader->addNamespace('core',ROOT_PATH . 'sys' .DS . 'core');
$loader->addNamespace('home',APP_PATH . 'home');
$loader->register();
\core\Config::set(include CONF_PATH . 'config.php');

