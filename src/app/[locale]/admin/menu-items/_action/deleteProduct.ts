"use server";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import { getDictionary } from "@/lib/translation";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: string) {
  const locale = await getCurrentLocale();
  const translations = await getDictionary(locale);
  try {
    await db.product.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/${locale}/${Routes.MENU}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${id}/${Pages.EDIT}`
    );
    revalidatePath(`/${locale}`);

    return {
      status: 200,
      message: translations.messages.deleteProductSucess,
    };
  } catch (error) {
    console.log("Error in Delete product in the server" + error);
    return {
      status: 500,
      error: translations.messages.unexpectedError,
    };
  }
}
