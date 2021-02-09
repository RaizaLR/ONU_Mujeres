export const viewChannel = () =>{
 const divViewChannel = document.createElement("div");
 const viewChannel = `
 <header class="viewChannelHeader">
 <img src="./img/backwhite.svg" alt="atrás" class="backchannelBtn">
 <h3 id="nameChannelTitle" class="newChannelTitle">Aqui deberia ir el titulo</h3>
 <img src="./img/pointmenu.svg" alt="" class="channelMenu">
</header>
<main class="mainChannel">

</main>
 <footer class="footer">
 <input type="textarea" class="addpostBar" id="sendMessage" placeholder="Enviar Mensaje">
 <img src="img/Clip.svg" alt="adjuntar"><img src="img/sendArrow.svg" alt="enviar">
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
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            divViewChannel.querySelector("#nameChannelTitle").innerHTML = doc.data().channelName;
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    
    
    // firestore.collection('channels').doc().get().then(function(doc){
    //     if (doc.exists) {
    //         console.log(doc)
    //         // divViewChannel.querySelectorAll(".nameChannelTitle").innerHTML = (doc.data().channelName);
            
    //     } else {
    //         console.log("No such document!");
    //     }
    // }).catch(function(error) {
    //     console.log("Error getting document:", error);
    // });    
 
    // firestore.collection('users').doc(uid).get().then(function(doc){
    //     if (doc.exists) {
    //         // divViewChannel.querySelector("#activeUser").innerHTML = doc.data().name + " " + doc.data().lastname;
    //     } else {
    //         console.log("No such document!");
    //     }
    // }).catch(function(error) {
    //     console.log("Error getting document:", error);
    // });
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