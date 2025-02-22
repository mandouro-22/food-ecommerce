import MainHeading from "@/components/main-heading";
import Menu from "@/components/menu/menu";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { getDictionary } from "@/lib/translation";
import { getBestSellers } from "@/server/db/product";

export default async function BestSellers() {
  const bestSellers = await getBestSellers(3);
  const locale = await getCurrentLocale();
  const { home } = await getDictionary(locale);
  const { bestSeller } = home;
  return (
    <section>
      <div className="container">
        <div className="text-center mb-4">
          <MainHeading
            subTitle={bestSeller.checkOut}
            title={bestSeller.OurBestSellers}
          />
        </div>
        <Menu bestSellers={bestSellers} />
      </div>
    </section>
  );
}
