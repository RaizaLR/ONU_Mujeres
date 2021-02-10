import { channel } from "./templateChannel.js";
export const channelList = () =>{
    const divChannelList = document.createElement("div");
    const viewChannelList = `
    <div id="channelBox" class="channelBox">
    </div>
   <div  class="newChannelButton">
   <img src="./img/newComunityBtn.svg"alt="foto" id="newChannelButton">
   </div>
   
    `;
    // Aqui llamar a la data de firebase de canales disponibles y que se visualicen en este template
    divChannelList.innerHTML=viewChannelList;
    const channelList = divChannelList.querySelector("#channelBox");
    const firestore = firebase.firestore();
    
        firestore.collection("channels").orderBy("date","desc").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc){
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
                    const root = document.getElementById("root");
                    root.innerHTML = "";
                    root.appendChild(channel(channels.channelName));
                  }
            });
        });     
   const newChannel = divChannelList.querySelector("#newChannelButton");
   newChannel.addEventListener("click", () => {
       location.assign("#/newChannel")
   })
 return divChannelList;
}