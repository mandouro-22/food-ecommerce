import MainHeading from "@/components/main-heading";
import Menu from "@/components/menu/menu";
import { getBestSellers } from "@/server/db/product";

export default async function BestSellers() {
  const bestSellers = await getBestSellers(3);

  console.log(bestSellers);
  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <MainHeading subTitle={"Check Out"} title={"Our Best Sellers"} />
        </div>
        <Menu bestSellers={bestSellers} />
      </div>
    </section>
  );
}
