export const login = () => {
    const divLogin = document.createElement("div");   
    divLogin.setAttribute("CLASS","viewLogin");
    const viewLogin = `
<a href=""><img src="./img/chevron_left_24px.png" alt="atrás" class="backBtn"></a>

<div class= "loginTitle"><h3 class="logIn">Iniciar Sesión</h3></div>

<div class= "loginImage"><img src="./img/logoTuOportunidad.png" alt=""></div><br><br><br><br>

<div class= "inputsBigContainer">
<div class="loginEmailInputContainer">
<input type="text" id="loginEmail" class="loginEmailInput" required>
<span class="loginEmailTextInput">Email</span>
<label for=""class="loginEmailTextInput2">Texto</label>
</div><br><br>

<div class="loginEmailInputContainer">
<input type="password" id="loginPassword" class="loginPasswordInput" required>
<span class= "loginPasswordTextInput">Contraseña</span><br>
<label for="" class= "loginEmailTextInput2">Letras y números</label>
</div><br>

<div class="eyeImageContainer">
<img src= "img/visibility.png" id="eye" class= "eyeImage"><br>
</div><br><br><br><br><br>

<div class= "loginButtonContainer">
<button id="logInBtn" class= "logInBtn" href="#/newProfile">INICIAR SESIÓN</button>
</div>
`

divLogin.innerHTML= viewLogin;


const firestore = firebase.firestore();
const loginWithEmail = divLogin.querySelector("#logInBtn");
loginWithEmail.addEventListener("click",() =>{
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    var user = firebase.auth().currentUser;
    const uid = user.uid;
      firestore.collection('users').doc(uid).get().then(function(doc){
        if (doc.exists) {
            location.assign("#/home");
        } else {
            location.assign("#/createProfile");
        }});
  })
  .catch((error) => {
      console.log("usuario no entro");
      alert("usuario y/o clave incorrecta");
      location.assign("#/");
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });}
)
let passwordInput = divLogin.querySelector("#loginPassword");
let eyeIcon = divLogin.querySelector("#eye");

eyeIcon.addEventListener("click", ()=>{
console.log("hola")
  if(passwordInput.type === "password"){
    passwordInput.type = "text";
    eyeIcon.src = "img/invisible.png";
  }else{
    passwordInput.type = "password";
    eyeIcon.src = "img/visibility.png";
  }
});
return divLogin;
}

