  
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {
        path: '/registro/',
        url: 'registro.html',
      },
      {
        path:'/principal/',
        url: 'principal.html',
      },
      {
        path:'/index/',
        url: 'index.html',
      },
      {
        path:'/registroRefu/',
        url: 'registroRefu.html'
      },
      {
        path:'/perfil/',
        url: 'perfil.html'
      },
     
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

var email, NombreRefu;
var latitud, longitud ;


//principal deviceready
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    
    $$('#iniciar').on('click', fniniciar);

    var onSuccess = function(position) {
      latitud= position.coords.latitude;
      longitud= position.coords.longitude;

     /**  alert('Latitude: '          + position.coords.latitude          + '\n' +
            'Longitude: '         + position.coords.longitude         + '\n' +
            'Altitude: '          + position.coords.altitude          + '\n' +
            'Accuracy: '          + position.coords.accuracy          + '\n' +
            'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
            'Heading: '           + position.coords.heading           + '\n' +
            'Speed: '             + position.coords.speed             + '\n' +
            'Timestamp: '         + position.timestamp                + '\n');
            */
  };

  // onError Callback receives a PositionError object
  //
  function onError(error) {
      alert('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
  }

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
   
  var platform = new H.service.Platform({
    'apikey': 'lrJdnUUTX28r2LywvXgPoalWJrPVu-za6vX_CHI2ls4'
  });
  
});
//index
$$(document).on('page:init', '.page[data-name="index"]', function (e) {
  console.log("registro");
  $$('#iniciar').on('click', fniniciar);
          
})


//regsitro usario
$$(document).on('page:init', '.page[data-name="registro"]', function (e) {
    console.log("registro");
    $$('#registro').on('click', fnregistrar);
 
})


//registrar refugio
$$(document).on('page:init', '.page[data-name="registroRefu"]', function (e) {
  console.log("Refu");

  $$('#registroRefu').on('click', fnregistrarRefu);
  
})

//principal.html
$$(document).on('page:init', '.page[data-name="principal"]', function (e) {
  console.log("Pag Principal");
  $$('#logout').on('click', logout);
  $$('#PerdiMiMascota').on('click' , fnpmascosta);
  $$('#AnimalNecesitaAyuda').on('click', fnayudamascota);
  traerDU();
  traerDatosRefugio();
})

//perfil
$$(document).on('page:init', '.page[data-name="perfil"]', function (e) {
  console.log("Perfil");
  
  $$('.popup-open').on('popup:open', function (e) {
    console.log('About popup open');
  });

  $$('#agregarfoto').on('click', fnfoto);

  traerDUP();
  traerDatosRefugioPerfil();
  
  $$('#btnEnviar').on('click ' , fnenviarmensaje)
})
     




      function fnregistrar(){
          email=$$('#emailregistro').val();
          password=$$('#passregistro').val();

          firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(function(){

            var db = firebase.firestore();
            var colPersonas = db.collection('Personas');
        
            claveDeColeccion = email;
            nombre = $$('#NombreReg').val();
            apellido = $$('#ApelliReg').val();
            cel = $$('#CellReg').val();

            datos = { 
                email: email,
                nombre: nombre,
                apellido: apellido,
                cel: cel,
                fotoUsuario:'no'
            }
            console.log(nombre);
            console.log(apellido);
            console.log(cel);
            colPersonas.doc(claveDeColeccion).set(datos)
            .then( function() {
                mainView.router.navigate("/index/");
        
        
            })
        
            .catch( function(e) {
        
                
            })
         
          })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode)
      })


      
 }
 
     
      



 function fnregistrarRefu(){
    NombreRefu=$$('#NombreRefu').val();
    email=$$('#emailregistroRefu').val();
    password=$$('#passregistroRefu').val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){

     
      var db = firebase.firestore();
      var colRefugio = db.collection('Refugios');

      claveDeColeccion = NombreRefu; 
      nombretitu = $$('#NombreTitu').val();
      apellidotitu = $$('#ApelliTitu').val();
      email= $$('#emailregistroRefu').val();
      celrefu = $$('#CelRefu').val();
      instagramrefu= $$('#InstagramRefu').val();
      facebookrefu=$$('#Facebookrefu').val();

      datosRefugio = {
        nombreRefu : NombreRefu,
        nombretitu : nombretitu,
        apellidotitu : apellidotitu, 
        email : email,
        cel : celrefu,
        instagram : instagramrefu,
        facebook : facebookrefu,
        fotoRefu:'no',
        direccion: 'no',
        localidad:' no'
       

      }
        console.log(NombreRefu);
        console.log(nombretitu);
        console.log(apellidotitu);
        console.log(email);
        console.log(celrefu);
        console.log(instagramrefu);
        console.log(facebookrefu);

      colRefugio.doc(claveDeColeccion).set(datosRefugio)
      .then( function() {
        mainView.router.navigate("/index/");


    })

    .catch( function(e) {

        
    })

   
  })
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode)
      })
           
      }



