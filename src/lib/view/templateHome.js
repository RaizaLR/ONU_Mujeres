import { channelList } from "./templateChannelList.js";
import { chatList } from "./templateChatList.js"

export const home = () => {
    const divHome = document.createElement("div"); 
    const viewHome=`
    
    <!-- Header fijo -->
    <div class="content-all" id="contentMenu">
    <header></header>
    <input type="checkbox" id="check">
    <label for="check" class="menuButton"><img src="img/LateralMenu.svg"></label>
    <div class="mainTitle">
    <h4 class="title">Tu oportunidad</h4>
    </div>

    <!-- menu desplegable -->
    <nav class="menu">

      <div class="menuFirstSection">
        <ul>
          <img src="" alt="miniatura foto de perfil" id="profileMiniPic" class="miniViewProfileImage">
          <div class="userInfoContainer">
          <li id="homeUserName"></li>
          <li id="homeUserMail"></li>
          </div>
        </ul>    
      </div>
      <div class="menuSecondSection">
        <ul>
          <div class="homeUserIconContainer">
          <img src="img/user.svg" class="homeUserIcon">
          <li id="showProfileBtn">Perfil</li>
          </div>
        </ul>
      </div>
      <div class="menuThirdSection">
        <ul>
        <div class="homeLogoutIconContainer">
          <img src="img/Vector.svg" class="homeLogoutIcon">
          <li id="logoutBtn">Cerrar Sesión</li>
          </div>
        </ul>
      </div>
    </nav>

      <div class="channelBtns">
        <div class="channelButton">
          <button id="channelBtn" href="#/home">COMUNIDADES</button>
        </div>
        <div class="chatButton">
          <button id="chatBtn" href="#/home">CHATS</button>
        </div>
      </div>

      <div class="searchbarContainer" id="searchBar">
        <input type="text" placeholder="Buscar..." class="searchInput">
      </div>

      <!-- contenido de canales y chat -->
    <div id="box">
    </div>
`;

divHome.innerHTML = viewHome;

let searchBar= divHome.querySelector("#searchBar");
function search(channel){
let text = searchBar.value;
channelList.filter(e => e.includes(text))}
searchBar.addEventListener("keyup", search);

const firestore = firebase.firestore();
let currentUserData = firebase.auth().currentUser;
const uid = currentUserData.uid;

firestore.collection('users').doc(uid).get().then(function(doc){
  if (doc.exists) {
      divHome.querySelector("#homeUserName").innerHTML = currentUserData.displayName;
      divHome.querySelector("#homeUserMail").innerHTML = currentUserData.email;  
      divHome.querySelector("#profileMiniPic").src = currentUserData.photoURL;
  } else {
      console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});


    const logoutButton = divHome.querySelector("#logoutBtn");
    logoutButton.addEventListener("click", () =>{
    firebase.auth().signOut().then(() => {
    console.log("se cerró la sesión")
    location.assign("#/login");
  })
})

let box = divHome.querySelector("#box");
box.appendChild(channelList());
const channelButton = divHome.querySelector("#channelBtn");
const chatButton = divHome.querySelector("#chatBtn")
channelButton.addEventListener("click", ()=> {
  box.innerHTML="";
  box.appendChild(channelList());
})

chatButton.addEventListener("click", ()=> {
  box.innerHTML="";
  box.appendChild(chatList());
})

let showProfileBtn = divHome.querySelector("#showProfileBtn");

showProfileBtn.addEventListener("click", ()=> {
location.assign("#/showProfile");
})


return divHome};