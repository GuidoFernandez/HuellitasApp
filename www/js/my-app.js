  
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
      {
        path:'/Mperdidas/',
        url: ' Mperdidas.html'
      }
     
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');

var email, NombreRefu;
var latitud, longitud,  lugar, imagenesFBref;


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
 
  traerDU();

  
  $$('#AlertaP').on('click' , fnAlertaP, CrearAlert);

  $$('#AlertaN').on('click' , AlertaN);
  
  
})


//principal refu
$$(document).on('page:init', '.page[data-name="principalRefu"]', function (e) {
  
  console.log("Pag PrincipalRefu");
  
  $$('#logout').on('click', logout);
 
  

  traerDatosRefugio();

  // DOM events for About popover
  $$('.popup-alertaP').on('popup:open', function (e) {
    console.log('About popup open');
  });
  

  $$('#AlertaP').on('click' , fnAlertaP, CrearAlert);

  $$('#AlertaN').on('click' , AlertaN);

  $$('#AlertaAu').on('click' , AlertaAu)
  

});


//perfilrefu
$$(document).on('page:init', '.page[data-name="perfil"]', function (e) {
  console.log("Perfil");
  
  $$('.popup-open').on('popup:open', function (e) {
    console.log('About popup open');
  });



  
  traerDatosRefugioPerfil();
  
  $$('#btnEnviar').on('click ' , fnenviarmensaje)

  $$('#actuliza').on('click', uploadprofile )
})

//chat
$$(document).on('page:init', '.page[data-name="chat"]', function (e) {

 $$('#msg-btn').on('click', fnchat);
});


//Mascotas Perdidas 

