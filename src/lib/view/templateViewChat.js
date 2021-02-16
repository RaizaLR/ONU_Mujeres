import{ home } from "./templateHome.js";
export const viewChat = (participantsName, participantsID) => {
    const divViewChat = document.createElement("div");
    const viewChat = `
    <header class="viewChannelHeader">
    <img src="./img/backwhite.svg" alt="atrás" class="backchannelBtn" id="backChannelBtn">
    <h3 id="nameViewChatTitle" class="newChannelTitle"></h3>
    <img src="./img/pointmenu.svg" alt="" class="channelMenu">
    </header>
   
   <main class="mainChannelContent" id="viewChatContent">
   </main>
   
    <footer class="footer">
    <input type="textarea" class="addpostBar" id="messageToChat" placeholder="Enviar Mensaje">
    <img src="img/Clip.svg" alt="adjuntar"><img src="img/sendArrow.svg" alt="enviar" id="sendToChat">
    </footer>
    `;

    divViewChat.innerHTML = viewChat;

    const firestore = firebase.firestore();
    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;
    const viewChatContent = divViewChat.querySelector("#viewChatContent");
    let message = divViewChat.querySelector("#messageToChat");


      divViewChat.querySelector("#nameViewChatTitle").innerHTML = participantsName;

    firestore.collection("chats").doc(uid+participantsID).collection("chats").orderBy("date")
    .onSnapshot(function(querySnapshot) {
        viewChatContent.innerHTML = "";
        querySnapshot.forEach(function(doc) {
            viewChatContent.innerHTML += `<div class="message-box" id="messageChatBox">
            <span class="inputMessage" id="inputChatMessage">${doc.data().message}</span>
          </div>`    ;
            viewChatContent.scrollTop = viewChatContent.scrollHeight;
        });
            
     const sendMessage = divViewChat.querySelector("#sendToChat");
     sendMessage.addEventListener("click", ()=>{
         if(message.value !== ""){
            let d = new Date();
            let n = d.getHours() + ":" + d.getMinutes();
            
         firestore.collection("chats").doc(uid+participantsID).collection("chats").add({
            message: currentUserData.displayName + ": " + message.value,
            userID: uid,
            date: Date.now(),
            time: n,
                 })
                 message.value="";
        } });
 
     });

     let backButton = divViewChat.querySelector("#backChannelBtn");
     backButton.addEventListener("click", ()=> {
        root.innerHTML = "";
        root.appendChild(home());
     });


    return divViewChat;
}