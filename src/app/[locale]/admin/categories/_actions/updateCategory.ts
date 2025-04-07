"use server";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import { getDictionary } from "@/lib/translation";
import { updateCategoriesSchema } from "@/validation/categories";
import { revalidatePath } from "next/cache";

export const updateCategory = async (
  id: string,
  _prevState: unknown,
  formData: FormData
) => {
  const locale = await getCurrentLocale();
  const translations = await getDictionary(locale);
  const result = updateCategoriesSchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success)
    return {
      status: 400,
      error: result.error.formErrors.fieldErrors,
    };

  const data = result.data;

  try {
    await db.category.update({
      where: {
        id: id,
      },
      data: {
        name: data.categoryName,
      },
    });

    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.CATEGORIES}`);
    revalidatePath(`/${locale}/${Routes.MENU}`);

    return {
      status: 200,
      message: translations.messages.updatecategorySucess,
    };
  } catch (error) {
    console.error("Error in Update Category ❌" + error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
};
