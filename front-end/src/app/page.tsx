"use client";

import { useState } from "react";
import { SearchBar } from "../components/SearchBar";
import { TagsFilterBar } from "../components/TagsFilterBar";
import { RecipeGrid } from "../components/RecipeGrid";
import { RecipeDetail } from "../components/RecipeDetail";
import { useRecipeSearch, useRandomRecipes, useRecipesByTag } from "../hooks/useRecipes";
//import heroImage from "@/assets/recipe-hero.jpg";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  const { data: searchResults, isLoading: isSearchLoading } = useRecipeSearch(searchQuery);
  const { data: tagResults, isLoading: isTagLoading } = useRecipesByTag(selectedTags);
  const { data: randomRecipes, isLoading: isRandomLoading } = useRandomRecipes();

  const displayRecipes = searchQuery ? searchResults : selectedTags.length > 0 ? tagResults : randomRecipes;
  const isLoading = searchQuery ? isSearchLoading : selectedTags.length > 0 ? isTagLoading : isRandomLoading;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedTags([]);
    setSelectedRecipeId(null);
  };

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags);
    setSearchQuery("");
    setSelectedRecipeId(null);
  };

  const handleRecipeClick = (id: string) => {
    setSelectedRecipeId(id);
  };

  const handleBackToSearch = () => {
    setSelectedRecipeId(null);
  };

  if (selectedRecipeId) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <RecipeDetail
            recipeId={selectedRecipeId}
            onBack={handleBackToSearch}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/recipe-hero.jpg"
            alt="Delicious food"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto text-center text-primary-foreground">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Amazing
            <br />
            <span className="text-primary-glow">Recipes</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Find the perfect dish for any occasion with our collection of delicious recipes from around the world
          </p>
          <div className="max-w-md mx-auto">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Tags Filter Bar */}
        <div className="mb-8">
          <TagsFilterBar onTagsChange={handleTagsChange} isLoading={isLoading} />
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : selectedTags.length > 0
                ? "Filtered Recipes"
                : "Featured Recipes"
            }
          </h2>
          <p className="text-muted-foreground text-lg">
            {searchQuery
              ? `${displayRecipes?.length || 0} recipes found`
              : selectedTags.length > 0
                ? `${displayRecipes?.length || 0} recipes with selected filters`
                : "Discover these handpicked recipes to inspire your next meal"
            }
          </p>
        </div>

        <RecipeGrid
          recipes={displayRecipes || []}
          onRecipeClick={handleRecipeClick}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default Index;
