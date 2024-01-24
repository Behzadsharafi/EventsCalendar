import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { EventsContext } from "../context/EventsContextProvider";
import { dummyEvents } from "../data/events";

const Filter = () => {
  const {
    filterType,
    setFilterType,
    filterValue,
    setFilterValue,
    handleSearch,
    setEvents,
  } = useContext(EventsContext);

  const onSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    if (filterType !== null && filterValue !== null && filterValue !== "") {
      handleSearch(filterType, filterValue);
    }
  };

  useEffect(() => {
    if (filterValue === "" && filterType !== null) {
      setFilterValue("");
      setEvents(dummyEvents);
    }
  }, [filterValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterType(e.target.value);
  };

  return (
    <form className="flex items-center gap-1">
      <FontAwesomeIcon className="w-4 text-red-400 " icon={faFilter} />
      Filter By
      <select
        onChange={handleSelect}
        value={filterType || ""}
        name="filterType"
        id="filterType"
        className="rounded-md border border-solid border-gray-400  px-2 focus:border-gray-500 focus:outline-none"
      >
        <option value="location">Location</option>
        <option value="label">Label</option>
      </select>
      <div className="flex w-40  items-center rounded-md border border-solid border-gray-400  px-2 focus:border-gray-500 ">
        <input
          type="text"
          className="min-w-1 focus:outline-none "
          onChange={handleSearchChange}
          value={filterValue || ""}
        />
        <button
          onClick={onSearch}
          type="submit"
          className=" w-7 transform cursor-pointer transition-all duration-300 hover:scale-110"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className=" w-auto" />
        </button>
      </div>
    </form>
  );
};

export default Filter;
