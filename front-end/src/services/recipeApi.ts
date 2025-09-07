import { Recipe, RecipeSearchResponse, CategoriesResponse } from '../types/recipes';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const recipeApi = {
    // Search recipes by name
    searchByName: async (query: string): Promise<Recipe[]> => {
        try {
            const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
            const data: RecipeSearchResponse = await response.json();
            return data.meals || [];
        } catch (error) {
            console.error('Error searching recipes:', error);
            return [];
        }
    },

    // Get recipe by ID
    getRecipeById: async (id: string): Promise<Recipe | null> => {
        try {
            const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
            const data: RecipeSearchResponse = await response.json();
            return data.meals?.[0] || null;
        } catch (error) {
            console.error('Error fetching recipe:', error);
            return null;
        }
    },

    // Get random recipes
    getRandomRecipes: async (count: number = 12): Promise<Recipe[]> => {
        try {
            const promises = Array.from({ length: count }, () =>
                fetch(`${BASE_URL}/random.php`).then(res => res.json())
            );
            const results = await Promise.all(promises);
            return results.map(result => result.meals?.[0]).filter(Boolean);
        } catch (error) {
            console.error('Error fetching random recipes:', error);
            return [];
        }
    },

    // Get recipes by category
    getRecipesByCategory: async (category: string): Promise<Recipe[]> => {
        try {
            const response = await fetch(`${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`);
            const data: RecipeSearchResponse = await response.json();
            return data.meals || [];
        } catch (error) {
            console.error('Error fetching recipes by category:', error);
            return [];
        }
    },

    // Get all categories
    getCategories: async () => {
        try {
            const response = await fetch(`${BASE_URL}/categories.php`);
            const data: CategoriesResponse = await response.json();
            return data.categories || [];
        } catch (error) {
            console.error('Error fetching categories:', error);
            return [];
        }
    },

    // Parse ingredients from recipe
    getIngredients: (recipe: Recipe) => {
        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim()) {
                ingredients.push({
                    ingredient: ingredient.trim(),
                    measure: measure?.trim() || '',
                });
            }
        }
        return ingredients;
    },

    // Estimate cooking time (mock function since API doesn't provide this)
    estimateCookingTime: (instructions: string): string => {
        const wordCount = instructions.split(' ').length;
        if (wordCount < 100) return '15 mins';
        if (wordCount < 200) return '30 mins';
        if (wordCount < 300) return '45 mins';
        return '60 mins';
    },
};