import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, X, Calendar, Star, Clock, Volume2 } from "lucide-react";
import { useState } from "react";

interface FilterOptions {
  categories: string[];
  dateRange: string;
  popularity: number[];
  duration: number[];
  voices: string[];
  tones: string[];
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const FilterPanel = ({ isOpen, onClose, filters, onFiltersChange }: FilterPanelProps) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const categories = [
    "Fiction", "Non-fiction", "Business", "Self-help", 
    "Science", "History", "Biography", "Poetry"
  ];

  const voiceTypes = [
    "Male", "Female", "British", "American", "Australian"
  ];

  const toneTypes = [
    "Neutral", "Suspenseful", "Inspiring", "Cheerful", 
    "Calm", "Confident", "Playful"
  ];

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      dateRange: "",
      popularity: [0],
      duration: [0],
      voices: [],
      tones: []
    });
    setActiveFilters([]);
  };

  if (!isOpen) return null;

  return (
    <Card className="glass-card fixed left-4 top-24 w-80 h-[calc(100vh-8rem)] overflow-y-auto z-50 p-6">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-lg">Smart Filters</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Active Filters</span>
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                Clear all
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="secondary" className="glass-card">
                  {filter}
                  <X className="w-3 h-3 ml-1 cursor-pointer" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            Categories
          </h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFilter("categories", [...filters.categories, category]);
                    } else {
                      updateFilter("categories", filters.categories.filter(c => c !== category));
                    }
                  }}
                />
                <label htmlFor={category} className="text-sm cursor-pointer">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            Date Created
          </h4>
          <Select value={filters.dateRange} onValueChange={(value) => updateFilter("dateRange", value)}>
            <SelectTrigger className="glass-card border-white/20">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent className="glass-card border-white/20">
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Popularity */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center">
            <Star className="w-4 h-4 mr-2 text-primary" />
            Popularity
          </h4>
          <div className="px-2">
            <Slider
              value={filters.popularity}
              onValueChange={(value) => updateFilter("popularity", value)}
              max={100}
              step={10}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0</span>
              <span>{filters.popularity[0]}%</span>
              <span>100</span>
            </div>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            Duration (minutes)
          </h4>
          <div className="px-2">
            <Slider
              value={filters.duration}
              onValueChange={(value) => updateFilter("duration", value)}
              max={180}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0</span>
              <span>{filters.duration[0]} min</span>
              <span>180</span>
            </div>
          </div>
        </div>

        {/* Voice Types */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center">
            <Volume2 className="w-4 h-4 mr-2 text-primary" />
            Voice Types
          </h4>
          <div className="space-y-2">
            {voiceTypes.map((voice) => (
              <div key={voice} className="flex items-center space-x-2">
                <Checkbox
                  id={voice}
                  checked={filters.voices.includes(voice)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFilter("voices", [...filters.voices, voice]);
                    } else {
                      updateFilter("voices", filters.voices.filter(v => v !== voice));
                    }
                  }}
                />
                <label htmlFor={voice} className="text-sm cursor-pointer">
                  {voice}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Filters */}
        <Button className="w-full gradient-primary text-white glow-effect">
          Apply Filters
        </Button>
      </div>
    </Card>
  );
};

export default FilterPanel;