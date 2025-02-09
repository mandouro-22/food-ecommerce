import MenuItems from "./menuItems";
import { ProductWithRelations } from "@/types/product";

export default function Menu({
  bestSellers,
}: {
  bestSellers: ProductWithRelations[];
}) {
  return bestSellers?.length > 0 ? (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
      {bestSellers?.map((item: any) => (
        <MenuItems item={item} key={item?.id} />
      ))}
    </ul>
  ) : (
    <p className="text-accent text-center">No Products Found</p>
  );
}
