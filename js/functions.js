$(document).ready(
    function () {
        $("#error").hide();
        $('.title').fadeIn(1500);
        $('.titulo').fadeIn(1000);
        $('.cvs').fadeIn(3000);
        $('#L11').hide();
        $('#L22').hide();
        $('#L33').hide();
        $('#L44').hide();

        $("#L1").click(function () {
            $('#1').slideToggle();
            $(this).hide();
            $('#L11').show();
        });
        $("#L11").click(function () {
            $('#1').slideToggle();
            $(this).hide();
            $('#L1').show();
        });

        $("#L2").click(function () {
            $('#2').slideToggle();
            $(this).hide();
            $('#L22').show();
        });
        $("#L22").click(function () {
            $('#2').slideToggle();
            $(this).hide();
            $('#L2').show();
        });

        $("#L3").click(function () {
            $('#3').slideToggle();
            $(this).hide();
            $('#L33').show();
        });
        $("#L33").click(function () {
            $('#3').slideToggle();
            $(this).hide();
            $('#L3').show();
        });

        $("#L4").click(function () {
            $('#4').slideToggle();
            $(this).hide();
            $('#L44').show();
        });
        $("#L44").click(function () {
            $('#4').slideToggle();
            $(this).hide();
            $('#L4').show();
        });
    }

);

function validarDatos() {
    $("#error").hide();
    $("#charge").css('display', "flex");

    var nombre = document.getElementById("nombre").value;
    if (tiene_numeros(nombre)) {
        document.getElementById("error").innerHTML = "EL CAMPO 'NOMBRE' NO PUEDE CONTENER NÚMEROS";
        document.getElementById("nombre").focus();
        $("#charge").css('display', "none");
        $("#error").show(1000);
        return;
    }
    if (nombre.length < 3) {
        document.getElementById("error").innerHTML = "EL CAMPO 'NOMBRE' DEBE TENER AL MENOS 3 CARACTERES";
        document.getElementById("nombre").focus();
        $("#charge").css('display', "none");
        $("#error").show(1000);
        return;
    }

    var apellido = document.getElementById("apellido").value;
    if (tiene_numeros(apellido)) {
        document.getElementById("error").innerHTML = "EL CAMPO 'APELLIDO' NO PUEDE CONTENER NÚMEROS";
        document.getElementById("apellido").focus();
        $("#charge").css('display', "none");
        $("#error").show(1000);
        return;
    }
    if (apellido.length < 3) {
        document.getElementById("error").innerHTML = "EL CAMPO' APELLIDO' DEBE TENER AL MENOS 3 CARACTERES";
        $("#charge").css('display', "none");
        $("#error").show(1000);
        return;
    }

    var telefono = document.getElementById("telefono").value;
    if (tiene_letras(telefono)) {
        document.getElementById("error").innerHTML = "EL CAMPO 'TELÉFONO' NO PUEDE CONTENER LETRAS";
        document.getElementById("telefono").focus();
        $("#charge").css('display', "none");
        $("#error").show(1000);
        return;
    }
    if (telefono.length != 9) {
        document.getElementById("error").innerHTML = "EL CAMPO 'TELÉFONO' DEBE CONTENER 9 CARACTERES";
        $("#charge").css('display', "none");
        $("#error").show(1000);
        document.getElementById("telefono").focus();
        return;
    }

    var email = document.getElementById("email").value;
    if (email.length == 0) {
        document.getElementById("error").innerHTML = "EL CAMPO 'EMAIL' ESTÁ VACÍO";
        $("#charge").css('display', "none");
        $("#error").show(1000);
        document.getElementById("email").focus();
        return;
    }
    if (!val_email(email)) {
        document.getElementById("error").innerHTML = "EL CAMPO 'EMAIL' NO ES VÁLIDO";
        $("#charge").css('display', "none");
        $("#error").show(1000);
        document.getElementById("email").focus();
        return;
    }

    var mensaje = document.getElementById("mensaje").value;
    if (mensaje.length < 10) {
        document.getElementById("error").innerHTML = "EL CAMPO 'MENSAJE' DEBE TENER AL MENOS 10 CARACTERES";
        $("#charge").css('display', "none");
        $("#error").show(1000);
        document.getElementById("mensaje").focus();
        return;
    }
    enviarDatos(nombre, apellido, telefono, email, mensaje);
}

function enviarDatos(nombre, apellido, telefono, email, mensaje) {
    const data = new FormData();
    data.append('nombre', nombre);
    data.append('apellido', apellido);
    data.append('telefono', telefono);
    data.append('email', email);
    data.append('mensaje', mensaje);
    fetch('http://127.0.0.1:8000/veterinaria/guardarPeticion/', {
        method: 'POST',
        body: data
    })
        .then(function (response) {
            if (response.ok) {
                return response.text()
            } else {
                throw "Error en la llamada Ajax";
            }

        })
        .then(function (texto) {
            document.getElementById("error").innerHTML = "TU MENSAJE HA SIDO ENVIADO"
            $("#charge").css('display', "none");
            $("#error").show(1000);
        })
        .catch(function (err) {
            document.getElementById("error").innerHTML = "HA HABIDO UN ERROR EN EL SERVIDOR"
            $("#charge").css('display', "none");
            $("#error").show(1000);
            console.log(err);
        });
}

function tiene_numeros(texto) {
    var numeros = "0123456789";
    for (i = 0; i < texto.length; i++) {
        if (numeros.indexOf(texto.charAt(i), 0) != -1) {
            return true;
        }
    }
    return false;
}

function tiene_letras(texto) {
    var letras = "abcdefghyjklmnñopqrstuvwxyz";
    texto = texto.toLowerCase();
    for (i = 0; i < texto.length; i++) {
        if (letras.indexOf(texto.charAt(i), 0) != -1) {
            return 1;
        }
    }
    return 0;
}

function val_email(email) {
    var regExp = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    if (regExp.test(email)) {
        return true;
    }
    return false;
}