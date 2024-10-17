import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search books..."
      value={searchQuery}
      onChange={handleSearch}
      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-300 focus:outline-none focus:ring sm:w-96"
    />
  );
};

export default SearchBar;
