<?php
namespace home\controller;

use core\Controller;
use home\model\TieziModel;
class TieziController extends Controller
{
    public function add()
    {
        $model = new TieziModel();
        header("Content-type: text/html; charset=utf-8");

    }
}