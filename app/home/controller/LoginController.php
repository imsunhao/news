<?php
namespace home\controller;

use core\Controller;
use home\model\UserModel;

class LoginController extends Controller
{
    public function register()
    {
        $model = new UserModel();
        header("Content-type: text/html; charset=utf-8");
        if($img = base64_decode($_POST['pic'])){
            if(!file_put_contents('./images/t'.$_POST['user'].'.jpg', $img)){
                $response["error_code"] = 0;
                $response["reason"] = "images save erro";
                return;
            };
        };

//        if ($model->save(['user' => $_POST['user'], 'pic' =>  'images/t'.$_POST['user'].'.jpg', 'password' => $_POST['password'], 'name' => $_POST['name'], 'username' => $_POST['username'], 'sex' => $_POST['sex']])) {
        if ($model->save(['user' => $_POST['user'], 'pic' => 't'.$_POST['user'].'.jpg' , 'password' => $_POST['password'], 'name' => $_POST['name'], 'username' => $_POST['username'], 'sex' => $_POST['sex']])) {
            $response["error_code"] = 1;
            $response["reason"] = "success";
        } else {
            $response["error_code"] = 0;
            $response["reason"] = "erro";
        };
    }

    public function login()
    {
        $model = new UserModel();
        header("Content-type: text/html; charset=utf-8");
        $user = $_POST['user'];
        $password = $_POST['password'];
        if ($result = $model->select(['user', 'password', 'name', 'username', 'pic', 'sex'], ['user' => $user], '=')) {
            if ($result[0]['password'] == $password) {
                $response["error_code"] = 1;
                $response["reason"] = "success";
                $response["result"] = $result;
                echo json_encode($response);
            } else {
                $response["error_code"] = 0;
                $response["reason"] = "password erro";
                echo json_encode($response);
            }
        } else {
        }
    }

    public function password()
    {
        $model = new UserModel();
        header("Content-type: text/html; charset=utf-8");
        $user = $_POST['user'];
        $password = $_POST['password'];
        if ($result = $model->select(['user', 'password'], ['user' => $user], '=')) {
            if ($result[0]['password'] == $password) {
                if ($update = $model->update(['password'=>$_POST['new_password']], ['user' => $user], '=')) {
                    $response["error_code"] = 1;
                    $response["reason"] = "success";
                    echo json_encode($response);
                } else {
                    $response["error_code"] = 0;
                    $response["reason"] = "password erro";
                    echo json_encode($response);
                }
            } else {
                $response["error_code"] = 0;
                $response["reason"] = "password erro";
                echo json_encode($response);
            }
        } else {
        }
    }
    public function test(){
        header("Content-type: text/html; charset=utf-8");
        echo urldecode($_POST['pic']);
    }
}