  
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
      {
        path:'/chat/',
        url: 'chat.html'
      },
      {
        path:'/principalRefu/',
        url: 'principalRefu.html'
      },
     
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

var email, NombreRefu;
var latitud, longitud,  lugar;


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

  var service = platform.getSearchService();

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
 
  $$('#PerdiMiMascota').on('click' , geodecodificador);
 
  $$('#AnimalNecesitaAyuda').on('click', fnayudamascota);
  traerDU();
  
})


//principal refu
$$(document).on('page:init', '.page[data-name="principalRefu"]', function (e) {
  
  console.log("Pag PrincipalRefu");
  
  $$('#logout').on('click', logout);
 
  $$('#PerdiMiMascota').on('click' , fnpmascosta);
  
 // $$('#NecesitoAuto').on('click ', fnauto);
 
  $$('#AnimalNecesitaAyuda').on('click', fnayudamascota);
  
  traerDatosRefugio();
})


//perfilrefu
$$(document).on('page:init', '.page[data-name="perfil"]', function (e) {
  console.log("Perfil");
  
  $$('.popup-open').on('popup:open', function (e) {
    console.log('About popup open');
  });

  $$('#agregarfoto').on('click', fnfoto);

  
  traerDatosRefugioPerfil();
  
  $$('#btnEnviar').on('click ' , fnenviarmensaje)
})

