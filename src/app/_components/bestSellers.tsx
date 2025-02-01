import MainHeading from "@/components/main-heading";
import Menu from "@/components/menu/menu";
import { db } from "@/lib/prisma";

export default async function BestSellers() {
  const bestSellers = await db.product.findMany({
    include: {
      sizes: true,
      extras: true,
    },
  });
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
