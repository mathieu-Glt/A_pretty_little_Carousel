'use strict';   // Mode strict du JavaScript

/*************************************************************************************************/
/* ****************************************** DONNEES ****************************************** */
/*************************************************************************************************/
// Codes des touches du clavier.
const SPACE_KEY= 'Space';
const LEFT_ARROW_KEY = 'ArrowLeft';
const RIGHT_ARROW_KEY = 'ArrowRight';

// La liste des slides du carrousel. Un tableau d'objets chaque objet aura deux propriété une qui sera l'image (url) et l'autre la description
const slides =
[
    { image: 'images/1.jpg', legend: 'Mountain landscape'},
    { image: 'images/2.jpg', legend: 'Roma city'         },
    { image: 'images/3.jpg', legend: 'Colorful Building'   },
    { image: 'images/4.jpg', legend: 'Skyscrapers'         },
    { image: 'images/5.jpg', legend: 'Rome at night'       },
    { image: 'images/6.jpg', legend: 'Eiffel Tower at night' },
    { image: 'images/7.jpg', legend: 'Underwater ecosystem' },
    { image: 'images/8.jpg', legend: 'Desert' },
    { image: 'images/9.jpg', legend: 'Sunset view' },
    { image: 'images/10.jpg', legend: 'The coast of Calvi' },
    { image: 'images/11.jpg', legend: 'Cathedral di Santa Maria del Fuore' }
];

// Objet contenant l'état du carrousel.
let state;

/*************************************************************************************************/
/* ***************************************** FONCTIONS ***************************************** */
/*************************************************************************************************/

//fonction pour passer à la slide suivante
function onSliderGoToNext()
{

    // Passage à la slide suivante
    state.index++
    // Est-ce qu'on est arrivé à la fin de la liste des slides ?
    if(state.index === slides.length){
       // Oui, on revient au début (le carrousel est circulaire).
       state.index = 0
    }
    // Mise à jour de l'affichage.(appel fonction)
    refreshSlider()
}

//fonction pour passer à la slide précédente
function onSliderGoToPrevious()
{

    // Passage à la slide précédente.
    state.index--
    // Est-ce qu'on est revenu au début de la liste des slides ?
    if(state.index < 0){
       // Oui, on revient à la fin (le carrousel est circulaire).
       state.index = slides.length - 1 
    }
    // Mise à jour de l'affichage.(appel fonction)
    refreshSlider()

}
// fonction pour afficher une slide aléatoirement   
function onSliderGoToRandom()
{
    let index
     /*
         * Récupération d'un numéro de slide aléatoire différent
         * du numéro de slide actuel.
         DO WHILE
     */
    do {
        index = getRandomInteger(0, slides.length - 1)
    } while (index === state.index);
    // Passage à une slide aléatoire.
    state.index = index

    // Mise à jour de l'affichage.(appel de fonction)
    refreshSlider()
}
/*
 * Quand on créé un gestionnaire d'évènements, le navigateur appelle la
 * fonction en fournissant un argument event représentant l'évènement lui-même.
 *
 * Si le gestionnaire d'évènements n'a pas besoin de cet argument,
 * inutile de le déclarer !
 *
 * Mais ici on va en avoir besoin...
 */
function onSliderKeyup(event)
{
    console.log("🚀 ~ event:", event)
    console.log("🚀 ~ event:", event.code)
    /*
     * Les gestionnaires d'évènements d'appui sur une touche (évènements
     * keydown, keyup, keypress) contiennent une propriété keyCode dans l'objet
     * event représentant le code de la touche du clavier.
     *
     * Il existe de très nombreux codes, plus ou moins standards, voir la page :
     * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
     */
    //condition sela la touche qu'il a appuyé
    
    //on appelera la fonction qui correspond à la touche
    switch (event.code) {
        case RIGHT_ARROW_KEY:
        // On passe à la slide suivante
        onSliderGoToNext()
            break;
        case SPACE_KEY:
        // On démarre ou on arrête le carrousel
        onSliderToggle()
            break;
        case LEFT_ARROW_KEY:
        // On passe à la slide précédente
        onSliderGoToPrevious()
            break;
    
        default:
            break;
    }

}

