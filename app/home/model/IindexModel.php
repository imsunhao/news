<?php 
namespace home\model;

use core\Model;
use core\Config;
class IindexModel extends Model
{
	function __construct()
	{
		parent::__construct('index'.false);
	}

	public function setTable($table,$boolean=true)
    {
        if($boolean) $this->table = Config::get('db_table_prefix').$table;
        else $this->table = Config::get('db_table_prefix2').$table;
    }
}