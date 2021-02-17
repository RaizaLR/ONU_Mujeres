import{ home } from "./templateHome.js";
export const viewChannel = () =>{
 const divViewChannel = document.createElement("div");
 const viewChannel = `
 <header class="viewChannelHeader">
 <img src="./img/backwhite.svg" alt="atrás" class="backchannelBtn" id="backHomeBtn">
 <h3 id="nameViewChannelTitle" class="newChannelTitle"></h3>
 <img src="./img/pointmenu.svg" alt="" class="channelMenu">
</header>

<main class="mainChannelContent" id="viewChannelContent">
</main>

 <footer class="footer">
 <input type="textarea" class="addpostBar" id="message" placeholder="Enviar Mensaje">
 <img src="img/Clip.svg" alt="adjuntar"><img src="img/sendArrow.svg" alt="enviar" id="send">
 </footer>
 `

 divViewChannel.innerHTML=viewChannel;

    const firestore = firebase.firestore();
    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;

    let channelsRef = firestore.collection("channels");
    channelsRef.where("userID", "==", uid)
    .orderBy("date","desc")
    .limit(1)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            divViewChannel.querySelector("#nameViewChannelTitle").innerHTML = doc.data().channelName;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    

    const sendMessage = divViewChannel.querySelector("#send");
    sendMessage.addEventListener("click", ()=>{
        let message = divViewChannel.querySelector("#message").value
        let channelNameRef = divViewChannel.querySelector("#nameViewChannelTitle").innerHTML;
        let d = new Date();
        let n = d.getHours() + ":" + d.getMinutes();
        firestore.collection("channels").doc(channelNameRef).collection("messages").add({
            profileName: currentUserData.displayName,
            message: message,
            time: n,
            userID: uid,
            date: Date.now(),
            profilePictureURL: currentUserData.photoURL,
                }).then(() => {
                    firestore.collection("channels").doc(channelNameRef).collection("messages").orderBy("date")
    .onSnapshot(function(querySnapshot) {
        let channelContent = divViewChannel.querySelector("#viewChannelContent");
        channelContent.innerHTML = "";
        querySnapshot.forEach(function(doc) {
            let channelContent = divViewChannel.querySelector("#viewChannelContent");
            channelContent.innerHTML += `<div class="message-box" id="messageBox">
                             <span class="input-message" id="inputMessage">${doc.data().message}</span>
                           </div>`;
            channelContent.scrollTop = channelContent.scrollHeight;
        });
    });
 })

        divViewChannel.querySelector("#message").value = ""; 
    });
    
    let backHomeButton = divViewChannel.querySelector("#backHomeBtn");
     backHomeButton.addEventListener("click", ()=> {
        root.innerHTML = "";
        root.appendChild(home());
        location.assign("#/home")
     });

    return divViewChannel; 
}