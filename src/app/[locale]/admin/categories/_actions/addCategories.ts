"use server";

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import { getDictionary } from "@/lib/translation";
import { addCategorySchema } from "@/validation/categories";
import { revalidatePath } from "next/cache";

export async function addCategories(_prevState: unknown, formData: FormData) {
  const locale = await getCurrentLocale();
  const translations = await getDictionary(locale);
  const result = addCategorySchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success)
    return {
      status: 400,
      error: result.error.formErrors.fieldErrors,
    };

  const data = result.data;

  try {
    await db.category.create({
      data,
    });

    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);

    return {
      status: 201,
      message: translations.messages.categoryAdded,
    };
  } catch (error) {
    console.error("Error in Add Categories ❌ " + error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
}
