"use server";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import { getDictionary } from "@/lib/translation";
import { updateProfileSchema } from "@/validation/profile";
import { getImageURL } from "./getImageURL";
import { revalidatePath } from "next/cache";
import { Pages, Routes } from "@/constants/enums";
import { UserRole } from "@prisma/client";

export async function ProfileFields(
  isAdmin: boolean,
  _prevState: unknown,
  formdata: FormData
) {
  const locale = await getCurrentLocale();
  const translations = await getDictionary(locale);

  const result = updateProfileSchema(translations).safeParse(
    Object.fromEntries(formdata.entries())
  );

  if (!result.success) {
    return {
      error: result.error.formErrors.fieldErrors,
      formData: formdata,
    };
  }

  const data = result.data;
  const imageFile = data.image as File;
  const imageURL = Boolean(imageFile.size)
    ? await getImageURL(imageFile)
    : undefined;

  try {
    const user = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return {
        message: translations.messages.userNotFound,
        status: 404,
        formdata,
      };
    }

    await db.user.update({
      where: {
        email: data.email,
      },
      data: {
        ...data,
        image: imageURL ?? user.image,
        role: isAdmin ? UserRole.ADMIN : UserRole.USER,
      },
    });
    revalidatePath(`/${locale}/${Routes.PROFILE}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.USERS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`
    );
    return {
      status: 200,
      message: translations.messages?.updateProfileSucess,
    };
  } catch (error) {
    console.error("Error in profile update ❌ " + error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
}
