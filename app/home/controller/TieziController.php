<?php
namespace home\controller;

use core\Controller;
use home\model\TieziModel;
use home\model\CommentModel;
class TieziController extends Controller
{
    public function add()
    {
        $model = new TieziModel();
        header("Content-type: text/html; charset=utf-8");
        if ($model->save(['id' => $_POST['id'],'user' => $_POST['user'], 'content' => $_POST['content']])) {
            $response["error_code"] = 1;
            $response["reason"] = "success";
        } else {
            $response["error_code"] = 0;
            $response["reason"] = "erro";
        };
    }
    public function select(){
        $model = new TieziModel();
        $modelComment = new CommentModel();
        header("Content-type: text/html; charset=utf-8");
        if ($result = $model->selectLimit(['id','user', 'content','ding','comment'], ['user'=>$_POST['user']], '=',$_POST['pageNow'],$_POST['pageSize'])) {
            for($i=0;$i<count($result);$i++){
                if($resultEnd = $modelComment->selectLimit(['user', 'data'], ['id'=>$result[$i]['id']], '=',1,10)){
                    $result[$i]['comment-data']=json_encode($resultEnd);
                }else{
                    $response["error_code"] = 0;
                    $response["reason"] = "erro resultEnd";
                    echo json_encode($response);
                }
            }
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
}