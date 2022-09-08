import { recipes } from "./data-recipes";
import { normalizeString } from "./normalizeString";

function nativeSearch(userInput){

    const userInput = normalizeString(userInput)
    const searchResult = document.querySelector("#recipes_gallery");
    const result = [];

    /* i représente les recettes */

    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].name.toLowerCase().includes(userInput)) {
            result.push(recipes[i]);
        } else if (recipes[i].description.toLowerCase().includes(userInput)) {
            result.push(recipes[i]);
        } else if (recipes[i].ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(userInput))) {
            result.push(recipes[i]);
        }
    }

    /* affichage du message d'erreur */

    if(result.length === 0){
        return searchResult.innerHTML = '<p class="error">Aucune recette ne contient correspond a votre recherche. Essayer par exemple "poulet", "salade de riz" etc.</p>';
    }
}