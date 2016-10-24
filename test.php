<?php
/**
 * Created by PhpStorm.
 * User: 孙颢pc
 * Date: 2016/10/21
 * Time: 12:43
 */

ini_set('display_errors', 'off');
error_reporting(0);
header("Content-type: text/html; charset=utf-8");
$json=urldecode($_SERVER["QUERY_STRING"]);
$arr=json_decode($json);
if($arr->{'a'})echo $arr->{'a'}."ok";
else echo "a not exsit";
