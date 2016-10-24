<?php 
namespace home\controller;

use core\Controller;
use home\model\SetModel;

class UserController extends Controller
{
	public function index()
	{
        $model = new SetModel();
        header("Content-type: text/html; charset=utf-8");

	}
}