import { channel } from "./templateChannel.js";
export const channelList = () =>{
    const divChannelList = document.createElement("div");
    const viewChannelList = `
    <div id="channelBox" class="channelBox">
    </div>
   <div  class="newChannelButton">
   <img src="./img/newChatBtn.svg"alt="foto" id="newChannelButton">
   </div>
   
    `;
    // Aqui llamar a la data de firebase de canales disponibles y que se visualicen en este template
    divChannelList.innerHTML=viewChannelList;
    const channelList = divChannelList.querySelector("#channelBox");
    const firestore = firebase.firestore();
    let user = firebase.auth().currentUser;

    
        firestore.collection("channels").orderBy("date","desc").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc){
                let channels = doc.data();
                let channelContainer = document.createElement("DIV");
                let channelTitle = document.createElement("H3");
                let lastMessage = document.createElement("P");
                const messageRef = firestore.collection("channels").doc(channels.channelName)
                .collection("messages");
                channelContainer.setAttribute("id", "channelContainer");
                channelContainer.setAttribute("class", "channelContainer");
                lastMessage.setAttribute("id", "lastMessage");
                lastMessage.setAttribute("class", "lastMessage");
                channelList.appendChild(channelContainer)
                channelContainer.appendChild(channelTitle);
                channelContainer.appendChild(lastMessage);
                messageRef.orderBy("date").limitToLast(1).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc){
                    lastMessage.innerHTML = doc.data().message;
                    channelTitle.innerHTML += `<div class="channelTitle"><h3 id="channelTitle">${channels.channelName}</h3><span class="time">${doc.data().time}</span></div>`;
                })})
                channelContainer.onclick = function () {
                    const root = document.getElementById("root");
                    root.innerHTML = "";
                    root.appendChild(channel(channels.channelName));
                  }
                  
                 
                //   channels.messages.orderBy("date").limitToLast(1).get().then(function(querySnapshot) {
                //     querySnapshot.forEach(function(doc){console.log(doc.data())})})
            });
        });     
   const newChannel = divChannelList.querySelector("#newChannelButton");
   newChannel.addEventListener("click", () => {
       location.assign("#/newChannel")
   })
 return divChannelList;
}