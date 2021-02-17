import { viewChat } from "./templateViewChat.js";
import { home } from "./templateHome.js";
import { chatList } from "./templateChatList.js"
export const users = () => {
    const divUsers = document.createElement("div");
    const viewUsers = `
    <!-- Header fijo -->
    <header class="viewChannelHeader">
    <img src="./img/backwhite.svg" alt="atrás" id="backToHomeBtn" class="backchannelBtn">
    <h3 class="newChatTitle">Nuevo Chat</h3>
    <img src="./img/pointmenu.svg" alt="" class="channelMenu">
    </header>
    <div class="searchChatContainer" id="searchBar">
    <input type="text" placeholder="Buscar..." class="searchChatInput">
      </div>
      
    
    <div class="user-info-container" id="usersBox">
    </div>
    `;

    divUsers.innerHTML = viewUsers;

    const firestore = firebase.firestore();
    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;
    let chatBox = divUsers.querySelector("#usersBox")
    firestore.collection("users").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            let usersData = doc.data()
            let userContent = document.createElement("DIV");
            let userImage = document.createElement("IMG");
            let userName = document.createElement("H4");
            userContent.setAttribute("class", "userContent");
            userImage.setAttribute("class", "chatUserImage");
            userImage.setAttribute("id", "usersImage");
            userName.setAttribute("class", "user-info");
            userName.setAttribute("id", "usersInfo");
            userContent.appendChild(userImage);
            userContent.appendChild(userName)
            chatBox.appendChild(userContent);
            userImage.src = usersData.photoURL;
            userName.innerHTML = usersData.name + " " + usersData.lastname;
            let participantsName = usersData.name + " " + usersData.lastname;
            let participantsID = usersData.userID;
            userContent.onclick = function () {
                let p = Date.now();
                firestore
                    .collection("chats")
                    .doc(uid + usersData.userID)
                    .set({
                        author: uid,
                        participants: [uid, usersData.userID],
                        participantsName: usersData.name + " " + usersData.lastname,
                        participantsPhotoURL: usersData.photoURL,
                        participantsID: usersData.userID,
                        date: p,
                    })
                    .then(() => {
                        let root = document.getElementById("root");
                        root.innerHTML = "";
                        root.appendChild(viewChat(participantsName, participantsID));
                    });
            };
        })

    })
    
    let backToHomeButton = divUsers.querySelector("#backToHomeBtn");
    backToHomeButton.addEventListener("click", () => {
        root.innerHTML = "";
        root.appendChild(home());
        location.assign("#/home");
    })
        
    


    return divUsers;
}