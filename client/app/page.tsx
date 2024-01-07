import Link from "next/link";
import ProductCard from "./components/ProductCard";
import Calendar from "./components/Calendar";

export default function Home() {
  return (
    <main>
      <Link href="/users">Users</Link>
      <ProductCard />
      <Calendar />
    </main>
  );
}
