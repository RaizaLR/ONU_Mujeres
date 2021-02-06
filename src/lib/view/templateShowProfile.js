export const profile = () => {
    const divProfile = document.createElement("div"); 
    divProfile.setAttribute("CLASS","viewprofile");
    const viewProfile =` 
    <h4 id="">Mi perfil</h4>
    <img src="" alt="">
    <h1 id="profileName"></h1>
    <p>
        Ciudad<br>
        <span id="profileCity"></span><br><br>

        Ocupación<br>
        <span id="profileOccupation"></span><br><br>

        Instagram<br>
        <span id="profileInstagram"></span><br><br>

        Facebook<br>
        <span id="profileFacebook"></span><br><br>

        Sobre mi<br>
        <span id="profileAboutMe"></span><br>
    </p>

    <button><a href="#/test">LISTO</a></button>
`

divProfile.innerHTML = viewProfile;

const firestore = firebase.firestore();
const currentUserData = firebase.auth().currentUser;
const uid = currentUserData.uid;

firestore.collection('users').doc(uid).get().then(function(doc){
    if (doc.exists) {
        divProfile.querySelector("#profileName").innerHTML = doc.data().name + " " + doc.data().lastname;
        divProfile.querySelector("#profileCity").innerHTML = doc.data().city;
        divProfile.querySelector("#profileInstagram").innerHTML = doc.data().instagram;
        divProfile.querySelector("#profileFacebook").innerHTML = doc.data().facebook;
        divProfile.querySelector("#profileAboutMe").innerHTML = doc.data().aboutMe;
        divProfile.querySelector("#profileOccupation").innerHTML = doc.data().occupation;
    } else {
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


return divProfile}




