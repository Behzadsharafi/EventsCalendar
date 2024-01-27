import Calendar from "./components/Calendar";
import EventsContextProvider from "./context/EventsContextProvider";

export default function Home() {
  return (
    <EventsContextProvider>
      <main className="flex flex-col items-center ">
        <Calendar />
      </main>
    </EventsContextProvider>
  );
}
