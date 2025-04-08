import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Translation } from "@/types/Translation";
import { Extra, ExtraIngredients, productSizes, Size } from "@prisma/client";
import { Plus, Trash2 } from "lucide-react";
import React from "react";
import SelectName from "./SelectName";
import { Input } from "@/components/ui/input";
import { handleOptions } from "./handleOptions";
import { ItemOptionsKeys } from "../Form";

const SizeName = [productSizes.SMALL, productSizes.MEDIUM, productSizes.LARGE];
const ExtraName = [
  ExtraIngredients.CHEESE,
  ExtraIngredients.BREAD,
  ExtraIngredients.TOMATO,
  ExtraIngredients.ONION,
  ExtraIngredients.PEPPER,
];

export function ItemsOptions({
  state,
  setState,
  translations,
  optionKey,
}: {
  state: Partial<Size>[] | Partial<Extra>[];
  setState:
    | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
    | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
  translations: Translation;
  optionKey: ItemOptionsKeys;
}) {
  const { handleAddOption, handleOnChange, handleRemoveOption } =
    handleOptions(setState);

  const getNames = () => {
    switch (optionKey) {
      case ItemOptionsKeys.SIZES: {
        const filterSizes = SizeName.filter(
          (size) => !state.some((s) => s.name === size)
        );
        return filterSizes;
      }
      case ItemOptionsKeys.EXTRAS: {
        const filterExtras = ExtraName.filter(
          (extra) => !state.some((e) => e.name === extra)
        );
        return filterExtras;
      }
      default:
        return [];
    }
  };

  const isThereAvailableOptions = () => {
    switch (optionKey) {
      case ItemOptionsKeys.SIZES:
        return SizeName.length > state.length;

      case ItemOptionsKeys.EXTRAS:
        return ExtraName.length > state.length;
    }
  };

  return (
    <>
      {/* fetch add option */}
      {state.length > 0 && (
        <ul>
          {state.map((items, index) => {
            return (
              <li
                key={index}
                className={`flex  gap-2 mb-4 items-end ${
                  state.length > 1
                    ? "border border-gray-300 p-2 rounded-lg"
                    : ""
                }`}
              >
                <div className="basis-1/2 space-y-1">
                  <Label>Name</Label>
                  <SelectName
                    items={items}
                    onchange={handleOnChange}
                    index={index}
                    setState={setState}
                    getNames={getNames}
                  />
                </div>
                <div className="flex-1 basis-1/3 space-y-1">
                  <Label>Extra Price</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    onChange={(e) => handleOnChange(e, index, "price")}
                    min={0}
                    name="price"
                    className="bg-white focus:!ring-0"
                  />
                </div>
                <div className="self-end">
                  {/* todo: add function to make hidden the button */}
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="mt-1"
                    onClick={() => handleRemoveOption(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {isThereAvailableOptions() && (
        <Button
          type="button"
          variant={"outline"}
          className="text-center w-full"
          onClick={() => handleAddOption()}
        >
          <Plus />
          {optionKey === ItemOptionsKeys.SIZES
            ? translations.admin.menuItems.addItemSize
            : translations.admin.menuItems.addExtraItem}
        </Button>
      )}
    </>
  );
}
