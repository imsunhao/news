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
        if ($model->save(['user' => $_POST['user'], 'pic' => $_POST['pic'], 'password' => $_POST['password'], 'name' => $_POST['name'], 'username' => $_POST['username'], 'sex' => $_POST['sex']])) {
            $response["error_code"] = 1;
            $response["reason"] = "success";
        } else {
            $response["error_code"] = 0;
            $response["reason"] = "erro";
        };
    }

//    public function select()
//    {
//        $model = new UserModel();
//        header("Content-type: text/html; charset=utf-8");
//        $json = urldecode($_SERVER["QUERY_STRING"]);
//        $arr = json_decode($json);
//        if ($result = $model->select(['id', 'user', 'password'], ["user" => $arr->{'user'}], '=')) {
//            echo json_encode($result[0]);
//        } else {
//        }
//    }

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

    public
    function file()
    {
        header("Content-type: text/html; charset=utf-8");


//        $xdata = $GLOBALS['HTTP_RAW_POST_DATA'];
//        if (empty($xdata)) {
        $xmlstr = file_get_contents('php://input');
        echo $xmlstr;
//        }
//        echo $_GET['hash'] . '<br>';

//        $wav = $xdata;//得到post过来的二进制原始数据  
//    $file = fopen("wav/".$filename,"w");//打开文件准备写入  
//    fwrite($file,$wav);//写入  
//    fclose($file);
//        echo "uploaded ok!";


//        $file=$_POST['image'];;
//        echo $file;


//        if ((($_FILES["file"]["type"] == "image/gif")
//                || ($_FILES["file"]["type"] == "image/jpeg")
//                || ($_FILES["file"]["type"] == "image/pjpeg"))
//            && ($_FILES["file"]["size"] < 20000))
//        {
//            if ($_FILES["file"]["error"] > 0)
//            {
//                echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
//            }
//            else
//            {
////                echo "Upload: " . $_FILES["file"]["name"] . "<br />";
////                echo "Type: " . $_FILES["file"]["type"] . "<br />";
////                echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
////                echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br />";
//
//                if (file_exists("/images/" . $_FILES["file"]["name"]))
//                {
//                    echo $_FILES["file"]["name"] . " already exists. ";
//                }
//                else
//                {
//                    move_uploaded_file($_FILES["file"]["tmp_name"],
//                        "/images/" . $_FILES["file"]["name"]);
//                    echo "Stored in: " . "/images/" . $_FILES["file"]["name"];
//                }
//            }
//        }
//        else
//        {
//            echo "Invalid file";
//        }
    }
}