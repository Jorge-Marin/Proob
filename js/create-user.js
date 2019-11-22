function createAccount(){
    let fields = [
        {field:'firstname', fill:false},
        {field:'lastname', fill:false},
        {field:'email', fill:false},
        {field:'password', fill:false},
        {field:'password-verify', fill:false}
    ]


    for(let i=0; i<fields.length; i++){
        fields[i].fill = markInput(fields[i].field);
    }

    fields[2].fill = validarEmail(fields[2].field);
    console.log(fields[2].fill);
    if(!(fields[2].fill)){
        $('#'+fields[2].field).removeClass('is-valid');
        $('#'+fields[2].field).addClass('is-invalid');
        document.getElementById('email-invalid-feedback').innerHTML = "Correo Inválido";
    }


    if($('#'+fields[3].field).val() != $('#'+fields[4].field).val()){
        if((fields[4].fill)){
            $('#'+fields[4].field).removeClass('is-valid');
            $('#'+fields[4].field).addClass('is-invalid');
            $('#wrong-password-nofill').html("Las contraseñas no coinciden");
            return
        } 
    }


    for(let i=0; i<fields.length; i++){
        if(!fields[i].fill){
            return
        }
    }


    console.log("Ejecutar peticion AJAX");

    let parametros = `firstname=${$('#firstname').val()}&lastname=${$('#lastname').val()}&email=${$('#email').val()}&password=${$('#password').val()}`;
    console.log(parametros);
    
    $.ajax({
        url:'ajax/Usuarios/newacount.php',//Donde quiero enviar la informacion
        method:'POST', //GET, POST, PUT, DELETE
        data:parametros, //Informacion que se enviara (URLEncoded)
        dataType:'json',//Indica el formato de la respuesta, por defecto es html. (text,xml,json)
        success:function(res){ //res es la respuesta (response)
            console.log('Respuesta del servidor:');
            console.log(res);
        },
        error:function(error){
            console.error(error);
        }
    });
    
            
}

function markInput(id){
    let valid = (document.getElementById(id).value=='')?false:true;

    if (valid){
        document.getElementById(id).classList.remove('is-invalid');
        document.getElementById(id).classList.add('is-valid');
    } else{
        document.getElementById(id).classList.remove('is-valid');
        document.getElementById(id).classList.add('is-invalid');        
    }

    return valid;
}


function validarEmail(email){
    verify = $('#'+email).val();
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(verify);
}


function validarEmailEnLinea(email){
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let resultado =  re.test(email);

    if (resultado){
        document.getElementById('email').classList.remove('is-invalid');
        document.getElementById('email').classList.add('is-valid');
    } else{
        document.getElementById('email').classList.remove('is-valid');
        document.getElementById('email').classList.add('is-invalid');        
    }
    document.getElementById('email-invalid-feedback').innerHTML = "Correo Inválido";
    return resultado;
}

function showPassword(){
    if($('#show-password').is(':checked')){
        $('#password').attr('type','text');    
        $('#password-verify').attr('type','text');
    }else{
        $('#password').attr('type','password');    
        $('#password-verify').attr('type','password');
    }

}

