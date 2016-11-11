<?php 
namespace home\controller;

use core\Controller;
use home\model\IindexModel;
class IndexController extends Controller
{
    function __construct()
    {

    }

	public function index()
	{
        $model = new IindexModel();
        header("Content-type: text/html; charset=utf-8");
        $model->setTable('experience',false);
        if ($result = $model->selectWithoutWheres()){
            $this->assign('JSONData',json_encode($result));
        }
        $this->display();
	}

	public function request()
    {
        $model = new IindexModel();
        header("Content-type: text/html; charset=utf-8");
        $request=new request();
        switch ($_GET['url']){
            case 'index':
                $model->setTable('experience',false);
                if ($result = $model->selectWithoutWheres()){
                    $request->assign('JSONData',json_encode($result));
                }
                $request->tpl='index';
                break;
        }
        $request->display();
    }
}

class request extends Controller{

}
