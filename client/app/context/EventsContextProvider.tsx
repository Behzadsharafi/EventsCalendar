"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { EventType } from "../utils/interfaces";
import { dummyEvents } from "../data/events";

interface EventsContextType {
  events: EventType[];
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  showEvent: boolean;
  setShowEvent: React.Dispatch<React.SetStateAction<boolean>>;
  showEdit: boolean;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  event: EventType | null;
  setEvent: React.Dispatch<React.SetStateAction<EventType | null>>;
  filterType: string | null;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
  filterValue: string | null;
  setFilterValue: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (filterType: string, filterValue: string) => void;
}

interface EventsContextProviderProps {
  children: ReactNode;
}

export const EventsContext = createContext<EventsContextType>({
  events: [],
  setEvents: () => {},
  showForm: false,
  setShowForm: () => {},
  showEvent: false,
  setShowEvent: () => {},
  showEdit: false,
  setShowEdit: () => {},
  event: null,
  setEvent: () => {},
  filterType: null,
  setFilterType: () => {},
  filterValue: null,
  setFilterValue: () => {},
  handleSearch: () => {},
});

const EventsContextProvider: React.FC<EventsContextProviderProps> = ({
  children,
}) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [event, setEvent] = useState<EventType | null>(null);
  const [filterType, setFilterType] = useState("location");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    // if (filterType && filterValue) {
    // setEvents(
    //   dummyEvents.filter(
    //     (event) =>
    //       event[filterType as keyof EventType].toString().toLowerCase() ===
    //       filterValue.toLowerCase(),
    //   ),
    // );
    // } else {
    //   setEvents(dummyEvents);
    // }
    // if (filterValue === "") {
    setEvents(dummyEvents);
    // }
  }, []);

  const handleSearch = (filterType: string, filterValue: string) => {
    setEvents(
      dummyEvents.filter(
        (event) =>
          event[filterType as keyof EventType].toString().toLowerCase() ===
          filterValue.toLowerCase(),
      ),
    );
  };

  const eventsContext: EventsContextType = {
    events,
    setEvents,
    showForm,
    setShowForm,
    showEvent,
    setShowEvent,
    showEdit,
    setShowEdit,
    event,
    setEvent,
    filterType,
    setFilterType,
    filterValue,
    setFilterValue,
    handleSearch,
  };

  return (
    <EventsContext.Provider value={eventsContext}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContextProvider;
