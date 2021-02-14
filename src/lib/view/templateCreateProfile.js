export const newProfile = () => {
  const divNewProfile = document.createElement("div");
  divNewProfile.setAttribute("CLASS","createProfile");
  const viewNewProfile = ` 
  <img src="./img/chevron_left_24px.png" alt="atrás" class="backBtn">
  <div class= "profileTitle"><h3>Crear Perfil</h3></div>
  <img src="" alt="" class="newProfileImage" id="profileImage"><br>

  <div class="custom-input-file">
  <input type="file" id="imgFile" class="input-file" value="">
  +
  </div>

  <div class="scroll-container">

  <div class="loginEmailInputContainer">
  <input type="text" id="name" class="loginEmailInput" required>
  <span class="loginEmailTextInput">Nombre</span>
  <label for=""class="loginEmailTextInput2">Campo obligatorio*</label><br><br></div>

  <div class="loginEmailInputContainer">
  <input type="text" id="lastname" class="loginEmailInput" required>
  <span class="loginEmailTextInput">Apellido</span>
  <label for=""class="loginEmailTextInput2">Campo obligatorio*</label><br><br></div>

  <div class="loginEmailInputContainer">
  <input type="text" id="city" class="loginEmailInput" required>
  <span class="loginEmailTextInput">Ciudad</span>
  <label for=""class="loginEmailTextInput2">Campo obligatorio*</label><br><br></div>

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
   <button id="newProfileBtn" class="profileButton">SIGUIENTE</button></div>
  
`

  divNewProfile.innerHTML = viewNewProfile;
  const firestore = firebase.firestore();
  const currentUserData = firebase.auth().currentUser;
  const uid = currentUserData.uid;
  const storage = firebase.storage();

  let showProfilePicture=()=>{ 
    var user = firebase.auth().currentUser;
    if(user.photoURL=== null){
      user.updateProfile({
        photoURL: "img/profile_image.svg"
      }).then(function() {
        divNewProfile.querySelector("#profileImage").src = user.photoURL;
      })    }
    else{ 
      divNewProfile.querySelector("#profileImage").src = user.photoURL}
}

window.onload = showProfilePicture();


  const newProfileBtn = divNewProfile.querySelector("#newProfileBtn");
  newProfileBtn.addEventListener("click", () => {
let userName = divNewProfile.querySelector("#name").value;
let lastName = divNewProfile.querySelector("#lastname").value;
let city = divNewProfile.querySelector("#city").value;
let occupation = divNewProfile.querySelector("#occupation").value;
let instagram = divNewProfile.querySelector("#instagram").value;
let facebook = divNewProfile.querySelector("#facebook").value;
let aboutMe = divNewProfile.querySelector("#aboutMe").value;
      if(userName !== ""||lastName !== ""|| city !== ""){
        currentUserData.updateProfile({
          displayName: userName + " " + lastName,
        }).then(function() {
        firestore.collection('users').doc(uid).set({name: userName,
          lastname: lastName,
          city: city,
          occupation: occupation,
          instagram: instagram,
          facebook: facebook,
          aboutMe: aboutMe,
          userID: uid,}).then(()=>{
        location.assign("#/showProfile")}
        )})}else{
      alert("por favor asegúrese de ingresar Nombre, Apellido y Ciudad antes de continuar"); }
    });
 
  let addFileBtn = divNewProfile.querySelector("#imgFile");
  addFileBtn.addEventListener("change", () => {
    let file = divNewProfile.querySelector("#imgFile").files[0];
      uploadImg(file)});

let uploadImg=(file)=> {
  let storageRef = firebase.storage().ref('usersProfileImgs/' + uid);
 storageRef.put(file).then(function(snapshot) {
  showImg();
})}


let showImg=()=>{ 
  var user = firebase.auth().currentUser;
    let newImgURL= storage.ref(`usersProfileImgs/${uid}`);
  newImgURL.getDownloadURL().then((url) => {
    user.updateProfile({
      photoURL: url
    }).then(function() {
      divNewProfile.querySelector("#profileImage").src = user.photoURL;
      // console.log("Update successful")
    }).catch(function(error) {
      // An error happened.
    });})}


return divNewProfile;
      }