/* eslint-disable @typescript-eslint/no-explicit-any */
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { formatCurrency } from "@/lib/formatter";
import { Extra, Size } from "@prisma/client";
import { ProductWithRelations } from "@/types/product";

export const Sizes = ({
  size,
  items,
}: {
  size: Size[];
  items: ProductWithRelations;
}) => {
  return (
    <div className="">
      <RadioGroup defaultValue="comfortable">
        {size.map((item: any) => (
          <div className="flex items-center space-x-2" key={item?.id}>
            <RadioGroupItem
              value={item?.id.toString()}
              id={item?.id.toString()}
            />
            <Label htmlFor={item?.id.toString()}>
              {item.name} {formatCurrency(item?.price + items?.basePrice)}
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
}: {
  extra: Extra[];
  items: ProductWithRelations;
}) => {
  return (
    <div>
      {extra?.map((item: any) => (
        <>
          <div className="flex items-center space-x-2 my-4">
            <Checkbox id={item?.id} />
            <label
              htmlFor={item?.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              {item?.name} {formatCurrency(item?.price + items?.basePrice)}
            </label>
          </div>
        </>
      ))}
    </div>
  );
};
