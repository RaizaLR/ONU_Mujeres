export const chat = () =>{
    const divChat = document.createElement("div");
    const viewChat = `
   <main>
   <h3>Chats<h3>
   </main>
    `
     // Aqui llamar a la data de firebase de chats disponibles y que se visualicen en este template
    divChat.innerHTML=viewChat;

return divChat;
}