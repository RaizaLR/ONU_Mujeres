import { channel } from "./templateChannel.js"
import { channelList } from "./templateChannelList.js";
import { chat } from "./templateChats.js"

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
             <li>Nombre usuario</li>
             <li>Mail usuario</li>
           </ul>    
         </div>
         <div class="menuSecondSection">
           <ul>
             <li id="showProfileBtn">Ver Perfil</li>
             <li>Indica que estas ausente</li>
             <li>Idioma</li>
             <li>Notificaciones</li>
           </ul>
         </div>
         <div class="menuThirdSection">
           <ul>
             <li>Ajustes</li>
             <li>Cerrar</li>
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
// let menu = divHome.querySelector("#contentMenu");

let box = divHome.querySelector("#box");
box.appendChild(channelList());
// box.appendChild(channel());
const channelButton = divHome.querySelector("#channelBtn");
const chatButton = divHome.querySelector("#chatBtn")
channelButton.addEventListener("click", ()=> {
  box.innerHTML="";
  box.appendChild(channelList());
})

chatButton.addEventListener("click", ()=> {
  box.innerHTML="";
  box.appendChild(chat());
})

let showProfileBtn = divHome.querySelector("#showProfileBtn");

showProfileBtn.addEventListener("click", ()=> {
location.assign("#/showProfile");
})


return divHome};