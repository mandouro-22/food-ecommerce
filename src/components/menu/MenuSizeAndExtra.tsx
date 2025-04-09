import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { formatCurrency } from "@/lib/formatter";
import { Extra, Size } from "@prisma/client";
import { ProductWithRelations } from "@/types/product";
import React from "react";

export const Sizes = ({
  size,
  items,
  selectedSize,
  setSelectedSize,
}: {
  size: Size[];
  items: ProductWithRelations;
  selectedSize: Size;
  setSelectedSize: React.Dispatch<React.SetStateAction<Size>>;
}) => {
  return (
    <div className="my-4">
      <RadioGroup defaultValue="comfortable">
        {size.map((item: Size) => (
          <div className="flex items-center space-x-2 my-1" key={item?.id}>
            <RadioGroupItem
              value={selectedSize?.name}
              id={item?.id.toString()}
              checked={selectedSize?.id === item?.id}
              onClick={() => setSelectedSize(item)}
            />
            <Label htmlFor={item?.id.toString()}>
              {item?.name} {formatCurrency(item?.price + items?.basePrice)}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
export const Extras = ({
  extra,
  items,
  selectedExtras,
  setSelectedExtras,
}: {
  extra: Extra[];
  items: ProductWithRelations;
  selectedExtras: Extra[];
  setSelectedExtras: React.Dispatch<React.SetStateAction<Extra[]>>;
}) => {
  const handleExtra = (extra: Extra) => {
    if (selectedExtras.find((e) => e.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((e) => e.id !== extra.id));
    } else {
      setSelectedExtras((prev) => [...prev, extra]);
    }
  };

  return (
    <div>
      {extra?.map((item: Extra) => (
        <>
          <div className="flex items-center space-x-2 my-4">
            <Checkbox
              id={item?.id}
              checked={Boolean(selectedExtras.find((e) => e.id === item.id))}
              onClick={() => handleExtra(item)}
            />
            <label
              htmlFor={item?.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item?.name} {formatCurrency(item?.price + items?.basePrice)}
            </label>
          </div>
        </>
      ))}
    </div>
  );
};
