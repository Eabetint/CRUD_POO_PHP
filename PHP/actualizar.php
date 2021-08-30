<?php
    require './usuarios.php';
    $usuarios=new usuarios();
    $id=$_POST['id'];
    $result=$usuarios->user_id($id);
    $json=array();
    foreach($result as $element){
        $json[]=array(
            'ID'=>$element['ID'],
            'Nombre'=>$element['user'],
            'Apellido'=>$element['apellido'],
            'Carrera'=>$element['carrera'],
            'Password'=>$element['pass'],
        );
    }
    $jsonString=json_encode($json);
    echo $jsonString;



?>