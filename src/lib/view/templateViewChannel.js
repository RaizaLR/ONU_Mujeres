export const viewChannel = () =>{
 const divViewChannel = document.createElement("div");
 const viewChannel = `
 <header class="viewChannelHeader">
 <img src="./img/backwhite.svg" alt="atrás" class="backchannelBtn">
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
            // console.log(doc.id, " => ", doc.data());
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
        firestore.collection("channels").doc(channelNameRef).collection("messages").add({
                    message:message,
                    userID: uid,
                    date: Date.now()
                }).then(() => {
                    // console.log("documento creado")
                    firestore.collection("channels").doc(channelNameRef).collection("messages").orderBy("date")
    .onSnapshot(function(querySnapshot) {
        let channelContent = divViewChannel.querySelector("#viewChannelContent");
        channelContent.innerHTML = "";
        querySnapshot.forEach(function(doc) {
            let channelContent = divViewChannel.querySelector("#viewChannelContent");
            channelContent.innerHTML += `<div class="message-box" id="messageBox">
                             <span class="inputMessage" class="inputMessage">${doc.data().message}</span>
                           </div>`    ;
            channelContent.scrollTop = channelContent.scrollHeight;
        });
    });
 })

        divViewChannel.querySelector("#message").value = ""; 


        

    });
    

    return divViewChannel; 
}
// {/* <h3 id="nameChannelTitle" class="nameChannelTitle">Aqui tambien</h3>
//  <p class="generalDescriptionChannel">Creaste esta comunidad hoy. Este es el principio de la comunidad.</p>
// <div class="addChannel">
//  <img src="./img/AddDescription.svg" alt="">
//  <img src="./img/AddPeople.svg" alt="">
//  </div>
//  <div class="activeProfile">
//  <img src="" alt="fotito" id="imageActiveUser"><p id="activeUser">nombre</p>
//  </div> */}