// Este es el punto de entrada de la aplicación

import { changeRouter } from './lib/router.js';

window.addEventListener('load', () => {
    changeRouter(window.location.hash);
});

window.addEventListener('hashchange', () => {
    changeRouter(window.location.hash);
});