$$(document).on('page:init', '.page[data-name="Mperdidas"]', function (e) {
  console.log('Mascotas perdidas')
  
  fnMuestraMP();

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

            claveDeColeccion = email; 
            
            nombretitu = $$('#NombreTitu').val();
            apellidotitu = $$('#ApelliTitu').val();
            email= $$('#emailregistroRefu').val();
            celrefu = $$('#CelRefu').val();
            instagramrefu= $$('#InstagramRefu').val();
            facebookrefu=$$('#Facebookrefu').val();
            NombreRefu=$$('#NombreRefu').val();
            Localidad=$$('#Localidad').val();
            direccion= $$('#Direccion').val();
            
            datosRefugio = {
              nombreRefu : NombreRefu,
              nombretitu : nombretitu,
              apellidotitu : apellidotitu, 
              email : email,
              cel : celrefu,
              instagram : instagramrefu,
              facebook : facebookrefu,
              fotoRefu:'no',
              direccion: direccion,
              localidad: Localidad,
              Tipo:'R',
            

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


            //conectar a la coleccion usuarios y traer datos del usuario
            var db = firebase.firestore();
            var colRefugio = db.collection('Refugios');
            
          
           
            
            // "datos de la coleccion "tipo" 
            claveDeColeccion = email;
            
            var docRef = colRefugio.doc(claveDeColeccion)
            
          
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
                mainView.router.navigate("/principal/");
                
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




function fnenviarmensaje(){
  mainView.router.navigate("/chat/")
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
                          <i class="name ">`+ texto + ` </i> 
                      </span>
                  </li>
              </ul>`)
                }else if (doc.data().id !== claveDeColeccion){
                  $$( '.messages-content')
                  .append( `
                  <ul id="messages">
                  <li class="msg">
                      <span class="sapn">
                          <i class="name  ">  </i>`+texto+`
                      </span>
                  </li>
              </ul>`)
              }
              else{
                $$('.messages-content')
                .append( 
                  `
                <ul id="messages">
                <li class="msg my">
                    <span  class="sapn">
                        <i class="name ">`+ texto + ` </i> 
                    </span>
                </li>
            </ul>`)
              }
                }
            )}
            )}



            function fnAlertaP (){
              
             
              var db = firebase.firestore();
              var colAlertas = db.collection('LostPetAlerts');
             
            
              var NombreM=$$('#NombreM').val();
              var Mascosta=$$('#Mascosta').val();
              var Raza=$$('#Raza').val();
              var Color=$$('#ColorP').val();
              var Collar=$$('#Collar').val();
              var Foto=$$('#archivo').val();
              var Localidad =$$('#Localidad').val();
              var Direccion= $$('#Direccion').val();
              claveDeColeccion=email
                datosDeAlerta={
                  Dueño: claveDeColeccion,
                  NombreM: NombreM,
                  Mascosta: Mascosta,
                  Raza:Raza,
                  Color:Color,
                  Collar:Collar,
                  Foto:Foto,
                  Localidad: Localidad,
                  Direccion: Direccion, 
                  Fecha: Date.now(),
                
                }
               
                console.log(claveDeColeccion)
                console.log(NombreM)
                console.log(Mascosta)
                console.log(Raza)
                console.log(Color)
                console.log(Collar)
                console.log(Foto)
                console.log(Localidad)
                console.log(Direccion)
              
                colAlertas.doc().set(datosDeAlerta)
                .then( function() {
                  console.log('Okeyyyy')
                  CrearAlert()
                  
                 })
                .catch( function(e) {
                  console.log(e)

                })

              
          
          
          } 

          function CrearAlert(){
            var db = firebase.firestore();
            var colAlertas = db.collection('LostPetAlerts');
            colAlertas.get()
            .then(function(QuerySnapshot){
              QuerySnapshot.forEach(function(doc){
                console.log(doc.data())
                Dueño = doc.data().Dueño;
                NombreM = doc.data().NombreM; 
                Mascota = doc.data().Mascosta;
                Raza = doc.data().Raza;
                Color = doc.data().Color;
                Collar= doc.data().Collar;
                Localidad= doc.data().Localidad;
                Direccion=doc.data().Direccion;

                if(doc.data().Dueño == claveDeColeccion){

               
                  
                  cordova.plugins.notification.local.schedule({
                    title: 'Animal perdido por tu zona',
                    text:'Ayuda a : ' + Dueño +  ' a encontrar su mascota ♥  ' , 
                    
                    
                   
                   
                    
                

                    foreground: true
                });

                    


                }
              })


              })
        
             }

             function fnMuestraMP(){
              var db = firebase.firestore();
              var colAlertas = db.collection('LostPetAlerts');
              colAlertas.get()
              .then(function(QuerySnapshot){
                QuerySnapshot.forEach(function(doc){
                  console.log(doc.data())
                  Dueño = doc.data().Dueño;
                  NombreM = doc.data().NombreM; 
                  Mascota = doc.data().Mascosta;
                  Raza = doc.data().Raza;
                  Color = doc.data().Color;
                  Collar= doc.data().Collar;
                  Localidad= doc.data().Localidad;
                  Direccion=doc.data().Direccion;
  
                  
  
                    $$('.page-content-mascotasP')
                    .append(
                      `
                      <div class="contendorM">
                            
                          <h1 id="Titulo">¡Me perdí!</h1>
                          <img src=" " alt="" id="foto">
                          <h3 id="lugar">`+ Localidad + `</h3>
                          <h4 id="Calle"> `+ Direccion +`</h4>
                          <h4 id="NombreMM">` + NombreM + ` </h4>
                          <h4 id="raza"> ` + Raza + `</h4>
                          <h4 id="Num">` + Dueño +`</h4>
                  
                       </div>  
                  
                      
                      
                      `
              
                    )
              
                  
                })
               })
             }
            
            function AlertaN(){
              var db = firebase.firestore();
              var coleMayuda = db.collection('coleMayuda');
              
              var lurgar=$$('#lugarr').val();
              var lurga2=$$('#lugar2').val();
              var mascotita=$$('#mascotita').val();
              var extra=$$('#extraa').val();
              claveDeColeccion=email
              console.log(lurgar)
              console.log(lurga2)
              console.log(mascotita)
              console.log(extra)
             
              datitos={

                Localidad: lurgar,
                Altura : lurga2,
                mascota: mascotita, 
                extra: extra,
                id: claveDeColeccion, 
              }
                

                coleMayuda.doc().set(datitos)
                .then( function() {
                  console.log('Enviando...')
                  CrearAlert2()
                  
                 })
                .catch( function(e) {
                  console.log(e)

                })

              
            } 

            function CrearAlert2(){
              var db = firebase.firestore();
              var coleMayuda = db.collection('coleMayuda');
              coleMayuda.get()
              .then(function(QuerySnapshot){
                QuerySnapshot.forEach(function(doc){
                  console.log(doc.data())
                  Localidad=doc.data().Localidad;
                  Altura=doc.data().Altura;
                  mascota=doc.data().mascota;
                  extra=doc.data().extra;


                  cordova.plugins.notification.local.schedule({
                    title: 'Una mascota necesita ayuda URGENTE',
                    text:'Hay un '+ mascota + ' que necesita ayuda en : ' + Localidad + ' , '+  Altura + '', 
                    
                    
                   
                   
                    
                

                    foreground: true
                });


                })
              })

            }

            
            function AlertaAu(claveDeColeccion){
              var db = firebase.firestore();
              var ColAuto = db.collection('ColAuto');

              var AutoLugar= $$('#Autolugar').val();
              var AutoCalle= $$('#AutoCalle').val();

              claveDeColeccion=email;

              DatosAuto={
                AutoLugar: AutoLugar,
                AutoCalle: AutoCalle,
                Id : claveDeColeccion,
              }

              ColAuto.doc().set(DatosAuto)
              .then( function() {
                firebase.firestore().collection('ColAuto')
                .onSnapshot(function(Query){
                  Query.forEach(function(doc){
                    AutoLugar=doc.data().AutoLugar
                    AutoCalle=doc.data().AutoCalle

                    
                      
                      cordova.plugins.notification.local.schedule({
                        title: 'Necesito un auto!',
                        text:'Estoy en : ' + AutoLugar + ',' + AutoCalle , 
                        
                        
                       
                       
                        
                    
    
                        foreground: true
                    });
                   
                  })
           

                
                
               })
              })
              .catch( function(e) {
                console.log(e)

              })


             
            }
          
            

            
           
             function uploadprofile(){
              
            

              var file  = $$('#perfil')[0].files[0];
              
              var storageRef = storage.ref('/FotosU');
              storageRef.put(file);

              
            }
          
           


   

              





             
    






 
 