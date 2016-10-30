<?php 
namespace home\controller;

use core\Controller;
use home\model\SetModel;

class SetController extends Controller
{
    public function select(){
        header("Content-type: text/html; charset=utf-8");
        $model = new SetModel();
        if ($result = $model->select(['network','follow','mess'], ['user'=>$_POST['user']], '=')) {
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
    public function update(){
        header("Content-type: text/html; charset=utf-8");
        $model = new SetModel();
        if ($update = $model->update(['network'=>$_POST['network'],'follow'=>$_POST['follow'],'mess'=>$_POST['mess']], ['user' => $_POST['user']], '=')) {
            $response["error_code"] = 1;
            $response["reason"] = "success";
            echo json_encode($response);
        } else {
            $response["error_code"] = 0;
            $response["reason"] = "password erro";
            echo json_encode($response);
        }
    }
}