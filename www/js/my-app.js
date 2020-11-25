  
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


//principal deviceready
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    
    $$('#iniciar').on('click', fniniciar);

   
   
    
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
  traerDatosRefugio();
})

$$(document).on('page:init', '.page[data-name="perfil"]', function (e) {
  console.log("Perfil");
  $$('.popup-open').on('popup:open', function (e) {
    console.log('About popup open');
  });

  $$('#agregarfoto').on('click', fnfoto);
  traerDUP();
  traerDatosRefugioPerfil();
  
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
  navigator.camera.getPicture(onSuccess,onError,
    {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
}

function onSuccess(imageURI){
  $$('#fotoPerfilU').attr('src' , imageURI);
}

function onError (message){
  console.log('Error : ' + message)
}












    




   
    