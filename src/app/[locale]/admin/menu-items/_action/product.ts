"use server";

import { getImageURL } from "@/components/edit-user-form/_actions/getImageURL";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import { getDictionary } from "@/lib/translation";
import { addProductSchema } from "@/validation/product";
import { Extra, ExtraIngredients, productSizes, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function addProduct(
  args: {
    categoryId: string;
    options: { sizes: Partial<Size>[]; extras: Partial<Extra>[] };
  },
  _prevState: unknown,
  formData: FormData
) {
  const locale = await getCurrentLocale();
  const translations = await getDictionary(locale);
  const result = addProductSchema(translations).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success)
    return {
      status: 400,
      error: result.error.formErrors.fieldErrors,
      formData,
    };

  const data = result.data;

  const basePrice = Number(data.basePrice);
  const imageFile = data.image as File;
  const imageURL = Boolean(imageFile)
    ? await getImageURL(imageFile, "product_image")
    : undefined;

  try {
    if (imageURL) {
      await db.product.create({
        data: {
          ...data,
          image: imageURL,
          basePrice,
          categoryId: args.categoryId,
          sizes: {
            createMany: {
              data: args.options.sizes.map((size) => ({
                name: size.name as productSizes,
                price: Number(size.price),
              })),
            },
          },
          extras: {
            createMany: {
              data: args.options.extras.map((extra) => ({
                name: extra.name as ExtraIngredients,
                price: Number(extra.price),
              })),
            },
          },
        },
      });
      revalidatePath(`/${locale}/${Routes.MENU}`);
      revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
      revalidatePath(`/${locale}`);
      return {
        status: 201,
        message: translations.messages.productAdded,
      };
    }

    return {};
  } catch (error) {
    console.error("Error in Add Product with Server", error);
    return {
      status: 500,
      message: translations.messages.unexpectedError,
    };
  }
}
