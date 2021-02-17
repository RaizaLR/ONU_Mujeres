export const newChannel = () => {
  const divNewChannel = document.createElement("div");
  const viewNewChannel = `
    <header class="channelHeader">
    <img src="./img/backwhite.svg" alt="atrás" class="backchannelBtn" id="backchannelBtn">
    <h3 class="newChannelTitle">Nueva Comunidad</h3>
    <a id="newChannelBtn" class="newChannelBtn">Crear</a>
  </header>
  <main>
  <div class="newChannelMain">
    <label for="" class="newChannelLabel">Nombre</label>
    <input type="text" placeholder="#P. ej: Ubicación-tipo (#Santiago-biblioredes)" id="newChannelName" class="newChannelInput"><br><br>
    <label for="" class="newChannelLabel">Descripción(opcional)</label>
    <input type="textarea" placeholder="¿De qué se trata este canal?" id="descriptionChannel" class="newChannelInput"><br><br>
    </div>
    <div class="newChannelCheckBox">
    <label for="" class="newChannelLabel">Compartir esta comunidad </label>
    <input type="checkbox" id="checkBox">
    </div>
  </main>
    `;
  divNewChannel.innerHTML = viewNewChannel;

  const backchannelBtn = divNewChannel.querySelector("#backchannelBtn");
  backchannelBtn.addEventListener("click", () => {
    location.assign("#/home");
  })

  const newChannelBtn = divNewChannel.querySelector("#newChannelBtn");
  newChannelBtn.addEventListener("click", () => {
    let channelName = divNewChannel.querySelector("#newChannelName").value;
    let descriptionChannel = divNewChannel.querySelector("#descriptionChannel")
      .value;
    let checkbox = divNewChannel.querySelector("#checkBox").value;

    const firestore = firebase.firestore();
    const currentUserData = firebase.auth().currentUser;
    const uid = currentUserData.uid;
    let d = new Date();
    let n = d.getHours() + ":" + d.getMinutes();
    let p = Date.now();
    firestore
      .collection("channels")
      .doc(channelName)
      .set({
        channelName: channelName,
        description: descriptionChannel,
        public: checkbox,
        userID: uid,
        creationHour: n,
        date: p,
      })
      .then(() => {
      
                  location.assign("#/viewChannel");
      });
  });

  return divNewChannel;
};
