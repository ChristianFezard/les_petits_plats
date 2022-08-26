/* Integration des éléments dans les dropdowns */

export function fillDropdown(recipes) {
    let ingredientList = [];
    let applianceList = [];

    const dropdownIngredient = document.getElementById("ingredient_list");
    const dropdownAppliance = document.getElementById("appliance_list");
    const dropdownUstensil = document.getElementById("ustensil_list");

/* Tableau ingredients */    

    recipes.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            ingredientList.push(ingredient.ingredient);
        });
    });
    ingredientList = [...new Set(ingredientList)];
    ingredientList.sort();

    /* edition du tableau en élément intégré a la liste a puces*/

    dropdownIngredient.innerHTML = "";
    ingredientList.forEach((item) => {
        let list = document.createElement("li");
        list.innerText = item;

        dropdownIngredient.appendChild(list);
    })

/* Tableau appareils */

    recipes.forEach((recipe) => {
        applianceList.push(recipe.appliance);
    });
    applianceList = [...new Set(applianceList)];
    applianceList.sort();

    dropdownAppliance.innerHTML = "";
    applianceList.forEach((item) => {
        let list = document.createElement("li");
        list.innerText = item;

        dropdownAppliance.appendChild(list);
    })

/* Tableau ustensiles */

    let ustensils = recipes.map((recipe) => {
       return recipe.ustensils 
    });
    ustensils = [...new Set(ustensils.flat())];
    ustensils.sort();

    dropdownUstensil.innerHTML = "";
    ustensils.forEach((item) => {
        let list = document.createElement("li");
        list.innerText = item;

        dropdownUstensil.appendChild(list);
    })
}




