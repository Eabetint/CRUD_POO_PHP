<?php
    require "./usuarios.php";
    $usuarios=new usuarios();
    $ID=$_POST['id'];
    $response=$usuarios->delete($ID);
    echo $response;

?>