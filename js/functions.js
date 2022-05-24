$(document).ready(function () {
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
  });

  function validarDatos(){
    var nombre=document.getElementById("nombre").value;
    if(nombre.length==0){
        document.getElementById("error").innerHTML="El campo nombre esta vacio";
        document.getElementById("nombre").focus();
        return;
    }
    var apellido=document.getElementById("apellido").value;
    if(apellido.length==0){
        document.getElementById("error").innerHTML="El campo apellido esta vacio";
        document.getElementById("apellido").focus();
        return;
    }
    var telefono=document.getElementById("telefono").value;
    if(telefono.length==0){
        document.getElementById("error").innerHTML="El campo telefono esta vacio";
        document.getElementById("telefono").focus();
        return;
    }
    var email=document.getElementById("email").value;
    if(email.length==0){
        document.getElementById("error").innerHTML="El campo email esta vacio";
        document.getElementById("email").focus();
        return;
    }
    var mensaje=document.getElementById("mensaje").value;
    if(mensaje.length==0){
        document.getElementById("error").innerHTML="El campo mensaje esta vacio";
        document.getElementById("mensaje").focus();
        return;
    }
    enviarDatos(nombre,apellido,telefono,email,mensaje)
    
  }

//   function sendData(path, parameters, method='post') {

//     const form = document.createElement('form');
//     form.method = method;
//     form.action = path;
//     document.body.appendChild(form);
  
//     for (const key in parameters) {
//         const formField = document.createElement('input');
//         formField.type = 'hidden';
//         formField.name = key;
//         formField.value = parameters[key];
  
//         form.appendChild(formField);
//     }
//     form.submit();
//   }
  
//   sendData('/myPath/', {query: 'hello world', num: '1'});

function enviarDatos(nombre,apellido,telefono,email,mensaje){
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
    .then(function(response) {
       if(response.ok) {
           return response.text()
       } else {
           throw "Error en la llamada Ajax";
       }
    
    })
    .then(function(texto) {
        document.getElementById("error").innerHTML="La peticion se ha enviado con exito"
    })
    .catch(function(err) {
        document.getElementById("error").innerHTML="Ha habido un error al conectar con el servidor, vuelve a intentarlo más tarde"
        console.log(err)
    });
}