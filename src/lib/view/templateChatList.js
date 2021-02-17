import { viewChat } from "./templateViewChat.js";
export const chatList = () =>{
    const divChatList = document.createElement("div");
    const viewChatList = `
   <main>
   <div id="chatBox" class="channelBox">
   </div>
   <div  class="newChatButton">
   <img src="./img/newChatBtn.svg"alt="foto" id="newChatButton">
   </div>
   </main>
    `;
     // Aqui llamamos a la data de firebase de chats disponibles para que se visualicen en este template
    divChatList.innerHTML=viewChatList;
    
    const chatList = divChatList.querySelector("#chatBox");
    const firestore = firebase.firestore();
    let user = firebase.auth().currentUser;
    let uid = user.uid;
    
    let chatRef = firestore.collection("chats").where("participants", "array-contains", uid);
    chatRef.orderBy("date","desc").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc){
                let chats = doc.data();
                let chatContainer = document.createElement("DIV");
                let chatTitle = document.createElement("H3");
                chatTitle.setAttribute("class", "chatTitleContainer")
                let userProfilePhoto = document.createElement("DIV")
                chatContainer.setAttribute("id", "chatContainer");
                chatContainer.setAttribute("class", "chatContainer");
                chatList.appendChild(chatContainer);
                chatContainer.appendChild(userProfilePhoto);
                chatContainer.appendChild(chatTitle);
                chatContainer.onclick = function () {
                    const root = document.getElementById("root");
                    root.innerHTML = "";
                    let participantsName = chats.participantsName;
                    let participantsID = chats.participantsID;
                    root.appendChild(viewChat(participantsName, participantsID));
                  }

                firestore.collection("chats").doc(uid+chats.participantsID).collection("chats").orderBy("date").limitToLast(1).get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc){
                    userProfilePhoto.innerHTML += `<img src=${chats.participantsPhotoURL} alt="profilePic" class="chatProfilePic">`;
                    // lastMessage.innerHTML = doc.data().message;
                    chatTitle.innerHTML += `
                    <div class="chatTitle"><h3 id="chatTitle">${chats.participantsName}</h3><span class="time">${doc.data().time}</span>
                    </div>
                    <p class="lastMessageChats">${doc.data().message}</p>   
                    
                    `;
                    
                })})
            })
                
                  
                 
                //   channels.messages.orderBy("date").limitToLast(1).get().then(function(querySnapshot) {
                //     querySnapshot.forEach(function(doc){console.log(doc.data())})})
            });
             
    const newChatList = divChatList.querySelector("#newChatButton");
    newChatList.addEventListener("click", () => {
        location.assign("#/users")
    })


return divChatList;
}