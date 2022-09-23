import { recipes } from './data-recipes.js'
import { searchFunctionnalProgramming } from './searchFunctionalProgramming.js'
import { displayRecipes } from './cardrecipes.js'
import { fillDropdown } from './dropdownitem.js'
import { filterTags } from './filterTags.js'
import dropdowntags from './dropdowntags.js'
import {fillDropdownAfterSearch} from "./fillDropdownAfterSearch.js";

/* constantes et variables générales */

let tagPicked = [];
const searchResult = document.querySelector("#recipes_gallery");

/* integration des dropdowns a la page */

fillDropdown(recipes);

/* integration des cartes de recettes */

window.addEventListener("load", () => {
    displayRecipes(recipes);
    addTag(recipes);
})

/* ecoute de l'input et mise en place de l'algorithme de recherche */

const searchInput = document.querySelector("input[placeholder='Rechercher une recette']");

searchInput.addEventListener("input", ()=>{
    if (searchInput.value.length === 0){
        searchResult.innerHTML = "";
        displayRecipes(recipes);
        fillDropdown(recipes);
        addTag(recipes);
    }
    if(searchInput.value.length == 1 || searchInput.value.length == 2){
        searchResult.innerHTML = '<p class="error">Veuillez saisir au moins 3 caractères.</p>';
    }
    if(searchInput.value.length >= 3){
        searchFunctionnalProgramming(searchInput.value).then((response)=>{
            if(response === "Pas de recettes trouvées"){
               return searchResult.innerHTML = '<p class="error">Aucune recette ne contient correspond a votre recherche. Essayer par exemple "poulet", "salade de riz" etc.</p>';
            }
            displayRecipes(response);
            fillDropdown(response);
            addTag(response);
        });
    }
});


/* fonction d'ajout des options dans les dropdowns*/
/* filtrage via les tags */

function addTag(array) {
    
    const tagField = document.querySelector(".tag_field");
    const items = document.querySelectorAll(".drop_section li");

    items.forEach((item) => {
        item.addEventListener("click", () => {
        if (!tagPicked.includes(item.textContent)) {
            new dropdowntags(tagField, item.textContent, item.parentNode);
            displayRecipes(filterTags(array, item.textContent));
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
        });
    });
}

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

/* écoute et gestion des champs de recherche des dropdowns */

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
    if(this.value.length === 0){
        addTag(recipes);
    }
});

inputAppliance.addEventListener("input", function() {
    const inputValue = this.value;

    this.nextElementSibling.innerHTML = fillDropdownAfterSearch(filterDropdown(inputValue, recipes, "appliance"));
    if(this.value.length === 0){
        addTag(recipes);
    }
});

inputUstensil.addEventListener("input", function() {
    const inputValue = this.value;
    this.nextElementSibling.innerHTML = fillDropdownAfterSearch(filterDropdown(inputValue, recipes, "ustensils"));
    if(this.value.length === 0){
        addTag(recipes);
    }
});


