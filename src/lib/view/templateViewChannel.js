export const viewChannel = () =>{
 const divViewChannel = document.createElement("div");
 const viewChannel = `
 <header class="viewChannelHeader">
 <img src="./img/backwhite.svg" alt="atrás" class="backchannelBtn">
 <h3 id="nameChannelTitle" class="newChannelTitle">Aqui deberia ir el titulo</h3>
 <img src="./img/pointmenu.svg" alt="" class="channelMenu">
</header>
<main class="mainChannel">
<h3 id="nameChannelTitle" class="nameChannelTitle">Aqui tambien</h3>
 <p class="generalDescriptionChannel">Creaste esta comunidad hoy. Este es el principio de la comunidad.</p>
<div class="addChannel">
 <img src="./img/AddDescription.svg" alt="">
 <img src="./img/AddPeople.svg" alt="">
 </div>
 <div class="activeProfile">
 <img src="" alt="fotito" id="imageActiveUser"><p id="activeUser">nombre</p>
 </div>
 </main>
 <footer>
 <input type="textarea" class="addpostBar">
 </footer>
 `

 divViewChannel.innerHTML=viewChannel;

    const firestore = firebase.firestore();
    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;
    
    firestore.collection('channels').doc("channelName"+uid).get().then(function(doc){
        if (doc.exists) {
            divViewChannel.querySelectorAll(".nameChannelTitle").innerHTML = (doc.data().channelName);
            
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });    
 
    firestore.collection('users').doc(uid).get().then(function(doc){
        if (doc.exists) {
            divViewChannel.querySelector("#activeUser").innerHTML = doc.data().name + " " + doc.data().lastname;
        } else {
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    return divViewChannel; 
}