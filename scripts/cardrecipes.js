/* CREATION DES CARTES RECETTES */ 

export function displayRecipes(data) {

    let recipesHTML = "";

    data.forEach((recipe) => {
        
        recipesHTML += `
            <a href="#" class="recipe_card">
                <div class="card_image"></div>
                <div class="card_description">
                    <div class="recipe_head">
                        <h2 class="recipe_title">${recipe.name}</h2>
                        <div class="recipe_time">
                            <i class="far fa-clock"></i>
                            <p class="recipe_minutes">${recipe.time} min</p>
                        </div>
                    </div>
                    <div class="recipe_content">
                        <span class="recipe_ingredients">

                            ${recipe.ingredients.map((ingredient)=>{
                                let quantity = ingredient.quantity ?? ingredient.quantite;
                                let unit = ingredient.unit ?? ingredient.unite;
                                if(unit === undefined){
                                    unit = "";
                                }
                                if(quantity === undefined){
                                    quantity = "";
                                }
                                return `
                                <div>${ingredient.ingredient} : ${quantity} ${unit}</div>

                                `;
                            }).join("")}
                        </span>                        
                        <span class="recipe_steps">${recipe.description}</span>
                    </div>    
                </div>
            </a> 
            `;
        
    });
    document.querySelector("#recipes_gallery").innerHTML = recipesHTML;
}