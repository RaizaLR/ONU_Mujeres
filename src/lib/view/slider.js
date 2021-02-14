export const slider = () =>{
    const divSlider = document.createElement("div");
    const viewSlider =`
    <div class="sliderContainer"><img src="./img/logoTuOportunidad.png" alt="" class= "sliderTitle"></div>
    <div class="slider">
    <div class="slides">
      <input type="radio" name="radio-btn" id="radio1">
      <input type="radio" name="radio-btn" id="radio2">
      <input type="radio" name="radio-btn" id="radio3">
      <input type="radio" name="radio-btn" id="radio4">
    <div class="slide first">
      <img src="img/ImageSliderOne.svg" alt="">
      <h3 class="sliderOneText">Bienvenida a la app del programa “Tu Oportunidad”</h3><br><br>
      <a class="sliderOneJump" href="#/login">SALTAR</a><br><br>
      </div>
    <div class="slide">
      <img src="img/ImageSliderTwo.svg" alt="">
      <h3 class="sliderTwoText">Podrás comunicarte y compartir experiencias con tus compañeras y tutoras</h3><br><br>
    </div>
    <div class="slide">
      <img src="img/ImageSliderThree.svg" alt="">
      <h3 class="sliderTwoText">Podrás enviar y recibir mensajes, fotos, videos y archivos</h3><br><br>
    </div>
    <div class="slide">
      <img src="img/ImageSliderFour.svg" alt="">
      <button class="forLoginBtn" id="forLogin">COMENZAR</button>
    </div>
    <!-- Navegacion automatica -->
    <div class="navigationAuto">
      <div class="autoBtn1"></div>
      <div class="autoBtn2"></div>
      <div class="autoBtn3"></div>
      <div class="autoBtn4"></div>
    </div>
    <!-- Mavegacion Manual -->
    <div class="navigationManual">
      <label for="radio1" class="manualBtn"></label>
      <label for="radio2" class="manualBtn"></label>
      <label for="radio3" class="manualBtn"></label>
      <label for="radio4" class="manualBtn"></label>
    </div>
  </div>
  </div>
    `
    divSlider.innerHTML = viewSlider;

    let counter = 1;
    setInterval(() => { 
        divSlider.querySelector("#radio"+counter).checked = true;
        counter++;
        if(counter > 4){
            counter = 1;
        }},5000)

    const buttonForLogin = divSlider.querySelector("#forLogin");
    buttonForLogin.addEventListener("click",() => {
        location.assign("#/login");
    })


    return divSlider;
}