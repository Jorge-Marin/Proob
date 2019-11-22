<?php

    include_once('Class/class-usuario.php');
    if ($_POST!=null){
        $usuarios[] = $_POST;
        //var_dump($usuarios);
        
        $u = new Usuario(
            $_POST['firstname'],
            $_POST['lastname'],
            $_POST['email'],
            $_POST['password']);

        echo $u->createNewUser();
    }
?>