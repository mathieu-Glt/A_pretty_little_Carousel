function getRandomInteger(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


function installEventHandler(selector, type, eventHandler)
{
    // Récupération du premier objet DOM correspondant au sélecteur.
    const domObject = document.querySelector(selector)
    // Installation d'un gestionnaire d'évènement sur cet objet DOM.
    domObject.addEventListener(type, eventHandler)
}

//installEventHandler("#monBoutton", "click", maFonctionCallBack)