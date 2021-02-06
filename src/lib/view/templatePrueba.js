export const test = () => {
    const divTest = document.createElement("div"); 
    const viewTest=`

  <h3>Test</h3>
  <div class="contenedor-imagen">
  <img src="./img/profile_image.png" alt="foto" id="testImage" class="foto-usuario">
  </div>
  <input type="file" name="subir imagen" id="storage">
`;

divTest.innerHTML=viewTest;

//    const pruebaImagen = divTest.querySelector("#storage").files[0];
//     const storageRef = firebase.storage().ref("fotos" + pruebaImagen.name);
//     const task = storageRef.put(pruebaImagen);
//     console.log("subio archivo");
// let archivo = ($('#my'))






return divTest};