<?php
    require 'config_db.php';
    
    class conexion{
        protected $conexion_db;
        public function __construct(){
           
        }
        public function StartConexion(){
            try {
                $this->conexion_db=new PDO('mysql:host=localhost;dbname=syslogin','root','');
                $this->conexion_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $this->conexion_db->exec("SET CHARACTER SET utf8");
                return $this->conexion_db;
            } catch (Exception $e) {
                echo"la linea de error es: ".$e->getLine();
            }
        }
    }
    
?>