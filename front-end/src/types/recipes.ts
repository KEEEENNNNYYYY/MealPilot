export interface Recipe {
    idMeal: string;
    strMeal: string;
    strDrinkAlternate?: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags?: string;
    strYoutube?: string;
    strSource?: string;
    strImageSource?: string;
    strCreativeCommonsConfirmed?: string;
    dateModified?: string;
    [key: string]: string | undefined; // For dynamic ingredient and measure properties
}

export interface RecipeSearchResponse {
    meals: Recipe[] | null;
}

export interface Category {
    idCategory: string;
    strCategory: string;
    strCategoryThumb: string;
    strCategoryDescription: string;
}

export interface CategoriesResponse {
    categories: Category[];
}