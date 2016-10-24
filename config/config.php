<?php 

return [
//	'db_host' 	=>	'127.0.0.1',
//	'db_user' 	=>	'root',
//	'db_pwd' 	=>	'root',
//    'db_name' 	=>	'news',
    'db_host' 	=>	'118.123.21.153',
    'db_user' 	=>	'imsunhao',
    'db_pwd' 	=>	'Aa83119608',
    'db_name' 	=>	'imsunhao',
	'db_table_prefix' 	=>	'news_',
	'db_charset' 	=>	'utf8',

    'default_module'    => 'home',
	'default_controller' 	=>	'Index',
	'default_action' 	=>	'index',
    'url_type'          =>      2,

	'cache_path' 	=>	RUNTIME_PATH . 'cache' .DS,
	'cache_prefix' 	=>	'cache_',
	'cache_type' 	=>	'file',
	'complie_path' 	=>	RUNTIME_PATH . 'compile' .DS,

    'view_path'    => APP_PATH .'home' . DS . 'view' . DS,
    'view_suffix'  => '.php',

    'auto_cache' 	=> false,
    'url_html_suffix'        => 'html',

];