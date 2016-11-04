<?php
namespace home\controller;

use core\Controller;
class TestController extends Controller
{
    public function test()  //00普通图片上传
    {
        $target_path = 'images/test.jpg';
        $result = move_uploaded_file($_FILES['uploadedfile']['tmp_name'], $target_path);
    }
}