import About from "@/components/about/about";
import Contact from "@/components/contact/contact";
import Hero from "./_components/Hero";
import BestSellers from "./_components/bestSellers";

export default async function Home() {
  return (
    <main>
      <Hero />
      <BestSellers />
      <About />
      <Contact />
    </main>
  );
}
