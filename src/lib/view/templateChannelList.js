import{ home } from "./templateHome.js";
import { channel } from "./templateChannel.js"
export const channelList = () =>{
    const divChannel = document.createElement("div");
    const viewChannel = `
    <div id="channelBox" class="channelBox">
    </div>
   <div  class="newChannelButton">
   <img src="./img/newComunityBtn.svg"alt="foto" id="newChannelButton">
   </div>
   
    `;
    // Aqui llamar a la data de firebase de canales disponibles y que se visualicen en este template
    divChannel.innerHTML=viewChannel;
    const channelList = divChannel.querySelector("#channelBox");
       
    const firestore = firebase.firestore();
    

        firestore.collection("channels").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc,i){
                let channels = doc.data()
                let channelContainer = document.createElement("DIV");
                let channelTitle = document.createElement("H3");
                let channelDescription = document.createElement("P");
                channelContainer.setAttribute("id", "channelContainer");
                channelContainer.setAttribute("class", "channelContainer");
                channelTitle.setAttribute("id", "channelTitle");
                channelTitle.setAttribute("class", "channelTitle");
                channelDescription.setAttribute("id", "channelDescription");
                channelDescription.setAttribute("class", "channelDescription");
                channelTitle.innerHTML = channels.channelName;
                channelDescription.innerHTML = channels.description;
                channelList.appendChild(channelContainer)
                channelContainer.appendChild(channelTitle);
                channelContainer.appendChild(channelDescription);
                channelContainer.onclick = function () {
                    console.log(channels.channelName);
                  }
            });
        });     

        
        // function printChannelList(channels){
        //     channelList.innerHTML += `<div id="channelContainer" class="channelContainer">
        //     <h3 id="channelTitle" class="channelTitle">${channels.channelName}</h3>
        //     <p id="channelDescription" class="channelDescription">${channels.description}</p>
        //     </div>`
        // };


   const newChannel = divChannel.querySelector("#newChannelButton");
   newChannel.addEventListener("click", () => {
       location.assign("#/newChannel")
   })


 return divChannel;
}