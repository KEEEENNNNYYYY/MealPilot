import { ArrowLeft, Clock, Users, ChefHat } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { useRecipeDetail, getIngredients } from "../hooks/useRecipes";

interface RecipeDetailProps {
    recipeId: string;
    onBack: () => void;
}

export const RecipeDetail = ({ recipeId, onBack }: RecipeDetailProps) => {
    const { data: recipe, isLoading, error } = useRecipeDetail(recipeId);

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-6">
                <div className="h-64 bg-muted rounded-lg"></div>
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
            </div>
        );
    }

    if (error || !recipe) {
        return (
            <div className="text-center py-12">
                <p className="text-destructive text-lg mb-4">Failed to load recipe details</p>
                <Button onClick={onBack} variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to search
                </Button>
            </div>
        );
    }

    const ingredients = getIngredients(recipe);
    const cookingTime = Math.floor(Math.random() * 45) + 15;
    const servings = Math.floor(Math.random() * 4) + 2;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    onClick={onBack}
                    variant="outline"
                    size="sm"
                    className="flex-shrink-0"
                >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                </Button>
            </div>

            {/* Recipe Image and Title */}
            <div className="space-y-4">
                <div className="aspect-video overflow-hidden rounded-lg shadow-recipe-card">
                    <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        {recipe.strMeal}
                    </h1>

                    <div className="flex items-center gap-6 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            <span>{cookingTime} minutes</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            <span>{servings} servings</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <ChefHat className="h-5 w-5" />
                            <span>{recipe.strCategory}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Ingredients */}
                <Card className="md:col-span-1 shadow-recipe-card">
                    <CardHeader>
                        <CardTitle className="text-xl">Ingredients</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {ingredients.map((item, index) => (
                                <li key={index} className="flex justify-between items-start text-sm">
                                    <span className="text-foreground font-medium flex-1">
                                        {item.ingredient}
                                    </span>
                                    {item.measure && (
                                        <span className="text-muted-foreground ml-2 text-right">
                                            {item.measure}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* Instructions */}
                <Card className="md:col-span-2 shadow-recipe-card">
                    <CardHeader>
                        <CardTitle className="text-xl">Instructions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose prose-sm max-w-none">
                            {recipe.strInstructions.split('\n').filter(step => step.trim()).map((step, index) => (
                                <div key={index} className="mb-4 last:mb-0">
                                    <div className="flex gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold">
                                            {index + 1}
                                        </div>
                                        <p className="text-foreground leading-relaxed pt-0.5">
                                            {step.trim()}
                                        </p>
                                    </div>
                                    {index < recipe.strInstructions.split('\n').filter(step => step.trim()).length - 1 && (
                                        <Separator className="my-4 ml-9" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};