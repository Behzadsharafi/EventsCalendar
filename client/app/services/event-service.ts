import {
  CreateEventDTO,
  EventType,
  UpdateEventDTO,
} from "./../utils/interfaces";

// const hostDomain = `http://localhost:8080/`;
const hostDomain = `https://zadcalendar.store/`;

export const getAllEvents = async (): Promise<EventType[]> => {
  const response = await fetch(`${hostDomain}events`);

  if (!response.ok) {
    throw new Error("Could not get events");
  }

  const data = await response.json();

  data.map((item: any): EventType => {
    item.startDate = new Date(item.startDate);
    item.endDate =
      item.endDate !== null && item.endDate !== undefined
        ? new Date(item.endDate)
        : null;
    return item;
  });

  return data;
};

export const createEvent = async (data: CreateEventDTO): Promise<void> => {
  const response = await fetch(`${hostDomain}events`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(`Cannot create new event because ${errorJson.message}`);
  }
};

export const updateEventById = async (
  id: EventType["id"],
  data: UpdateEventDTO,
): Promise<void> => {
  const response = await fetch(`${hostDomain}events/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Could not update event ${id}`);
  }
};

export const getEventById = async (id: EventType["id"]): Promise<EventType> => {
  const response = await fetch(`${hostDomain}events/${id}`);
  if (!response.ok) {
    throw new Error(`Event with id : ${id} does not exist`);
  }
  const event: EventType = await response.json();
  event.startDate = new Date(event.startDate);
  event.endDate = new Date(event.endDate);
  return event;
};

export const deleteEventById = async (id: EventType["id"]): Promise<void> => {
  const response = await fetch(`${hostDomain}events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete event");
  }
};
