import { Clock, Users } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";

interface Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory?: string;
    strArea?: string;
}

interface RecipeCardProps {
    recipe: Recipe;
    onClick: (id: string) => void;
}

export const RecipeCard = ({ recipe, onClick }: RecipeCardProps) => {
    // Generate random cooking time for demo (TheMealDB doesn't provide this)
    const cookingTime = Math.floor(Math.random() * 45) + 15;
    const servings = Math.floor(Math.random() * 4) + 2;

    return (
        <Card
            className="recipe-card-hover cursor-pointer overflow-hidden shadow-recipe-card border-0 bg-card"
            onClick={() => onClick(recipe.idMeal)}
        >
            <div className="aspect-video overflow-hidden">
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                />
            </div>
            <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-card-foreground mb-2 line-clamp-2">
                    {recipe.strMeal}
                </h3>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{cookingTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{servings} servings</span>
                    </div>
                </div>

                {recipe.strCategory && (
                    <div className="flex gap-2">
                        <span className="inline-block px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
                            {recipe.strCategory}
                        </span>
                        {recipe.strArea && (
                            <span className="inline-block px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                                {recipe.strArea}
                            </span>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
};