//chat
$$(document).on('page:init', '.page[data-name="chat"]', function (e) {

 $$('#msg-btn').on('click', fnchat);
});
     




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
                fotoUsuario:'no',
                alertM:'no',
                Tipo:'U'
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
    
    email=$$('#emailregistroRefu').val();
    password=$$('#passregistroRefu').val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){

          
            var db = firebase.firestore();
            var colRefugio = db.collection('Refugios');

            claveDeColeccionR = email; 
            nombretitu = $$('#NombreTitu').val();
            apellidotitu = $$('#ApelliTitu').val();
            email= $$('#emailregistroRefu').val();
            celrefu = $$('#CelRefu').val();
            instagramrefu= $$('#InstagramRefu').val();
            facebookrefu=$$('#Facebookrefu').val();
            NombreRefu=$$('#NombreRefu').val();

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
              localidad:' no',
              AlertManda:'no',
              AlertReci:'no',
              Tipo:'R',
            

            }
              console.log(NombreRefu);
              console.log(nombretitu);
              console.log(apellidotitu);
              console.log(email);
              console.log(celrefu);
              console.log(instagramrefu);
              console.log(facebookrefu);

            colRefugio.doc(claveDeColeccionR).set(datosRefugio)
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


            //conectar a la coleccion usuarios y traer datos del usuario
            var db = firebase.firestore();
            var colRefugio = db.collection('Refugios');
            
          
           
            
            // "datos de la coleccion "tipo" 
            claveDeColeccionR = email;
            
            var docRef = colRefugio.doc(claveDeColeccionR)
            
          
             docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                Tipo = doc.data().Tipo;
              if (Tipo == 'R'){
                mainView.router.navigate("/principalRefu/");
              }
              else{
                mainView.router.navigate("/principal/");
              }
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            mainView.router.navigate("/principal/");
            console.log("Error getting document:", error);
        });
            

        
       


           
        } )
            
        .catch(function(error) {

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


function traerDatosRefugioPerfil(){ 
  $$('.nombreUR').html(" ")
  var db = firebase.firestore();
  var colRefugio = db.collection('Refugios');
    colRefugio.get()
      .then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        nombreR=doc.data().nombreRefu;
        //ft=doc.data().fotoRefu;
        //email=doc.data().email;
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
  $$('#nombreUsuarioR').html("  ")
  var db = firebase.firestore();
  var colRefugio = db.collection('Refugios');
  colRefugio.get()
  .then(function(QuerySnapshot){
    QuerySnapshot.forEach(function(doc){
      nombreR=doc.data().nombreRefu;
      $$('#nombreUsuarioR').html("<p>" + nombreR + "</p>")
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

/*url = 'https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json';
app.request.json(url, {
  prox: latitud+','+longitud,
  mode: 'retrieveAddresses',
  maxresults: '1',
  gen: '9',
  apiKey: 'FH5DTDCBZY9lHxJb1bYCiWbt-xMR50xAP_WzWEYPDms'
  
  }, function (data) {
   // hacer algo con data
   
   
    console.log(data.Response.View[0].Result[0].Location.Address.Label);
    
    
    
  
}, function(xhr, status) { console.log("error geo: "+status); }   );
 
   console.log("Perdi a mi mascota por esta zona : " ,  (data.Response.View[0].Result[0].Location.Address.Label) )
}
/****************************GEO DECODIFICADOR ************************/



/**********************GEO DECODIFICADOR *******************************/
function fnpmascosta (latitud,longitud){
  // Instantiate a map and platform object:
var platform = new H.service.Platform({
  'apikey': 'lrJdnUUTX28r2LywvXgPoalWJrPVu-za6vX_CHI2ls4'
});

// Get an instance of the search service:
var service = platform.getSearchService();

// Call the reverse geocode method with the geocoding parameters,
// the callback and an error callback function (called if a
// communication error occurs):
service.reverseGeocode({
  at: latitud , longitud
}, (result) => {
  result.items.forEach((item) => {
    // Assumption: ui is instantiated
    // Create an InfoBubble at the returned location with
    // the address as its contents:
    ui.addBubble(new H.ui.InfoBubble(item.position, {
      content: item.address.label
    }));
  });
}, alert);
  
  
 




  

  



  
}
   
  
  function fnayudamascota(){
      console.log( latitud+ " " + longitud)

      cordova.plugins.notification.local.schedule({
        title: 'Hay una mascota que necesita de tu ayuda!!',
        text:  'Esta por esta  direccion: ' + geodecodificador(latitud, longitud),
        foreground: true
    });
     
  }
  

  /*function fnautofnauto() {

      console.log("Necesito a alguien con auto en esta zona : " , geodecodificador(latitud, longitud) )
  }
  */
   






function fnenviarmensaje(){
  
  mainView.router.navigate("/chat/");
  
 
}





function fnchat(){
 
  const mensaje=$$('#msg-input').val();
  console.log(mensaje)
    if(!mensaje.trim()){
      console.log('Input vacio')
      return
    }

    nombre = $$('#NombreReg').val();
    claveDeColeccion=email;
    firebase.firestore().collection('chat').add({
        texto:mensaje,
        id: claveDeColeccion,
        fecha: Date.now(),
            })
            .then(function(e){
              console.log('mensaje guardado')
            })
            .catch(function(e){
              console.log(e)
            });
            $$('#msg-input').val(" ");


            firebase.firestore().collection('chat').orderBy('fecha')
            .onSnapshot(function(Query){
              $$( '.messages-content').html( " " )
            Query.forEach(function(doc){
                console.log(doc.data())

                fecha=doc.data().fecha;
                id=doc.data().id;
                texto=doc.data().texto;
                if(doc.data().id === claveDeColeccion){
                  $$('.messages-content')
                  .append( 
                    `
                  <ul id="messages">
                  <li class="msg my">
                      <span  class="sapn">
                          <i class="name i">:`+ id + ` </i> 
                      </span>
                  </li>
              </ul>`)
                }else{
                  $$( '.messages-content')
                  .html( `
                  <ul id="messages">
                  <li class="msg">
                      <span class="sapn">
                          <i class="name i "> : </i>`+texto+`
                      </span>
                  </li>
              </ul>`)
              }
                }
            )}
            )}



  /*var txtnombre=$$('#nombre');
var txtmensaje=$$('#msg-input');
var btnEnviar=$$('#msg-btn')
var chatUL=$$('#messages')

$$('#btnEnviar').on('click' , function(){
  var nombre = txtnombre.val();
  var mensaje =  txtmensaje.val();
  var hmtll = '<li class="msg"><span ><i class="name ">'+ nombre +' : </i> '+mensaje+' </span></li>'

  chatUL.innerHTML += hmtll;
  
})
*/









   
    







/*var formatoFecha = new Date();
  var d= formatoFecha.getUTCDate();
  var m= formatoFecha.getMonth()+1;
  var y= formatoFecha.getFullYear();
  var h= formatoFecha.getHours();
  var min= formatoFecha.getMinutes();

  Fecha= d+"/"+m+"/"+y+" "+h+":"+min;
  console.log(Fecha)
  

  const messageScreen = $$('#messages');
  const messageForm = $$('#messageForm');
  const msgInput = $$('#msg-input');
  const msgBtn = $$('#msg-btn')
  var db = firebase.firestore();
  var msg = db.collection('/msgs');


  }
*/