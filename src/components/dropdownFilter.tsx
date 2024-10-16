import React from "react";

interface DropdownFilterProps {
  onFilter: (genre: string) => void;
}

const genres = ["Fiction", "Drama", "Philosophy", "Adventure"];

const DropdownFilter: React.FC<DropdownFilterProps> = ({ onFilter }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilter(e.target.value);
  };

  return (
    <select
      onChange={handleFilterChange}
      className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
    >
      <option value="">All Genres</option>
      {genres.map((genre) => (
        <option key={genre} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
};

export default DropdownFilter;
