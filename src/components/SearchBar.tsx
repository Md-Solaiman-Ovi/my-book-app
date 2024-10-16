import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

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
      className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-96 focus:outline-none focus:ring focus:border-blue-300"
    />
  );
};

export default SearchBar;