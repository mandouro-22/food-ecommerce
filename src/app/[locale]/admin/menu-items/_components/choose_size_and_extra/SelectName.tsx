"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages } from "@/constants/enums";
import { Extra, ExtraIngredients, productSizes, Size } from "@prisma/client";
import { useParams } from "next/navigation";

type HandleChangeProps = {
  items: Partial<Size> | Partial<Extra>;
  onchange: (
    e: string | number | React.ChangeEvent<HTMLInputElement>,
    index: number,
    fieldName: "id" | "name" | "price" | "productId",
    setState:
      | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
      | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>
  ) => void;
  index: number;
  setState:
    | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;

  getNames: () => productSizes[] | ExtraIngredients[];
};

export default function SelectName({
  items,
  onchange,
  index,
  setState,
  getNames,
}: HandleChangeProps) {
  const { locale } = useParams();

  const name = getNames();

  return (
    <Select
      onValueChange={(value) => {
        onchange(value, index, "name", setState);
      }}
      defaultValue={items.name ? items.name : "Select..."}
    >
      <SelectTrigger
        className={` bg-white border-none mb-4 focus:ring-0 ${
          locale === Languages.ARABIC ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <SelectValue>{items.name ? items.name : "Select..."}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="bg-background text-accent z-50">
          {name.map((size, index) => {
            return (
              <SelectItem
                key={index}
                value={size}
                className="hover:!bg-primary hover:!text-white !text-accent !bg-transparent"
              >
                {size}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
