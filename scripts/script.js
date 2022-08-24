import { recipes } from './data-recipes.js'
import { searchFunctionnalProgramming } from './searchFunctionalProgramming.js'
import { displayRecipes } from './cardrecipes.js'
import { fillDropdown } from './dropdownitem.js'
import { filterTags } from './filterTags.js'
import dropdowntags from './dropdowntags.js'

let recipesArray = Object.entries(recipes);

console.log(recipesArray);

/* constantes et variables générales */

let tagPicked = new Array();
const searchResult = document.querySelector("#recipes_gallery");

/* fonction DOMbuild */

/*const domBuild = (elt, attributes) => {
    const element = document.createElement(elt);
    for (let key in attributes) {
        element.setAttribute(key, attributes[key])
    }
    return element;
}*/

/* integration des dropdowns a la page */

fillDropdown(recipes);

/* integration des cartes de recettes */

window.addEventListener("load", () => {
    displayRecipes(recipes);
    addTag(recipes);
})

/* ecoute de l'input et mise en place de l'algorithme de recherche */

const searchInput = document.querySelector("#main_search");

searchInput.addEventListener("input", ()=>{
    if (searchInput.value.length === 0){
        searchResult.innerHTML = "";
        displayRecipes(recipes);
    }
    if(searchInput.value.length >= 3){
        searchFunctionnalProgramming(searchInput.value).then((response)=>{
            if(response === "Pas de recettes trouvees"){
               return searchResult.innerHTML = '<p class="error">Aucune recette ne contient correspond a votre recherche. Essayer par exemple "poulet", "salade de riz" etc.</p>';
            }
            displayRecipes(response);
        });
    }
});


/* fonction d'ajout des options dans les dropdowns*/
/* filtrage via les tags */

function addTag(array) {
    const items = document.querySelectorAll(".drop_section li");
    const tagField = document.querySelector(".tag_field");

    items.forEach((item) => {
        item.addEventListener("click", () => {
            new dropdowntags(tagField, item.textContent, item.parentNode);
            displayRecipes(filterTags(array, item.textContent));
            tagPicked.push(item.textContent);
            item.classList.add("hidden");
        });
    });
}

/* fermeture des tags */

function closeTag() {
    const icons = document.querySelectorAll(".tag_close");
    console.log(icons);

    icons.forEach((icon) => {
        icon.addEventListener("click", () => {
            let tag = icon.parentElement;
            icon.remove();
            deleteTagFiltering();
        });
    });
}

closeTag();

/* reset des recettes après suppresion des tags */

function deleteTagFiltering(){
    const tags = document.querySelectorAll(".tag");
    let tagArray = [];

    for (let i = 0; i < tags.length; i++) {
        tagArray.push(tags[i].innerText);
    }
    tagPicked = tagArray;

    for (let i = 0; i< tagPicked.length; i++) {
        displayRecipes(filterTags(recipes, tagPicked[i]));
    }

    if (tagPicked.length === 0) {
        searchResult.innerHTML = "";
        displayRecipes(recipes);
    }
}