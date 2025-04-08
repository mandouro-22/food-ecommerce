"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@prisma/client";
import { Translation } from "@/types/Translation";
import { useParams } from "next/navigation";
import { Languages } from "@/constants/enums";
import { Label } from "@/components/ui/label";

export default function SelectCategory({
  translation,
  categories,
  categoryId,
  setCategoryId,
}: {
  translation: Translation;
  categories: Category[];
  categoryId: string;
  setCategoryId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const currentItem = categories.find((value) => value.id === categoryId);
  const { locale } = useParams();
  return (
    <>
      <Label htmlFor="categoryId" className="capitalize text-black block mb-3">
        {translation.category}
      </Label>
      <Select
        value={categoryId}
        onValueChange={(value) => {
          setCategoryId(value);
        }}
      >
        <SelectTrigger
          className={`w-48 h-10 bg-gray-100 border-none mb-4 focus:ring-0 ${
            locale === Languages.ARABIC ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <SelectValue>{currentItem?.name}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map((category) => {
              return (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
