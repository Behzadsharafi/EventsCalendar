import Link from "next/link";
import ProductCard from "./components/ProductCard";
import Calendar from "./components/Calendar";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        {" "}
        <title>fsdsdffsd</title>{" "}
      </Head>
      <main className="flex flex-col items-center ">
        <Calendar />
      </main>
    </>
  );
}
