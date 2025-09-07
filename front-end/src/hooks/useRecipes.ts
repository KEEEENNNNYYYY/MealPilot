import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

interface Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
    strArea?: string;
}

interface RecipeDetail extends Recipe {
    strInstructions: string;
    strIngredient1?: string;
    strIngredient2?: string;
    strIngredient3?: string;
    strIngredient4?: string;
    strIngredient5?: string;
    strIngredient6?: string;
    strIngredient7?: string;
    strIngredient8?: string;
    strIngredient9?: string;
    strIngredient10?: string;
    strIngredient11?: string;
    strIngredient12?: string;
    strIngredient13?: string;
    strIngredient14?: string;
    strIngredient15?: string;
    strIngredient16?: string;
    strIngredient17?: string;
    strIngredient18?: string;
    strIngredient19?: string;
    strIngredient20?: string;
    strMeasure1?: string;
    strMeasure2?: string;
    strMeasure3?: string;
    strMeasure4?: string;
    strMeasure5?: string;
    strMeasure6?: string;
    strMeasure7?: string;
    strMeasure8?: string;
    strMeasure9?: string;
    strMeasure10?: string;
    strMeasure11?: string;
    strMeasure12?: string;
    strMeasure13?: string;
    strMeasure14?: string;
    strMeasure15?: string;
    strMeasure16?: string;
    strMeasure17?: string;
    strMeasure18?: string;
    strMeasure19?: string;
    strMeasure20?: string;
}

const searchRecipes = async (query: string): Promise<Recipe[]> => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.meals || [];
};

const getRecipeById = async (id: string): Promise<RecipeDetail | null> => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    return data.meals?.[0] || null;
};

// Helper function to search recipes by multiple tags
const searchRecipesByTags = async (tags: string[]): Promise<Recipe[]> => {
    if (tags.length === 0) return [];

    // For now, we'll search by the first tag since the API doesn't support multiple tag filtering
    // In a real app, you'd implement proper multi-tag filtering
    const tag = tags[0];

    // Map our tag IDs to API endpoints
    const tagMapping: Record<string, string> = {
        italian: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian',
        mexican: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Mexican',
        chinese: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Chinese',
        indian: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian',
        american: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=American',
        dessert: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert',
        chicken: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken',
        beef: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef',
        seafood: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood',
        vegetarian: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian',
        pasta: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Pasta',
        breakfast: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast',
    };

    const url = tagMapping[tag];
    if (!url) return [];

    const response = await fetch(url);
    const data = await response.json();
    return data.meals || [];
};

const getRandomRecipes = async (): Promise<Recipe[]> => {
    // Get multiple random recipes
    const promises = Array.from({ length: 8 }, () =>
        fetch('https://www.themealdb.com/api/json/v1/1/random.php').then(res => res.json())
    );

    const results = await Promise.all(promises);
    return results.map(result => result.meals[0]).filter(Boolean);
};

export const useRecipeSearch = (query: string) => {
    return useQuery({
        queryKey: ['recipes', query],
        queryFn: () => searchRecipes(query),
        enabled: !!query,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useRecipesByTag = (tags: string[]) => {
    return useQuery({
        queryKey: ['recipes-by-tags', tags],
        queryFn: () => searchRecipesByTags(tags),
        enabled: tags.length > 0,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useRecipeDetail = (id: string) => {
    return useQuery({
        queryKey: ['recipe', id],
        queryFn: () => getRecipeById(id),
        enabled: !!id,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

export const useRandomRecipes = () => {
    return useQuery({
        queryKey: ['random-recipes'],
        queryFn: getRandomRecipes,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

// Helper function to extract ingredients from recipe detail
export const getIngredients = (recipe: RecipeDetail): Array<{ ingredient: string; measure: string }> => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}` as keyof RecipeDetail] as string;
        const measure = recipe[`strMeasure${i}` as keyof RecipeDetail] as string;

        if (ingredient && ingredient.trim()) {
            ingredients.push({
                ingredient: ingredient.trim(),
                measure: measure?.trim() || ''
            });
        }
    }
    return ingredients;
};