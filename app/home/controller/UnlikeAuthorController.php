<?php
namespace home\controller;

use core\Controller;
use home\model\UnlikeAuthorModel;
class UnlikeAuthorController extends Controller
{
    public function add()
    {
        $model = new UnlikeAuthorModel();
        header("Content-type: text/html; charset=utf-8");
        if($model->save(['user' => $_POST['user'], 'author' => $_POST['author']])){
            $response["error_code"] = 1;
            $response["reason"] = "success";
            echo json_encode($response);
        }else{
            $response["error_code"] = 0;
            $response["reason"] = "erro";
            echo json_encode($response);
        };
    }
    public function select(){
        $model = new UnlikeAuthorModel();
        header("Content-type: text/html; charset=utf-8");
        if ($result = $model->selectLimit(['user','author'], ['user'=>$_POST['user']], '=',$_POST['pageNow'],$_POST['pageSize'])) {
            $response["error_code"] = 1;
            $response["reason"] = "success";
            $response["result"] = $result;
            echo json_encode($response);
        } else {
            $response["error_code"] = 0;
            $response["reason"] = "erro";
            echo json_encode($response);
        }
    }
    public function delete(){
        $model = new UnlikeAuthorModel();
        header("Content-type: text/html; charset=utf-8");
        if ($result = $model->delete(['0'=>'user = "'.$_POST['user'].'" and ','1'=>'author = "'.$_POST['author'].'"'])) {
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