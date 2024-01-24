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
});

const EventsContextProvider: React.FC<EventsContextProviderProps> = ({
  children,
}) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [event, setEvent] = useState<EventType | null>(null);

  useEffect(() => {
    setEvents(dummyEvents);
  }, []);

  const addEvent = async (data: FormData) => {
    console.log(data);
  };

  const eventsContext: EventsContextType = {
    events: events,
    setEvents: setEvents,
    showForm: showForm,
    setShowForm: setShowForm,
    showEvent: showEvent,
    setShowEvent: setShowEvent,
    showEdit: showEdit,
    setShowEdit: setShowEdit,
    event: event,
    setEvent: setEvent,
  };

  return (
    <EventsContext.Provider value={eventsContext}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContextProvider;
