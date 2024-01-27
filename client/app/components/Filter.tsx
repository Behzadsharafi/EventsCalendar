import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import { EventsContext } from "../context/EventsContextProvider";
import { dummyEvents } from "../data/events";
import { getAllEvents } from "../services/event-service";

const Filter = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const {
    filterType,
    setFilterType,
    filterValue,
    setFilterValue,
    handleSearch,
    setEvents,
    events,
  } = useContext(EventsContext);

  const onSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log(filterType, filterValue);
    if (filterType !== null && filterValue !== null && filterValue !== "") {
      handleSearch(filterType, filterValue);
    }
  };

  useEffect(() => {
    getAllEvents().then((prevEvents) => {
      // setEvents(prevEvents);

      if (filterType === "label") {
        const labels: string[] = [];
        prevEvents.forEach((event) => {
          if (!labels.includes(event.label)) {
            labels.push(event.label);
          }
          setLabels(labels);
        });
      } else {
        const labels: string[] = [];
        prevEvents.forEach((event) => {
          if (!labels.includes(event.location)) {
            labels.push(event.location);
          }
          setLabels(labels);
        });
      }
    });
  }, [events, filterType]);

  // useEffect(() => {
  //   if (filterValue === "" && filterType !== null) {
  //     setFilterValue("");
  //     setEvents(dummyEvents);
  //   }
  // }, [filterValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const handleSearchChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      <select
        onChange={handleSearchChange2}
        value={filterValue || ""}
        name="filterValue"
        id="filterValue"
        className="rounded-md border border-solid border-gray-400  px-2 focus:border-gray-500 focus:outline-none"
      >
        <option value="">No Filter</option>
        {labels.map((label) => (
          <option key={label} value={label}>
            {label}
          </option>
        ))}
      </select>
      {/* <div className="flex w-40  items-center rounded-md border border-solid border-gray-400  px-2 focus:border-gray-500 ">
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
      </div> */}
    </form>
  );
};

export default Filter;
