<?php

    require '../PHP/usuarios.php';
    $usuarios=new usuarios();
    $user=htmlentities(addslashes($_POST['user']));
    $pass=htmlentities(addslashes($_POST['pass']));
    $usuarios=$usuarios->validar_user($user, $pass);
    $json=array();
    if($usuarios!="¡Error! Usuario o contraseña incorrectos"){
        $json[]=array(
            'usuario'=>$usuarios,
            'logueado'=>true
        );
        $jsonString=json_encode($json);
        echo $jsonString;
    }else{
        $json[]=array(
            'usuario'=>$usuarios,
            'logueado'=>false
        );
        $jsonString=json_encode($json);
        echo $jsonString;
    }


?>