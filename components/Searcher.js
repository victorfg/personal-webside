import { useState } from "react";

const Searcher = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };

  return (
    <div className="text-black bg-white flex items-center justify-center dark:bg-transparent">
      <div className="border rounded overflow-hidden flex">
        <input
          type="search"
          className="border-none px-4 py-2 dark:bg-transparent dark:text-gray-100"
          placeholder="Search..."
          name="q"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="flex items-center justify-center px-4 border-l">
          <svg
            className="h-4 w-4 text-grey-dark dark:fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Searcher;
