
import React, { useState } from 'react';
import { Search, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SearchInputProps {
  placeholder: string;
  suggestions?: string[];
  onSearch: (value: string) => void;
  className?: string;
  iconColor?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  suggestions = [],
  onSearch,
  className,
  iconColor = "text-muted-foreground"
}) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion);
    onSearch(suggestion);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="relative">
        <motion.div
          animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="w-full"
        >
          <div className="relative">
            <Search 
              className={cn("absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5", iconColor)} 
            />
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className={cn(
                "search-input w-full pl-10 pr-4 py-3 rounded-xl border border-border/70 bg-background/80 placeholder:text-muted-foreground/70 focus:outline-none",
                className
              )}
            />
            {value && (
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground rounded-lg px-4 py-1.5 text-sm font-medium transition-colors hover:bg-primary/90"
              >
                Tìm kiếm
              </button>
            )}
          </div>
        </motion.div>
      </form>

      {suggestions.length > 0 && isFocused && (
        <div className="mt-2 p-2 bg-card rounded-lg border border-border/50 shadow-lg">
          <p className="px-2 py-1 text-xs text-muted-foreground font-medium flex items-center gap-1">
            <Star className="w-3 h-3" /> Gợi ý tra cứu
          </p>
          <div className="mt-1 flex flex-wrap gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1.5 text-sm bg-muted rounded-md hover:bg-muted/80 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
