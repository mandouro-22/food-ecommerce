import About from "@/components/about/about";
import BestSellers from "./_components/bestSellers";
import Hero from "./_components/Hero";
import Contact from "@/components/contact/contact";
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
