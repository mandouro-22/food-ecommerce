"use server";

import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import { getDictionary } from "@/lib/translation";
import { revalidatePath } from "next/cache";

export const deleteCategory = async (id: string) => {
  const locale = await getCurrentLocale();
  const translations = await getDictionary(locale);

  try {
    await db.category.delete({
      where: {
        id: id,
      },
    });

    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);

    return {
      status: 200,
      message: translations.messages.deleteCategorySucess,
    };
  } catch (error) {
    console.error("Error in Delete Category ❌ " + error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};
