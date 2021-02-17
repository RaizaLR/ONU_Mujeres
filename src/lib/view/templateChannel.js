import{ home } from "./templateHome.js";
export const channel = (channelName) =>{
  const divChannel = document.createElement("div");
  const viewChannel = `
  <header class="viewChannelHeader">
  <img src="./img/backwhite.svg" alt="atrás" id="backChannelBtn" class="backchannelBtn">
  <h3 id="nameChannelTitle" class="newChannelTitle"></h3>
  <img src="./img/pointmenu.svg" alt="" class="channelMenu">
  </header>
 
  <main class="mainChannelContent" id="channelContent">
  </main>
 
  <footer class="footer">
  <input type="textarea" class="addpostBar" id="channelMessage" placeholder="Enviar Mensaje">
  <img src="img/Clip.svg" alt="adjuntar"><img src="img/sendArrow.svg" alt="enviar" id="send">
  </footer>
  `;
 
  divChannel.innerHTML=viewChannel;
 
     const firestore = firebase.firestore();
     const currentUserData = firebase.auth().currentUser;
     const uid = currentUserData.uid;
     const root = document.getElementById("root");
     const message = divChannel.querySelector("#channelMessage");
     const channelContent = divChannel.querySelector("#channelContent");


    divChannel.querySelector("#nameChannelTitle").innerHTML = channelName;
     
    firestore.collection("channels").doc(channelName).collection("messages").orderBy("date")
    .onSnapshot(function(querySnapshot) {
        channelContent.innerHTML = "";
        querySnapshot.forEach(function(doc) {
            channelContent.innerHTML += `<div class="mainChannelBox">
                              <img src="${doc.data().profilePictureURL}" alt="profilePic" class="chatProfilePic">
                              <div class="input-content">
                              <div class="input-nameHour"><span class="input-message-username" id="inputMessage">${doc.data().profileName}</span>
                              </div>
                              <div class="input-time">
                              <span id="inputTime">${doc.data().time}</span>
                              </div>
                             <div class="message-box" id="messageBox">
                             <span class="input-message" id="inputMessageText">${doc.data().message}</span>
                             </div>
                             </div>
                           </div>`    ;
            channelContent.scrollTop = channelContent.scrollHeight;
        });
            
     const sendMessage = divChannel.querySelector("#send");
     sendMessage.addEventListener("click", ()=>{
         if(message.value !== ""){
            let d = new Date();
            let n = d.getHours() + ":" + d.getMinutes();
            
         firestore.collection("channels").doc(channelName).collection("messages").add({
                    profileName: currentUserData.displayName,
                     message: message.value,
                     time: n,
                     userID: uid,
                     date: Date.now(),
                     profilePictureURL: currentUserData.photoURL,
                 })
                 message.value="";
        } });
 
     });
     
     let backButton = divChannel.querySelector("#backChannelBtn");
     backButton.addEventListener("click", ()=> {
        root.innerHTML = "";
        root.appendChild(home());
     });
 
     return divChannel; 
 }