<?php
    require 'conexion.php';

    class usuarios extends conexion{

        public function __construct(){
        }
        
        public function get_user(){
            $conexion_db=new conexion();
            $sql="SELECT * FROM usuarios";
            //$sql="SELECT user FROM usuarios";
            $sentence=$conexion_db->StartConexion()->prepare($sql);
            $sentence->execute(array());
            $result=$sentence->fetchAll(PDO::FETCH_ASSOC);
            $sentence->closeCursor();
            return $result;
            $this->conexion_db=null;
        }
        public function validar_user($name,$pass){
            session_start();
            $conexion_db=new conexion();
            $sql="SELECT user FROM usuarios WHERE user='".$name."' AND pass='".$pass."'";
            $sentence=$conexion_db->StartConexion()->prepare($sql);
            $sentence->execute();
            if($sentence->rowCount()>0){
                $_SESSION["user"]=$name;
                return $_SESSION['user'];
                $this->conexion_db=null;
            }else{
                return "¡Error! Usuario o contraseña incorrectos";
            }
        }
        public function user_id($id){
            $conexion_db=new conexion();
            $sql='SELECT * FROM usuarios WHERE ID='.$id;
            $sentence=$conexion_db->StartConexion()->prepare($sql);
            $sentence->execute(array());
            $result=$sentence->fetchAll(PDO::FETCH_ASSOC);
            $this->reiniciarID();
            $sentence->closeCursor();
            if($sentence->rowCount()>0){
                return $result;
                $this->conexion_db=null;
            }else{
                return "¡Error! No se pudo encontrar el usuario a modificar";
            }
        }
        public function create($name,$apellido,$carrera,$pass){
            $conexion_db=new conexion();
            $sql='INSERT INTO usuarios(user,apellido,carrera, pass) VALUES ("'.$name.'","'.$apellido.'","'.$carrera.'","'.$pass.'")';
            $sentence=$conexion_db->StartConexion()->prepare($sql);
            $sentence->execute();
            return "Nuevo usuario creado exitosamente";
        }

        public function reiniciarID(){
            $conexion_db=new conexion();
            $sql='ALTER TABLE usuarios AUTO_INCREMENT=1;' ;
            $query=$conexion_db->StartConexion()->prepare($sql);
            $query->execute();
        }
        
        public function delete($id){
            $this->reiniciarID();
            $conexion_db=new conexion();
            $sql='DELETE FROM usuarios WHERE ID='.$id;
            $query=$conexion_db->StartConexion()->prepare($sql);
            $query->execute();
            return "Usuario eliminado exitosamente";
        }
        public function update($id,$nombre,$apellido,$carrera,$pass){
            $conexion_db=new conexion();
            
            $sql='UPDATE usuarios set user="'.$nombre.'",apellido="'.$apellido.'",carrera="'.$carrera.'", pass="'.$pass.'" WHERE id='.$id;
            $query=$conexion_db->StartConexion()->prepare($sql);
            $query->execute();
            return "Usuario actualizado";
        }
        public function CloseSession(){
            session_start();
            session_destroy();
            header("location:../login.html");
        }
    }
    
?>
