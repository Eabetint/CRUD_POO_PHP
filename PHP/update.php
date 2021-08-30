<?php
    require('./usuarios.php');
    $usuarios=new usuarios();
    $id=$_POST['id'];
    $name=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $carrera=$_POST['carrera'];
    $pass=$_POST['pass'];
    //$carrera=$_POST['carrera'];
    echo $usuarios->update($id,$name,$apellido,$carrera,$pass);
?>