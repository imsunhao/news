<?php 
namespace home\controller;

use core\traits\Jump;
use core\Controller;
/**
* index
*/
class IndexController extends Controller
{
	// use Jump;
	public function index()
	{
		header("Content-type: text/html; charset=utf-8");
		echo "获取域名或主机地址<br>";
		echo $_SERVER['HTTP_HOST']."<br>"; #localhost

		echo "获取网页地址<br>";
		echo $_SERVER['PHP_SELF']."<br>";

		echo "获取网址参数<br>";
		// echo str_replace("%22", '"', $_SERVER["QUERY_STRING"]);
		// echo json_decode('{"a":"b"}')."<br>";
		// echo json_decode('{"a":"b"}')."<br>";

		$json = '{"a":1,"b":2,"c":3,"d":4,"e":5}';

		// echo json_decode($json);
		phpinfo();

		// echo $_SERVER["QUERY_STRING"]."<br>";
	}

	public function hello()
	{
		$this->assign('name','shiyanlou');
		$this->display();
	}

}
