/* fonction filtrage via tags */

export const filterTags = (array, string) => {
    let filter = string.toLowerCase();
    let arrayFiltered = new Array();

    array.filter((element) => {
        if (
            element.appliance.toLowerCase().includes(filter) ||
            arrayIngredient(element.ingredients, filter) === true ||
            arrayUstensil(element.ustensils, filter) === true
        ) {
            arrayFiltered.push(element);
        }
    });
    return arrayFiltered
}

function arrayUstensil(array, string) {
    let resp = null;
    array.forEach((element) => {
       if (element.toLowerCase().includes(string.toLowerCase())) {
        resp = true
       }
    });
    return resp;
}

function arrayIngredient(array, string) {
    let resp = null;
    array.forEach((element) => {
       if (element.ingredient.toLowerCase().includes(string.toLowerCase())) {
        resp = true
       }
    });
    return resp;
}