<?php 
namespace home\controller;

use core\Controller;
use home\model\UserModel;

class UserController extends Controller
{
    public function name()
    {
        $model = new UserModel();
        header("Content-type: text/html; charset=utf-8");
        if ($update = $model->update(['name'=>$_POST['new_name']], ['user' => $_POST['user']], '=')) {
            $response["error_code"] = 1;
            $response["reason"] = "success";
            echo json_encode($response);
        }else{
            $response["error_code"] = 0;
            $response["reason"] = "something erro";
            echo json_encode($response);
        }
    }
    public function username()
    {
        $model = new UserModel();
        header("Content-type: text/html; charset=utf-8");
        if ($update = $model->update(['username'=>$_POST['new_username']], ['user' => $_POST['user']], '=')) {
            $response["error_code"] = 1;
            $response["reason"] = "success";
            echo json_encode($response);
        }else{
            $response["error_code"] = 0;
            $response["reason"] = "something erro";
            echo json_encode($response);
        }
    }
    public function sex()
    {
        $model = new UserModel();
        header("Content-type: text/html; charset=utf-8");
        if ($update = $model->update(['sex'=>$_POST['new_sex']], ['user' => $_POST['user']], '=')) {
            $response["error_code"] = 1;
            $response["reason"] = "success";
            echo json_encode($response);
        }else{
            $response["error_code"] = 0;
            $response["reason"] = "something erro";
            echo json_encode($response);
        }
    }
    public function user()
    {
        $model = new UserModel();
        header("Content-type: text/html; charset=utf-8");
        if ($update = $model->update(['user'=>$_POST['new_user']], ['user' => $_POST['user']], '=')) {
            $response["error_code"] = 1;
            $response["reason"] = "success";
            echo json_encode($response);
        }else{
            $response["error_code"] = 0;
            $response["reason"] = "something erro";
            echo json_encode($response);
        }
    }
}