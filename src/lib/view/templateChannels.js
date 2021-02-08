export const channel = () =>{
    const divChannel = document.createElement("div");
    const viewChannel = `
    
    <div id="channelBox" class="channelBox">
    </div>
   <div  class="newChannelButton">
   <img src="./img/newComunityBtn.svg"alt="foto" id="newChannelButton">
   </div>
   
    `
    // Aqui llamar a la data de firebase de canales disponibles y que se visualicen en este template
    divChannel.innerHTML=viewChannel;
    const channelList = divChannel.querySelector("#channelBox");
       
    const firestore = firebase.firestore();

        firestore.collection("channels").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                let channels = doc.data()
                    console.log((doc.id, " => ",channels.channelName));
                    printChannels(channels);
            });
        });
    
        function printChannels(channels){
            console.log(channelList);
             console.log("holi");
             let channelContainer = document.createElement("DIV");
            let channelTitle = document.createElement("H3");
            let channelDescription = document.createElement("P");
            let channelHour = document.createElement("P");
            channelContainer.setAttribute("id", "channelContainer");
            channelContainer.setAttribute("class", "channelContainer");
            channelTitle.setAttribute("id", "channelTitle");
            channelTitle.setAttribute("class", "channelTitle");
            channelDescription.setAttribute("id", "channelDescription");
            channelDescription.setAttribute("class", "channelDescription");
            channelHour.setAttribute("class","channelHour");
            channelHour.setAttribute("id", "channelHour");
            channelTitle.innerHTML = channels.channelName;
            channelDescription.innerHTML = channels.description;
            channelHour.innerHTML = channels.creationHour;
            channelList.appendChild(channelContainer)
            channelContainer.appendChild(channelTitle);
            channelContainer.appendChild(channelDescription);
            channelContainer.appendChild(channelHour);
}
  
//    <div id="channelBox" class="channelBox">
//     <h3 id="channelTitle" class="channelTitle"></h3>
//     <p id="channelDescription" class="channelDescription"></p>
//    </div>

   const newChannel = divChannel.querySelector("#newChannelButton");
   newChannel.addEventListener("click", () => {
       console.log("hola")
       location.assign("#/newChannel")
   })

return divChannel;
}