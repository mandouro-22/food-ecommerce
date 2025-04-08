/* eslint-disable @typescript-eslint/no-explicit-any */
import { Extra, Size } from "@prisma/client";
import { ChangeEvent } from "react";

type CommonItem =
  | React.Dispatch<React.SetStateAction<Partial<Size>[]>>
  | React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
type ValueType = string | number | ChangeEvent<HTMLInputElement>;

export function handleOptions(setState: CommonItem) {
  const handleAddOption = () => {
    setState((prev: any) => [...prev, { name: "", price: 0 }]);
  };

  const handleOnChange = (e: ValueType, index: number, fieldName: string) => {
    const newValue =
      typeof e === "object" && "target" in e
        ? e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value
        : e;

    setState((prev: any) => {
      const updated = [...prev];
      if (!updated[index]) return prev;

      updated[index] = {
        ...updated[index],
        [fieldName]: newValue,
      };
      return updated;
    });
  };

  const handleRemoveOption = (indexToRemove: number) => {
    setState((prev: any[]) =>
      prev.filter((_: any, index: number) => index !== indexToRemove)
    );
  };

  return {
    handleAddOption,
    handleOnChange,
    handleRemoveOption,
  };
}
