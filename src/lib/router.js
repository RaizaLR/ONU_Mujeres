import { login } from "./view/templateLogin.js";
import { home } from "./view/templateHome.js";
import { newProfile } from "./view/templateCreateProfile.js";
import { profile } from "./view/templateShowProfile.js";
import { newChannel } from "./view/templateNewChannel.js";
import { viewChannel } from "./view/templateViewChannel.js";

export const changeRouter = (hash) => {
    if (hash === '#/register') {
        return showTemplate(hash);
    }
    else if (hash === '#/createProfile') {
        return showTemplate(hash);
    }
    else if (hash === '#/showProfile') {
        return showTemplate(hash);
    }
    else if (hash === '#/home') {
        return showTemplate(hash);
    }
    else if (hash === '#/newChannel') {
        return showTemplate(hash);
    }
    else if (hash === '#/viewChannel') {
        return showTemplate(hash);
    }
    else {
        return showTemplate(hash);
    }
}

export const showTemplate = (hash) => {
    const containerRoot = document.getElementById('root');
    containerRoot.innerHTML="";
     if (hash === '#/' || hash === '' || hash === '#'|| hash === '/') {
        containerRoot.appendChild(login());
    }
    else if (hash === '#/createProfile') {
        containerRoot.appendChild(newProfile());
    }
    else if (hash === '#/showProfile') {
        containerRoot.appendChild(profile());
    }
    else if (hash === '#/home') {
        containerRoot.appendChild(home());
    }
    else if (hash === '#/newChannel') {
        containerRoot.appendChild(newChannel());
    }
    else if (hash === '#/viewChannel') {
        containerRoot.appendChild(viewChannel());
    }
    else { 
        containerRoot.innerHTML = "la página no existe";
    }
}