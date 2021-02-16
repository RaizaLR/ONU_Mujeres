export const chat = () =>{
    const divChat = document.createElement("div");
    const viewChat = `
   <main>
   <h3>Chats<h3>
   <div id="chatBox" class="chatBox">
   </div>
   <div  class="newChatButton">
   <img src="./img/newChatBtn.svg"alt="foto" id="newChatButton">
   </div>
   </main>
    `;
     // Aqui llamar a la data de firebase de chats disponibles y que se visualicen en este template
    divChat.innerHTML=viewChat;

    const newChat = divChat.querySelector("#newChatButton");
    newChat.addEventListener("click", () => {
        location.assign("#/users")
    })


return divChat;
}