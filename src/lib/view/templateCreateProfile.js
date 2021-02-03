export const newProfile = () => {
    const divNewProfile = document.createElement("div"); 
    const viewNewProfile=` 
  
  <h3>Crear Perfil</h3>
  <input type="img">
  <label for="">Nombre y apellido</label><br>
  <input type="text" id="name" class="nameInput"><br>
  <label for="">Edad</label><br>
  <input type="text" id="age" class="ageInput"><br>
  <label for="">Ciudad</label><br>
  <input type="text" id="city" class="cityInput"><br>
  <label for="">Instagram</label><br>
  <input type="text" id="instagram" class="instagramInput"><br>
  <label for="">Facebook</label><br>
  <input type="text" id="facebook" class="facebookInput"><br>
  <label for="">Sobre Mi</label><br>
  <input type="textarea" id="aboutMe" class="aboutMeInput"><br>

  <a id="newProfileBtn" href="#/viewProfile">Siguiente</a><br>
  
`;

divNewProfile.innerHTML=viewNewProfile;

return divNewProfile;
}