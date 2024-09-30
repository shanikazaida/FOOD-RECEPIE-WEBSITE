const recipeContainer = document.getElementById('recipeContainer');
const searchBtn = document.getElementById('searchBtn');

async function fetchRecipes(query) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const data = await response.json();
        if (data.meals) {
            displayRecipes(data.meals);
        } else {
            displayNoResults();
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        displayNoResults();
    }
}

function displayRecipes(recipes) {
    recipeContainer.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        const ingredientsList = getIngredientsList(recipe);

        recipeDiv.innerHTML = `
            <h3>${recipe.strMeal}</h3>
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <p><strong>Recipe ID:</strong> ${recipe.idMeal}</p>
            <p><strong>Ingredients:</strong> ${ingredientsList}</p>
            <a href="${recipe.strSource}" target="_blank" class="viewRecipeBtn">View Recipe</a>
        `;

        recipeContainer.appendChild(recipeDiv);
    });
}

function displayNoResults() {
    recipeContainer.innerHTML = '<p>No recipes found. Please try another search.</p>';
}

function getIngredientsList(recipe) {
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
        let ingredient = recipe[`strIngredient${i}`];
        let measure = recipe[`strMeasure${i}`];
        if (ingredient) {
            ingredients.push(`${measure.trim()} ${ingredient.trim()}`);
        }
    }
    return ingredients.join(', ');
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const query = document.getElementById('search').value.trim();
    if (query) {
        fetchRecipes(query);
    }
});

// Additional recipes to demonstrate
const extraRecipes = ['Chicken Biryani', 'Chicken Curry', 'Butter Chicken', 'Chicken Tikka', 'Chicken Noodle Soup'];

extraRecipes.forEach(recipe => {
    // This can be called as needed to load extra recipes
    fetchRecipes(recipe);
});
