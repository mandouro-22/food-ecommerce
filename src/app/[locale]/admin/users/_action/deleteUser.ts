"use server";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import { getDictionary } from "@/lib/translation";
import { revalidatePath } from "next/cache";

export async function DeleteUser(userId: string) {
  const locale = await getCurrentLocale();
  const translations = await getDictionary(locale);

  try {
    await db.user.delete({
      where: {
        id: userId,
      },
    });

    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.USERS}/${userId}/${Pages.EDIT}`
    );

    return {
      status: 200,
      message: translations.messages.deleteUserSucess,
    };
  } catch (error) {
    console.error("error in delete user in the server", error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
}
