import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { CreateEventDTO, EventType, UpdateEventDTO } from "../utils/interfaces";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { EventsContext } from "../context/EventsContextProvider";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
} from "../services/event-service";
import Timer from "./Timer";

interface props {
  date: Date;
  event?: EventType | null;
  setShowModal?: (showModal: boolean) => any;
  showModal?: boolean;
  setShowEdit?: (showEdit: boolean) => any;
  showEdit?: boolean;
  setEvent?: Dispatch<SetStateAction<EventType | null>>;
}

const EventForm = ({ date, event }: props) => {
  const [dateError, setDateError] = useState("");
  const {
    events,
    setEvents,
    setEvent,
    setShowEdit,
    showEdit,
    setShowEvent,
    showEvent,
    setShowForm,
  } = useContext(EventsContext);

  const formatDateTime = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const getDefaultValue = (
    fieldName: keyof UpdateEventDTO | keyof CreateEventDTO,
    manualDefault: string | number | null | undefined = undefined,
  ) => {
    if (event) {
      const value = event[fieldName];
      if (value === null) return null;
      else if (typeof value === "object" && value instanceof Date) {
        return formatDateTime(value as Date);
      }
      return value;
    } else return manualDefault;
  };

  const schema = z.object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Title must contain at least 2 characters" }),
    startDate: z.string().min(1, { message: "Start date is required" }),
    endDate: z.string().min(1, { message: "End date is required" }),
    location: z.string().trim().min(1, { message: "Location cannot be empty" }),
    label: z.string().trim().min(1, { message: "Label cannot be empty" }),
  });

  interface FormData extends z.infer<typeof schema> {}

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      name: getDefaultValue("name") as string,
      startDate: getDefaultValue(
        "startDate",
        formatDateTime(new Date(date)),
      ) as string,
      endDate: getDefaultValue(
        "endDate",
        formatDateTime(new Date(date)),
      ) as string,
      location: getDefaultValue("location") as string,
      label: getDefaultValue("label") as string,
    },
    resolver: zodResolver(schema),
  });

  const formSubmit = async (data: FormData) => {
    const startDate = new Date(data.startDate);
    const endDate = new Date(data.endDate);
    if (startDate.getTime() < new Date().getTime()) {
      setDateError("The event cannot be in the past");
      return;
    }
    if (startDate.getTime() > endDate.getTime()) {
      setDateError("Start Date cannot be after End Date");
      return;
    }
    if (event) {
      const id = event.id;
      const toUpdateData: UpdateEventDTO = {
        ...data,
        startDate: startDate,
        endDate: endDate,
      };
      await updateEventById(id, toUpdateData);

      await getEventById(id).then((event) => setEvent(event));

      await getAllEvents().then((events) => {
        setEvents(events);
      });

      setShowEdit(!showEdit);
      setShowEvent(!showEvent);
    } else {
      const newEvent: CreateEventDTO = {
        ...data,
        startDate: startDate,
        endDate: endDate,
      };
      await createEvent(newEvent);
      await getAllEvents().then((events) => {
        setEvents(events);
      });
      setShowForm(false);
    }

    reset();
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(formSubmit)}>
      <div className="flex flex-col ">
        <label htmlFor="name">Title:</label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="rounded-md border border-solid border-gray-400 px-2  text-base-content focus:border-gray-500 focus:outline-none"
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="startDate">Start Date</label>
        <input
          className="text-base-content"
          id="startDate"
          type="datetime-local"
          {...register("startDate")}
        />

        {dateError && <p className="text-red-500">{dateError}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="endDate">End Date</label>
        <input
          className="text-base-content"
          id="endDate"
          type="datetime-local"
          {...register("endDate")}
        />
        {dateError && <p className="text-red-500">{dateError}</p>}
      </div>
      <div className="flex flex-col">
        <label htmlFor="location">Location:</label>
        <input
          id="location"
          type="text"
          {...register("location")}
          className="rounded-md border border-solid border-gray-400 px-2  text-base-content focus:border-gray-500 focus:outline-none"
        />
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="label">Label:</label>
        <input
          id="label"
          type="text"
          {...register("label")}
          className="rounded-md border border-solid border-gray-400 px-2  text-base-content focus:border-gray-500 focus:outline-none"
        />
        {errors.label && <p className="text-red-500">{errors.label.message}</p>}
      </div>
      <button className="btn" type="submit">
        Save
      </button>
    </form>
  );
};

export default EventForm;
