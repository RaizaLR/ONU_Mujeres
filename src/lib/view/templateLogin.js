export const login = () => {
    const divLogin = document.createElement("div");   
    divLogin.setAttribute("CLASS","root");
    const viewLogin = `
<h3> Iniciar Sesión </h3>
<img src="./img/logoTuOportunidad.png" alt=""><br><br>
<input type="text" id="loginEmail" placeholder="Email">
<label for="">Texto</label><br><br>
<input type="password" id="loginPassword" class="passwordInput" placeholder="Contraseña">
<label for="">Letras y números</label><br><br>
<button id="logInBtn" href="#/newProfile">Iniciar Sesión</button>
`;

divLogin.innerHTML= viewLogin;

const loginWithEmail = divLogin.querySelector("#logInBtn");
loginWithEmail.addEventListener("click",() =>{
    console.log("hola flanders")
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    var user = firebase.auth().currentUser;
    const userVerified = user.emailVerified;
    if(userVerified === true) { 
      console.log("usuario entro");
      location.assign("#/wall");
      console.log(user);}
    else if (userVerified === false) {
      alert("Por favor verifica tu correo antes de ingresar");
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