//fonction pour afficher ou arréter la lecture automatique
function onSliderToggle()
{
    // Modification de l'icône du bouton pour démarrer ou arrêter le carrousel. PLAY PAUSE on peut modifier la class de l'icon fontawesome avec classList
    const icon = document.querySelector('#slider-toggle i')

    icon.classList.toggle('fa-play')
    icon.classList.toggle('fa-pause')
    // Si le carousel n'est pas démarré ?
    if(state.timer === null){
        //démarrage du carousel, toutes les deux secondes.
        state.timer = window.setInterval(onSliderGoToNext, 2000)
        console.log("state.timer", state.timer);
        /*
         * Modification du libellé du bouton en mode "OFF".
         *
         * La variable spéciale this est automatiquement initialisée par le
         * navigateur avec l'objet DOM qui a déclenché l'évènement.
         *
         * C'est le bouton "Démarrer/Arrêter le carrousel" qui a déclenché
         * l'évènement, donc la variable spéciale this vaut la même chose
         * que l'objet renvoyé par document.querySelector('#js-slider-toggle'); 
         */
         //modifier la propriété title
         this.title = 'Arrêter le carrousel'

         
         
    // sinon
    }else  {
        //arrêt du carousel.
        window.clearInterval(state.timer)
        // Réinitialisation de la propriété pour le prochain clic sur le bouton.
        state.timer = null
        /*
         * Modification du libellé du bouton en mode "ON".
         *
         * La variable spéciale this est automatiquement initialisée par le
         * navigateur avec l'objet DOM qui a déclenché l'évènement.
         *
         * C'est le bouton "Démarrer/Arrêter le carrousel" qui a déclenché
         * l'évènement, donc la variable spéciale this vaut la même chose
         * que l'objet renvoyé par document.querySelector('#js-slider-toggle');
         */
         //modifier la propriété title
         this.title = 'Démarrer le carrousel';


    }
}

//fonction pour afficher ou cacher la barre d'outils
function onToolbarToggle()
{
    // Modification de l'icône du lien pour afficher ou cacher la barre d'outils. (on peut changer la classe avec classList)
    const icon = document.querySelector('#toolbar-toggle i');

    icon.classList.toggle('fa-arrow-down');
    icon.classList.toggle('fa-arrow-right');
    
    
    // Affiche ou cache la barre d'outils. (class hide dans le css)
    document.querySelector('.toolbar ul').classList.toggle('hide');
}

function refreshSlider()
{
    // Recherche des balises de contenu du carrousel.
    const sliderImage = document.querySelector('#slider img');
    const sliderLegend = document.querySelector('#slider figcaption');
    // Changement de la source de l'image et du texte de la légende du carrousel.
    sliderImage.src = slides[state.index].image
    sliderLegend.textContent = slides[state.index].legend
    sliderImage.style.width = "840px"
    sliderImage.style.height = "636px"
}


/*************************************************************************************************/
/* ************************************** CODE PRINCIPAL *************************************** */
/*************************************************************************************************/
/*
 * Installation d'un gestionnaire d'évènement déclenché quand l'arbre DOM sera
 * totalement construit par le navigateur.
 *
 * Le gestionnaire d'évènement est une fonction anonyme que l'on donne en deuxième
 * argument directement à document.addEventListener().
 */

document.addEventListener('DOMContentLoaded', function() {
    // on créer l'objet state avec une propriété index pour les slides, et un timer à l'arret au démarrage (null)
    state = {
        index: 0,
        timer: null
    }

    // Installation des gestionnaires d'évènement. (fonction utilities)
    installEventHandler('#slider-random', 'click', onSliderGoToRandom)
    installEventHandler('#slider-previous', 'click', onSliderGoToPrevious)
    installEventHandler('#slider-next', 'click', onSliderGoToNext)
    installEventHandler('#slider-toggle', 'click', onSliderToggle)
    installEventHandler('#toolbar-toggle', 'click', onToolbarToggle)
    //ajout d'un événement sur le clavier qui appelera notre fonction onSliderKeyup
    document.addEventListener('keyup', onSliderKeyup)

     // Affichage initial.(appel de fonction)
     refreshSlider()
})


const test = document.querySelector("#test")
test.addEventListener("click", (e)=>{
    e.preventDefault()
    if(test.innerHTML == "play"){
        test.innerHTML = "stop"
    }else{
        test.innerHTML = "play"
    }
})