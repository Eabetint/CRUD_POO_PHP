$(document).ready(function () {
    $("#error").hide();
    $("#btn").click(function () { 
        var user=$("#user").val();
        var pass=$("#pass").val();
        if(user!=null && pass!=null){

            $.ajax({
                type: "POST",
                url: "../PHP/sesion-validacion.php",
                data: {user:user,pass: pass},
                success: function (response) {
                    let result=JSON.parse(response);
                    if(result[0].logueado==true){
                        $(location).attr('href','menu.html');
                    }else{
                        $("#error").show();
                        $("#error").text(result[0].usuario);
                    }
                    console.log(result);
                }
            });
        }
        console.log(user+"-------"+pass);
    });
});