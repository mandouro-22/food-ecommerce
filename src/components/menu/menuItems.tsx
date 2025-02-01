import { formatCurrency } from "@/lib/formatter";
import Image from "next/image";
import AddToCard from "./AddToCard";
import { ProductWithRelations } from "@/types/product";

export default function MenuItems({ item }: { item: ProductWithRelations }) {
  return (
    <li>
      <div className="p-4 bg-white shadow-md rounded-lg">
        <div className="py-4">
          <Image src={item?.image} alt={item?.name} width={300} height={50} />
        </div>
        <div className="flex items-center justify-between my-2">
          <h3 className="text-xl font-medium">{item?.name}</h3>
          <span className="text-lg font-bold text-red-500">
            {formatCurrency(item?.basePrice)}
          </span>
        </div>
        <p className="text-sm text-gray-500">{item?.description}</p>
        <AddToCard item={item} />
      </div>
    </li>
  );
}
