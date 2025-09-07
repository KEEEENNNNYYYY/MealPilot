import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { X } from "lucide-react";

interface TagsFilterBarProps {
    onTagsChange: (tags: string[]) => void;
    isLoading?: boolean;
}

const POPULAR_TAGS = [
    { id: "italian", label: "Italian", type: "area" },
    { id: "mexican", label: "Mexican", type: "area" },
    { id: "chinese", label: "Chinese", type: "area" },
    { id: "indian", label: "Indian", type: "area" },
    { id: "american", label: "American", type: "area" },
    { id: "dessert", label: "Dessert", type: "category" },
    { id: "chicken", label: "Chicken", type: "category" },
    { id: "beef", label: "Beef", type: "category" },
    { id: "seafood", label: "Seafood", type: "category" },
    { id: "vegetarian", label: "Vegetarian", type: "category" },
    { id: "pasta", label: "Pasta", type: "category" },
    { id: "breakfast", label: "Breakfast", type: "category" },
];

export const TagsFilterBar = ({ onTagsChange, isLoading }: TagsFilterBarProps) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const handleTagClick = (tagId: string) => {
        const newTags = selectedTags.includes(tagId)
            ? selectedTags.filter(tag => tag !== tagId)
            : [...selectedTags, tagId];

        setSelectedTags(newTags);
        onTagsChange(newTags);
    };

    const clearAllTags = () => {
        setSelectedTags([]);
        onTagsChange([]);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-6 shadow-lg animate-fade-in">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-gradient-to-b from-primary to-primary-glow rounded-full"></div>
                        <h3 className="text-lg font-semibold text-foreground">Filter by Tags</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {POPULAR_TAGS.map((tag, index) => (
                            <Badge
                                key={tag.id}
                                variant={selectedTags.includes(tag.id) ? "default" : "secondary"}
                                className={`cursor-pointer transition-all duration-300 hover-scale animate-fade-in ${selectedTags.includes(tag.id)
                                        ? "bg-gradient-to-r from-primary to-primary-glow text-primary-foreground shadow-lg border-primary/20"
                                        : "bg-card/80 text-card-foreground border-border hover:bg-accent/80 hover:border-primary/30"
                                    }`}
                                style={{ animationDelay: `${index * 50}ms` }}
                                onClick={() => handleTagClick(tag.id)}
                            >
                                {tag.label}
                                {selectedTags.includes(tag.id) && (
                                    <div className="ml-1 w-1.5 h-1.5 bg-primary-foreground rounded-full animate-pulse"></div>
                                )}
                            </Badge>
                        ))}
                    </div>

                    {selectedTags.length > 0 && (
                        <div className="flex items-center justify-between pt-3 border-t border-border/50 animate-fade-in">
                            <div className="text-sm text-muted-foreground">
                                <span className="font-medium">{selectedTags.length}</span> filter{selectedTags.length > 1 ? 's' : ''} active: {' '}
                                <span className="text-foreground">
                                    {selectedTags.map(tagId =>
                                        POPULAR_TAGS.find(tag => tag.id === tagId)?.label
                                    ).join(", ")}
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearAllTags}
                                className="text-muted-foreground hover:text-destructive transition-colors hover-scale"
                                disabled={isLoading}
                            >
                                <X className="h-3 w-3 mr-1" />
                                Clear all
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};