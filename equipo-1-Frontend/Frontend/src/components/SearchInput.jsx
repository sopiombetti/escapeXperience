import { useEffect, useState } from "react"
import { useAdventure } from "../utils/ctx/adventure.ctx";

const SearchInput = ({suggestions}) => {
  const [inputSearch, setInputSearch] = useState("")
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {state, dispatch} = useAdventure()
  const {palabraClave_filter, filtered_adventures} = state

  const handleChange = (e) => {
    const input = e.target.value;
    setInputSearch(input);

    const filtered = suggestions.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredSuggestions(filtered);

    setIsDropdownOpen(input.length > 2 && filtered.length > 0);
  }
  const handleSelect = (suggestion) => {
    setInputSearch(suggestion);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    dispatch("SET_KEYWORD_FILTER", inputSearch )
  },[inputSearch])

  return (
    <div className="m-2 flex-col items-start grow min-w-[200px] max-[620px]:w-auto">
      <input 
        type="text"
        className="h-12 block min-h-[auto] w-full placeholder-gray rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none"
        placeholder="Lugar, ciudad, actividad..."
        value={inputSearch}
        onChange={handleChange}
      />
      {isDropdownOpen && (
        <ul className="rounded absolute p-0 border-0 w-40 bg-white leading-[1.6] max-[620px]:w-auto">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} 
              onClick={() => handleSelect(suggestion)}
              className="rounded p-2 hover:bg-primary-100 cursor-pointer"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
export default SearchInput