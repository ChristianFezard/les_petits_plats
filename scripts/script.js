import { recipes } from './data-recipes.js'
import { displayRecipes } from './cardrecipes.js'
import { fillDropdown } from './dropdownitem.js'
import { filterTags } from './filterTags.js'
import dropdowntags from './dropdowntags.js'
import { fillDropdownAfterSearch } from "./fillDropdownAfterSearch.js";
import { imperativeSearchProgramming } from "./searchNativeProgramming.js";
import { normalizeString } from './normalizeString.js'

/* constantes et variables générales */

let tagPicked = [];
let recipesFiltered = [...recipes];
const searchResult = document.querySelector("#recipes_gallery");

/* integration des cartes de recettes */
/* integration des dropdowns a la page */

window.addEventListener("load", () => {
    displayRecipes(recipes);
    fillDropdown(recipes);
    addTag(recipes);
})

/* ecoute de l'input et mise en place de l'algorithme de recherche */

const searchInput = document.querySelector("input[placeholder='Rechercher une recette']");

searchInput.addEventListener("input", ()=>{

    const userInput = searchInput.value

    if (userInput.length === 0 && tagPicked.length === 0){
        searchResult.innerHTML = "";
        displayRecipes(recipes);
        fillDropdown(recipes);
        addTag(recipes);
    }
    if (userInput.length < 3 && tagPicked.length != 0){
        displayRecipes(filterTags(recipes, tagPicked[0]));
    }
    if(userInput.length === 1 || userInput.length === 2 && tagPicked.length === 0){
        searchResult.innerHTML = '<p class="error">Veuillez saisir au moins 3 caractères.</p>';
    }
    if(userInput.length >= 3 && tagPicked.length === 0){

        const normalizedInput = normalizeString(userInput)

        imperativeSearchProgramming(normalizedInput).then((response)=>{
            if(response === "Pas de recettes trouvées"){
               return searchResult.innerHTML = '<p class="error">Aucune recette ne correspond a votre recherche. Essayer par exemple "poulet", "salade de riz" etc.</p>';
            }
            displayRecipes(response);
            fillDropdown(response);
            addTag(response);
        });
    }
});


/* fonction d'ajout des options dans les dropdowns*/
/* filtrage via les tags */

const updateRecipes = (updatedRecipes) => {
    recipesFiltered = updatedRecipes;
};

function addTag(array) {
    
    const tagField = document.querySelector(".tag_field");
    const items = document.querySelectorAll(".drop_section li");

    items.forEach((item) => {
        item.addEventListener("click", () => {
        if (!tagPicked.includes(item.textContent)) {
            new dropdowntags(tagField, item.textContent, item.parentNode);
            updateRecipes(filterTags(array, item.textContent));
            displayRecipes(recipesFiltered);
            fillDropdown(recipesFiltered);
            addTag(recipesFiltered);
            tagPicked.push(item.textContent);
        }
        closeTag();
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
            tag.remove();
            deleteTagFiltering();
            fillDropdown(recipesFiltered);
            addTag();
            tagPicked.pop(tag);
            if(tagPicked.length === 0){
                imperativeSearchProgramming(searchInput.value).then((response)=>{
                    if(response === "Pas de recettes trouvées"){
                       return searchResult.innerHTML = '<p class="error">Aucune recette ne correspond a votre recherche. Essayer par exemple "poulet", "salade de riz" etc.</p>';
                    }
                    displayRecipes(response);
                    fillDropdown(response);
                    addTag(response);
                });
            }
        });
    });
}

/* reset des recettes après suppresion des tags */

function deleteTagFiltering() {
    const tags = document.querySelectorAll(".tag");
    let tagArray = [];

    for (let i = 0; i < tags.length; i++) {
        tagArray.push(tags[i].innerText);
    }
    tagPicked = tagArray;

    if (tagPicked.length === 0) {
        searchResult.innerHTML = "";
        displayRecipes(recipes);
    } else {
        recipesFiltered = filterTags(recipes, tagPicked.join(' ')); // Utilisez tagPicked pour filtrer
        if (recipesFiltered.length === 0) {
            searchResult.innerHTML = '<p class="error">Aucune recette ne correspond à vos tags sélectionnés.</p>';
        } else {
            displayRecipes(recipesFiltered);
            fillDropdown(recipesFiltered);
        }
    }
}


/* ecoute et gestion des champs de recherche des dropdowns */

const inputIngredient = document.querySelector("input[placeholder='Rechercher un ingredient']");
const inputAppliance = document.querySelector("input[placeholder='Rechercher un appareil']");
const inputUstensil = document.querySelector("input[placeholder='Rechercher un ustensile']");

function filterDropdown(searchedElement, recipes, filteringType) {

    searchedElement = searchedElement.toLowerCase();
    let result;

    if (filteringType === "ingredient") {
        result = recipes.map((ingredient)=>{
            const ingredientsList = ingredient.ingredients.map((ingredientItem)=>{
                return ingredientItem.ingredient.toLowerCase();
            });
            return ingredientsList;  
        });
        result = result.flat();
        result = [...new Set(result)];
        result = result.filter((element)=>{
            return element.includes(searchedElement) === true;
        }).map((element) => {
            return element.slice(0, 1).toUpperCase() + element.slice(1);
        }).sort((a, b) => {
            return a.localeCompare(b);
        });
        return result;
    }

    if (filteringType === "appliance") { 
        result = recipes.map((recipe)=>{
            return recipe.appliance.toLowerCase();      
        }).filter((appliance)=>{
            return appliance.includes(searchedElement) === true;
        });
        result = [...new Set(result)];
        result = result.map((appliance) => {
            return appliance.slice(0, 1).toUpperCase() + appliance.slice(1);
        }).sort((a, b) => {
            a.localeCompare(b);
        })
        return result;
    }

    if (filteringType === "ustensils") {
        result = recipes.map((recipe) => {
            return recipe.ustensils
        });
        result = result.flat();
        result = [...new Set(result)];
        result = result.filter((ustensils) => {
            return ustensils.includes(searchedElement) === true;
        }).map((ustensils) => {
            return ustensils.slice(0, 1).toUpperCase() + ustensils.slice(1);
        }).sort((a, b) => {
            return a.localeCompare(b);
        });
        return result;
    }    
}

inputIngredient.addEventListener("input", function() {
    const inputValue = this.value;
    this.nextElementSibling.innerHTML = fillDropdownAfterSearch(filterDropdown(inputValue, recipes, "ingredient"));
    addTag(recipes);

});

inputAppliance.addEventListener("input", function() {
    const inputValue = this.value;
    this.nextElementSibling.innerHTML = fillDropdownAfterSearch(filterDropdown(inputValue, recipes, "appliance"));
    addTag(recipes);
});

inputUstensil.addEventListener("input", function() {
    const inputValue = this.value;
    this.nextElementSibling.innerHTML = fillDropdownAfterSearch(filterDropdown(inputValue, recipes, "ustensils"));
    addTag(recipes);
});


