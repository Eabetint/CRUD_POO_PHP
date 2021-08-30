<?php
    require '../PHP/usuarios.php';
    $usuarios=new usuarios();
    $nombre=$_POST['nombre'];
    $apellido=$_POST['apellido'];
    $carrera=$_POST['carrera'];
    $pass=$_POST['pass'];
    $result=$usuarios->create($nombre,$apellido,$carrera,$pass);
    echo $result;
?>