function fniniciar(){
    email=$$('#emailregistroRefu').val();
    password=$$('#passregistroRefu').val();
    email=$$('#emaillogin').val();
    password=$$('#passlogin').val();

  firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(){
        mainView.router.navigate('/principal/')
      }).catch(function(error) {

        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode);
        // ...
      });

}

function logout(){
  firebase.auth().signOut().then(function() {
    console.log('salido pa')
    mainView.router.navigate('/index/')
    $$('nombreUsuario').html('  ');
  }).catch(function(error) {
    // An error happened.
  });

};

function traerDU(){
  $$('#nombreUsuario').html(" ")
  var db = firebase.firestore();
  var colPersonas = db.collection('Personas');
    colPersonas.get()
    .then(function(QuerySnapshot){
        QuerySnapshot.forEach(function(doc){
            nombre=doc.data().nombre;
            apellido=doc.data().apellido;
            //fotoRefu=doc.data().apellido;
            $$('#nombreUsuario').html( "<p>" + nombre + " " + apellido + "</p>")
            
        })
    })
}
function traerDUP(){
  $$('.nombreUR').html(" ")
  var db = firebase.firestore();
  var colPersonas = db.collection('Personas');
    colPersonas.get()
    .then(function(QuerySnapshot){
        QuerySnapshot.forEach(function(doc){
            nombre=doc.data().nombre;
            apellido=doc.data().apellido;
            //fotoRefu=doc.data().apellido;
            $$('.nombreUR').append( "<p>" + nombre + " " + apellido + "</p>")
            
        })
    })
}

function traerDatosRefugioPerfil(){ 
  $$('.nombreUR').html(" ")
  var db = firebase.firestore();
  var colRefugio = db.collection('Refugios');
    colRefugio.get()
      .then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        nombreR=doc.data().nombreRefu;
        //ft=doc.data().fotoRefu;
        email=doc.data().email;
        $$('.nombreUR').append("<p>" + nombreR + "</p>")
        //$$('.emailP').append("<p>" + email + "</p>")
        //$$('#fotoPerfil').attr('src', 'ft')

  })
  })
     .catch(function(error){
       console.error("Error: "+ error)
  

})
};

function traerDatosRefugio(){
  $$('#nombreUsuario').html("  ")
  var db = firebase.firestore();
  var colRefugio = db.collection('Refugios');
  colRefugio.get()
  .then(function(QuerySnapshot){
    QuerySnapshot.forEach(function(doc){
      nombreR=doc.data().nombreRefu;
      $$('#nombreUsuario').append("<p>" + nombreR + "</p>")
    })
  })
}

function fnfoto(){
  navigator.camera.getPicture(onSuccessCamara, onErrorCamara,
    {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}

function onSuccessCamara(imageURI){
  $$('#fotoPerfilU').attr('src' , imageURI);
}

function onErrorCamara (message){
  console.log('Error : ' + message)
}

  var latitud=latit;
  var longitud=longit
  function geodecodificador(latit,longit){
  url = 'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json';
  app.request.json(url, {
    prox: latit+','+longit,
    mode: 'retrieveAddresses',
    maxresults: '1',
    gen: '9',
    apikey: 'lrJdnUUTX28r2LywvXgPoalWJrPVu-za6vX_CHI2ls4'
    }, function (data) {
     // hacer algo con data
     console.log(data);
   
      console.log(data.Response.View[0].Result[0].Location.Address.Label);
   
   
   
  }, function(xhr, status) { console.log("error geo: "+status); }   );
   
   
  }
  

  function fnpmascosta(){
    
    console.log("Perdi a mi mascota necesito ayuda! Lo perdi en este lugar: " + latit + " " + longit )
  }
  
  function fnayudamascota(){
   
    console.log("Hay una mascota que necesita ayuda! Está en :"  + latitud + " " + longitud  )
  }
  
  
   

















function fnenviarmensaje (){
  var formatoFecha = new Date();
  var d= formatoFecha.getUTCDate();
  var m= formatoFecha.getMonth()+1;
  var y= formatoFecha.getFullYear();
  var h= formatoFecha.getHours();
  var min= formatoFecha.getMinutes();

  Fecha= d+"/"+m+"/"+y+" "+h+":"+min;
  console.log(Fecha)
  
}











   
    