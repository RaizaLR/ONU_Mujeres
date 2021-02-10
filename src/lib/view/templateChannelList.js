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
            querySnapshot.forEach(function(doc){
                  let channels = doc.data()
                    // printChannelList(channels);
                    channelList.innerHTML += `<div id="channelContainer" class="channelContainer">
                    <h3 id="channelTitle" class="channelTitle">${channels.channelName}</h3>
                    <p id="channelDescription" class="channelDescription">${channels.description}</p>
                    </div>`
                    
                    // let channelClick = divChannel.querySelector("#channelTitle");
                    // channelClick.onclick =function printChannels(channels){
                    //  console.log("funciona la shit")
                    //   }
                    
            });
        });     
        //  function printChannels(channels){
        //         console.log("funciona la shit")
        //  }
        
        // function printChannelList(channels){
        //     channelList.innerHTML += `<div id="channelContainer" class="channelContainer">
        //     <h3 id="channelTitle" class="channelTitle">${channels.channelName}</h3>
        //     <p id="channelDescription" class="channelDescription">${channels.description}</p>
        //     </div>`
        // };
//    <div id="channelBox" class="channelBox">
//     <h3 id="channelTitle" class="channelTitle"></h3>
//     <p id="channelDescription" class="channelDescription"></p>
//    </div>

   const newChannel = divChannel.querySelector("#newChannelButton");
   newChannel.addEventListener("click", () => {
       location.assign("#/newChannel")
   })


 return divChannel;
}