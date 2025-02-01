import BestSellers from "./_components/bestSellers";
import Hero from "./_components/Hero";

export default async function Home() {
  return (
    <main>
      <Hero />
      <BestSellers />
    </main>
  );
}
