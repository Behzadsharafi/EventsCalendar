import Link from "next/link";
import ProductCard from "./components/ProductCard";
import Calendar from "./components/Calendar";
import Head from "next/head";
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
