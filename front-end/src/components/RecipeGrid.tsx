import { RecipeCard } from "./RecipeCard";

interface Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
    strArea?: string;
}

interface RecipeGridProps {
    recipes: Recipe[];
    onRecipeClick: (id: string) => void;
    isLoading?: boolean;
}

export const RecipeGrid = ({ recipes, onRecipeClick, isLoading }: RecipeGridProps) => {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                        <div className="bg-muted rounded-lg aspect-video mb-4"></div>
                        <div className="bg-muted h-4 rounded mb-2"></div>
                        <div className="bg-muted h-3 rounded w-2/3"></div>
                    </div>
                ))}
            </div>
        );
    }

    if (recipes.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No recipes found. Try a different search term!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
                <RecipeCard
                    key={recipe.idMeal}
                    recipe={recipe}
                    onClick={onRecipeClick}
                />
            ))}
        </div>
    );
};