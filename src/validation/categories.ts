import * as z from "zod";
import { Translation } from "@/types/Translation";

export const addCategorySchema = (translations: Translation) => {
  return z.object({
    name: z.string().trim().min(1, {
      message: translations.admin.categories.form.name.validation.required,
    }),
  });
};

export const updateCategoriesSchema = (translations: Translation) => {
  return z.object({
    categoryName: z.string().trim().min(1, {
      message: translations.admin.categories.form.name.validation.required,
    }),
  });
};
