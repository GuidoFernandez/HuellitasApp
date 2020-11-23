  
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
  logout();
  traerDatos();
  
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

};




function traerDatos(){
    var traerColecciones = db.collectionGroup('Refugios').where("NombreRefu", "==" , true );
    traerColecciones.get()
    .then(function(){
      var db = firebase.firestore();
      var colRefugio = db.collection('Refugios');
        colRefugio.get()
          .then(function(querySnapshot){
          querySnapshot.forEach(function(docRefu){
          nr=docRefu.data().NombreRefu;
          ft=docRefu.data().fotoRefu;
          $$('#nombreusuario').html("<p>" + nr + "</p>")
          $$('#fotoPerfil').attr('src', 'ft')
  
        })
      })
    })
    .catch(function(){
      traerColecciones.get()
      var db = firebase.firestore();
      var colPersonas = db.collection('Personas')
      colPersonas.get()
        .then(function(querySnapshot){
           querySnapshot.forEach(function(doc){
            n=doc.data().nombre;
            a=doc.data().apellido;
            f=doc.data().fotoUsuario;
            $$('#nombreUsuario').html("<p>" + n + " " + a + "</p>")
            $$('#fotoPerfil').attr('src' , 'f')
      })
    })
  })
};
   
    




   
    