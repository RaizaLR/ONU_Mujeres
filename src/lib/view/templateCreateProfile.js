export const newProfile = () => {
  const divNewProfile = document.createElement("div");
  divNewProfile.setAttribute("CLASS","createProfile");
  const viewNewProfile = ` 
  <img src="./img/chevron_left_24px.png" alt="atrás" class="backBtn">
  <div class= "profileTitle"><h3>Crear Perfil</h3></div><br>
  <img src="./img/profile_image.png" alt="" class="newProfileImage"><br>
  <div class="scroll-container">
  <input type="text" id="name" class="newProfileInput" placeholder="Nombre">
  <label for=""class="TextInputTwo">Solo Letras</label><br>
  <input type="text" id="lastName" class="newProfileInput" placeholder="Apellido">
  <label for=""class="TextInputTwo">Solo Letras</label><br>
  <input type="text" id="city" class="newProfileInput" placeholder="Ciudad">
  <label for=""class="TextInputTwo">Solo Letras</label><br>
  <input type="text" id="instagram" class="newProfileInput" placeholder="Instagram">
  <label for=""class="TextInputTwo">Escribe tu usuario de Instagram</label><br>
  <input type="text" id="facebook" class="newProfileInput" placeholder="Facebook">
  <label for=""class="TextInputTwo">Escribe tu usuario de Facebook</label><br>
  <input type="textarea" id="aboutMe" class="newProfileInput" placeholder="Sobre mi">
  <label for=""class="TextInputTwo">Cuentanos algo sobre ti</label><br>
  </div>
  <div class="newProfileBtn">
  <button id="newProfileBtn" class="profileButton">SIGUIENTE</button></div><br>
  <a id="showProfile" href="#/showProfile">Ver perfil</a><br>
  
`

  divNewProfile.innerHTML = viewNewProfile;

  
  const newProfileBtn = divNewProfile.querySelector("#newProfileBtn");
  newProfileBtn.addEventListener("click", () => {
    let userName = divNewProfile.querySelector("#name").value;
    let lastName = divNewProfile.querySelector("#lastName").value;
    let city = divNewProfile.querySelector("#city").value;
    let instagram = divNewProfile.querySelector("#instagram").value;
    let facebook = divNewProfile.querySelector("#facebook").value;
    let aboutMe = divNewProfile.querySelector("#aboutMe").value;
    const firestore = firebase.firestore();
    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;
  firestore.collection('users').doc(uid).set({name: userName,
    lastname: lastName,
    city: city,
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