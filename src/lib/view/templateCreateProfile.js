export const newProfile = () => {
  const divNewProfile = document.createElement("div");
  divNewProfile.setAttribute("CLASS","createProfile");
  const viewNewProfile = ` 
  <img src="./img/chevron_left_24px.png" alt="atrás" class="backBtn">
  <div class= "profileTitle"><h3>Crear Perfil</h3></div><br>
  <img src="./img/profile_image.png" alt="" class="newProfileImage"><br>
  <div class="scroll-container">

  <div class="loginEmailInputContainer">
  <input type="text" id="name" class="loginEmailInput" required>
  <span class="loginEmailTextInput">Nombre</span>
  <label for=""class="loginEmailTextInput2">Solo Letras</label><br><br></div>

  <div class="loginEmailInputContainer">
  <input type="text" id="lastname" class="loginEmailInput" required>
  <span class="loginEmailTextInput">Apellido</span>
  <label for=""class="loginEmailTextInput2">Solo Letras</label><br><br></div>

  <div class="loginEmailInputContainer">
  <input type="text" id="city" class="loginEmailInput" required>
  <span class="loginEmailTextInput">Ciudad</span>
  <label for=""class="loginEmailTextInput2">Solo Letras</label><br><br></div>

  <div class="loginEmailInputContainer">
  <input type="text" id="occupation" class="loginEmailInput" required>
  <span class="loginEmailTextInput">Ocupación</span>
  <label for=""class="loginEmailTextInput2">Solo Letras</label><br><br></div>

  <div class="loginEmailInputContainer">
  <input type="text" id="instagram" class="loginEmailInput" required>
  <span class="loginEmailTextInput">Instagram</span>
  <label for=""class="loginEmailTextInput2">Escribe tu usuario de Instagram</label><br><br></div>

  <div class="loginEmailInputContainer">
  <input type="text" id="facebook" class="loginEmailInput" required>
  <span class="loginEmailTextInput">Facebook</span>
  <label for=""class="loginEmailTextInput2">Escribe tu usuario de Facebook</label><br><br></div>

  <div class="loginEmailInputContainer">
  <input type="text" id="aboutMe" class="loginEmailInput" required>
  <span class="loginEmailTextInput">Sobre mi</span>
  <label for=""class="loginEmailTextInput2">Cuentanos algo sobre ti</label><br><br>
  </div>
  </div>

  <div class="newProfileBtn">
  <button id="newProfileBtn" class="profileButton">SIGUIENTE</button></div><br>
  <a id="showProfile" href="#/showProfile">Ver perfil</a><br>
  
`

  divNewProfile.innerHTML = viewNewProfile;

  
  const newProfileBtn = divNewProfile.querySelector("#newProfileBtn");
  newProfileBtn.addEventListener("click", () => {
    let userName = divNewProfile.querySelector("#name").value;
    let lastName = divNewProfile.querySelector("#lastname").value;
    let city = divNewProfile.querySelector("#city").value;
    let occupation = divNewProfile.querySelector("#occupation").value;
    let instagram = divNewProfile.querySelector("#instagram").value;
    let facebook = divNewProfile.querySelector("#facebook").value;
    let aboutMe = divNewProfile.querySelector("#aboutMe").value;
  
    const firestore = firebase.firestore();
    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;
  firestore.collection('users').doc(uid).set({name: userName,
    lastname: lastName,
    city: city,
    occupation: occupation,
    instagram: instagram,
    facebook: facebook,
    aboutMe: aboutMe,
    userID: uid,}).then(()=>{
    location.assign("#/showProfile");
    console.log(firestore.collection('users'));
    });
  });
 

return divNewProfile;
      }