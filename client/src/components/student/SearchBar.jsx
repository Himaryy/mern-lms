import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ data }) => {
  const navigate = useNavigate();

  const [input, setInput] = useState(data ? data : "");

  const onSearchHandler = (e) => {
    e.preventDefault();
    navigate("/course-list/" + input);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form
        onSubmit={onSearchHandler}
        className="h-12 flex items-center bg-white border border-gray-500/20 rounded md:h-14"
      >
        <img
          src={assets.search_icon}
          alt="Search icon"
          className="w-10 px-3 md:w-auto"
        />
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Search for courses"
          className="w-full h-full outline-none text-gray-500/80"
        />
        <button
          type="submit"
          className="bg-blue-600 rounded text-white px-7 py-2 mx-1 md:px-10 md:py-3 "
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
