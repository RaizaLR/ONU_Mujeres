export const login = () => {
    const divLogin = document.createElement("div");   
    divLogin.setAttribute("CLASS","viewLogin");
    const viewLogin = `
<img src="./img/chevron_left_24px.png" alt="atrás" class="backBtn">

<div class= "loginTitle"><h3>Iniciar Sesión</h3><img src="./img/spainFlag.png" alt="Español" class="loginFlag"></div>

<div class= "loginImage"><img src="./img/logoTuOportunidad.png" alt=""></div><br><br><br><br><br><br>

<div class= "inputsBigContainer">
<div class="loginEmailInputContainer">
<input type="text" id="loginEmail" class="loginEmailInput" required>
<span class="loginEmailTextInput">Email</span>
<label for=""class="loginEmailTextInput2">Texto</label>
</div><br><br>

<div class="loginEmailInputContainer">
<input type="password" id="loginPassword" class="loginPasswordInput" required>
<span class= "loginPasswordTextInput">Contraseña</span><br>
<label for="" class= "loginPasswordTextInput2">Letras y números</label>
</div><br><br>
</div>

<div class= "loginButtonContainer">
<button id="logInBtn" class= "logInBtn" href="#/newProfile">INICIAR SESIÓN</button>
</div>
`

divLogin.innerHTML= viewLogin;

const loginWithEmail = divLogin.querySelector("#logInBtn");
loginWithEmail.addEventListener("click",() =>{
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    var user = firebase.auth().currentUser;
      console.log("usuario entro");
      if(user.displayName !== null) {
        location.assign("#/home");
      }
      else if (user.displayName === null) {
        location.assign("#/createProfile");
      }
    // Signed in
    // ...
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

return divLogin;
}