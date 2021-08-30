$(document).ready(function () {
    function mostrar() {
        
        $.ajax({
            type: "GET",
            url: "../PHP/mostrar_usuarios.php",
            success: function (response) {
                let result=JSON.parse(response);
                let template="";
                let color="info";
                let colorBd ="dark";
                result.forEach(element => {
                    
                    
                    template+=`
                        
                        <div class="row bg-${color} text-white " >
                            <div class="col col-lg-1 p-3 border border-left border-${colorBd}">
                                ${element.ID}
                            </div>
                            <div class=" p-3 col border border-left border-${colorBd}">
                                ${element.usuario}
                            </div>
                            <div class="col p-3 border border-left border-${colorBd}">
                                ${element.apellido}
                            </div>
                            <div class="p-3 col border border-left border-${colorBd}">
                                ${element.carrera}
                            </div>
                            <div class="p-3 col border border-left border-${colorBd}">
                                ${element.contraseña}
                            </div>
                            <div class="col p-3 border border-left border-${colorBd}">
                                <div class="row text-center">
                                    <div class="col">
                                        <button class="btn btn-secondary update" IdDatosUp="${element.ID}">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                        </svg>
                                        </button>
                                    </div>
                                    <div class="col" IdDato="${element.ID}">
                                        <button class="btn btn-danger btnDelete">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>     
                    `;
                    if(color=="info"){
                        color="dark";
                        colorBd="info";
                    }else{
                        color="info";
                        colorBd="dark";
                    }
                    console.log(element.ID+"-----------"+element.usuario)
                });
                $("#table").html(template);
            }
        });
    }
    var Guard_Agg=false;
    var id="";
    mostrar();
    //CREAR USUARIOS
    $("#create").click(function () { 
        console.log(Guard_Agg);
        let nombre=$("#name").val();
        let apellido=$("#apel").val();
        let carrera=$("#car").val();
        let pass=$("#pass").val();
        if(Guard_Agg==false){
            if(nombre!="" && apellido!=""){
                $.ajax({
                    type: "POST",
                    url: "../PHP/agregar_user.php",
                    data:{nombre,apellido,carrera,pass},
                    success: function (response) {
                        $("#alert").html(response);
                        $("#alert").show();
                        setTimeout(function () {
                            $("#alert").hide();
                        },4000);
                        mostrar();
                    }
                });
            }
            console.log(Guard_Agg);
        }else{
            Guard_Agg=false;
            $.post("../PHP/update.php",{id,nombre,apellido,carrera,pass},function (response) {
                mostrar();
                $("#alert").html(response);
                $("#alert").show();
                setTimeout(function () {
                    $("#alert").hide();
                },4000);
            });
        }
    });
    
    $("#alert-2").hide();
    
    //ELIMINAR USUARIOS
    $(document).on('click','.btnDelete', function () {
        let element =$(this)[0].parentElement;
        let id=$(element).attr("IdDato");
        if(confirm("Desea eliminar el regsitro")){
            
            $.post("../PHP/eliminar.php",{id},function (response) {
                $("#alert-2").html(response);
                $("#alert-2").show();
                setTimeout(function () {
                    $("#alert-2").hide();
                },4000);
                mostrar();
            });
        }
    })
    
    
    
        
        
    //ACTUALIZAR USUARIOS
    function requisitUpdate(id) {
        console.log(id)
        $.ajax({
            type: "POST",
            url: "../PHP/actualizar.php",
            data: {
                id:id
            },
            success: function (response) {
                let result=JSON.parse(response);
                
                $("#car").val(result[0].ID);
                $("#name").val(result[0].Nombre);
                $("#apel").val(result[0].Apellido);
                $("#car").val(result[0].Carrera);
                $("#pass").val(result[0].Password);
            }
        });
    }
    
    $("#alert").hide();
    $(document).on('click','.update', function () {
        Guard_Agg=true;
        let element =$(this)[0];
        id=$(element).attr("IdDatosUp");
        requisitUpdate(id);
        console.log(Guard_Agg);
    });

    

});