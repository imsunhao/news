<?php 
namespace home\controller;

use core\Controller;
class IndexController extends Controller
{
    function __construct()
    {

    }

	public function index()
	{
        $this->display();
	}
}
