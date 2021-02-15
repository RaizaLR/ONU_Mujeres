export const profile = () => {
    const divProfile = document.createElement("div"); 
    divProfile.setAttribute("CLASS","viewprofile");
    const viewProfile =` 
    <img src="./img/chevron_left_24px.png" alt="atrás" class="backBtn">
    <h4 class="profileTitle">Mi perfil</h4>
    <img src="" alt="imagen de perfil" id="profilePic" class="viewProfileImage">
    <div class="profileContentDiv">
    <h1 id="profileName" class="viewProfileName"></h1>
    <p class="profileContent">
        <span id="profileOccupation"></span><br>
        <span id="profileCity"></span><br><br>

        Instagram<br>
        <span id="profileInstagram"></span><br><br>

        Facebook<br>
        <span id="profileFacebook"></span><br><br>

        Sobre mi<br>
        <span id="profileAboutMe"></span>
    </p>
    </div>
    <div class="btnsContainer">
    <button class="profileButton"><a href="#/createProfile" class="link">EDITAR</a></button>  <button class="profileButton"><a href="#/home" class="link">GUARDAR</a></button>
    </div>
    `

divProfile.innerHTML = viewProfile;

const firestore = firebase.firestore();
let currentUserData = firebase.auth().currentUser;
const uid = currentUserData.uid;


firestore.collection('users').doc(uid).get().then(function(doc){
    if (doc.exists) {
        divProfile.querySelector("#profileName").innerHTML = doc.data().name + " " + doc.data().lastname;
        divProfile.querySelector("#profileCity").innerHTML = doc.data().city;
        divProfile.querySelector("#profileInstagram").innerHTML = doc.data().instagram;
        divProfile.querySelector("#profileFacebook").innerHTML = doc.data().facebook;
        divProfile.querySelector("#profileAboutMe").innerHTML = doc.data().aboutMe;
        divProfile.querySelector("#profileOccupation").innerHTML = doc.data().occupation;
        divProfile.querySelector("#profilePic").src = currentUserData.photoURL;
        console.log(currentUserData)
    } else {
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


return divProfile}




