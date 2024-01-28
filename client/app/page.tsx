import Calendar from "./components/Calendar";
import EventsContextProvider from "./context/EventsContextProvider";
import wallpaper from "../public/Wallpaper.jpg";

export default function Home() {
  return (
    <EventsContextProvider>
      <main className="bg- flex flex-col items-center">
        <Calendar />
      </main>
    </EventsContextProvider>
  );
}
