import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { getDictionary } from "@/lib/translation";
import { Category } from "@prisma/client";
import React from "react";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";

export default async function CategoryItems({
  category,
}: {
  category: Category;
}) {
  const locale = await getCurrentLocale();
  const translations = await getDictionary(locale);
  return (
    <li className="bg-gray-300 p-4 rounded-md flex justify-between">
      <h3 className="text-black font-medium text-lg flex-1">{category.name}</h3>
      <div className="flex items-center gap-2">
        <EditCategory translations={translations} category={category} />
        <DeleteCategory id={category.id} />
      </div>
    </li>
  );
}
