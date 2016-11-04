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
        if($model->save(['user' => $_POST['user'], 'title' => $_POST['title'], 'author' => $_POST['author'], 'pic' => $_POST['pic'], 'date' => $_POST['date'], 'news' => $_POST['news']])){
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
        $model = new NewsModel();
        header("Content-type: text/html; charset=utf-8");
        if ($result = $model->selectLimit(['user', 'news', 'title', 'author', 'pic', 'date'], ['user'=>$_POST['user']], '=',$_POST['pageNow'],$_POST['pageSize'])) {
            $response["error_code"] = 1;
            $response["reason"] = "success";
            $response["result"] = $result;
            $response["length"] = $model->getCount();
            echo json_encode($response);
        } else {
            $response["error_code"] = 0;
            $response["reason"] = "erro";
            echo json_encode($response);
        }
    }
    public function delete(){
        $model = new NewsModel();
        header("Content-type: text/html; charset=utf-8");
        if ($result = $model->delete(['0'=>'user = "'.$_POST['user'].'" and ','1'=>'news = "'.$_POST['news'].'"'])) {
            $response["error_code"] = 1;
            $response["reason"] = "success";
            echo json_encode($response);
        } else {
            $response["error_code"] = 0;
            $response["reason"] = "erro";
            echo json_encode($response);
        }
    }
}