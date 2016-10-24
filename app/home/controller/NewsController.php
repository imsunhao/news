<?php
namespace home\controller;

use core\Controller;
use home\model\NewsModel;
class NewsController extends Controller
{
    public function add()
    {
        $model = new NewsModel();
        header("Content-type: text/html; charset=utf-8");
        if($model->save(['user' => $_POST['user'], 'title' => $_POST['title'], 'author' => $_POST['author'], 'pic' => $_POST['pic'], 'date' => $_POST['date']])){
            $response["error_code"] = 1;
            $response["reason"] = "success";
            echo json_encode($response);
        }else{
            $response["error_code"] = 0;
            $response["reason"] = "erro";
            echo json_encode($response);
        };
    }
    public function select()
    {

    }
}