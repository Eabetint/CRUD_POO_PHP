<?php

    require '../PHP/usuarios.php';
    $usuarios=new usuarios();
    $mostrar=$usuarios->get_user();
    $json=array();
    foreach ($mostrar as $response) {
        $json[]=array(
            'ID'=>$response['ID'],
            'usuario'=>$response['user'],
            'apellido'=>$response['apellido'],
            'carrera'=>$response['carrera'],
            'contraseña'=>$response['pass'],
        );
    }
    $jsonString=json_encode($json);
    echo $jsonString;


?>