  
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
      }
    ]
    // ... other parameters
  });

var mainView = app.views.create('.view-main');
var email, NombreRefu;
//principal
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



function fnregistrar(){
    email=$$('#emailregistro').val();
    password=$$('#passregistro').val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
      fnbase();  
      mainView.router.navigate('/index/')
    })
    
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorCode)
      })

      
   }
 
   function fnbase(){
     //base de datos

    var db = firebase.firestore();
    var colUsuario = db.collection('Personas');

      claveDeColeccion = email; 
      nombre = $$('#NombreReg').val();
      apellido = $$('#ApellieReg').val();
      cel = $$('#CelReg').val();

      datosUsuario = {
        nombre : nombre,
        apellido : apellido, 
        cel : cel

      }

      colUsuario.doc(claveDeColeccion).set(datosUsuario)
      .then( function() {
       mainView.router.navigate('/index/');


   })

   .catch( function(e) {

       
   });
};

      
     
      
  


     
  








 function fnregistrarRefu(){
    email=$$('#emailregistroRefu').val();
    password=$$('#passregistroRefu').val();

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(){
      mainView.router.navigate('/index/')
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