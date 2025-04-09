"use server";
import { getImageURL } from "@/components/edit-user-form/_actions/getImageURL";
import { Pages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { db } from "@/lib/prisma";
import { getDictionary } from "@/lib/translation";
import { updateProductSchema } from "@/validation/product";
import { Extra, ExtraIngredients, productSizes, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateProduct(
  args: {
    productId: string;
    options: { sizes: Partial<Size>[]; extras: Partial<Extra>[] };
  },
  _prevState: unknown,
  formData: FormData
) {
  const locale = await getCurrentLocale();
  const translation = await getDictionary(locale);
  const result = updateProductSchema(translation).safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!result.success) {
    return {
      status: 400,
      error: result.error.formErrors.fieldErrors,
    };
  }

  const data = result.data;
  const basePrice = Number(data.basePrice);
  const imageFile = data.image as File;
  const imageURL = Boolean(imageFile)
    ? await getImageURL(imageFile, "product_image")
    : undefined;

  const product = await db.product.findUnique({
    where: {
      id: args.productId,
    },
  });

  if (!product) {
    return {
      status: 400,
      message: translation.messages.unexpectedError,
    };
  }

  try {
    const updateProduct = await db.product.update({
      where: {
        id: args.productId,
      },
      data: {
        ...data,
        basePrice,
        image: imageURL ?? product.image,
      },
    });

    await db.size.deleteMany({
      where: {
        productId: args.productId,
      },
    });

    await db.size.createMany({
      data: args.options.sizes.map((size) => ({
        productId: args.productId,
        name: size.name as productSizes,
        price: Number(size.price),
      })),
    });

    await db.extra.deleteMany({
      where: {
        productId: args.productId,
      },
    });

    await db.extra.createMany({
      data: args.options.extras.map((extra) => ({
        productId: args.productId,
        name: extra.name as ExtraIngredients,
        price: Number(extra.price),
      })),
    });

    revalidatePath(`/${locale}/${Routes.MENU}`);
    revalidatePath(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
    revalidatePath(
      `/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}/${updateProduct.id}/${Pages.EDIT}`
    );
    revalidatePath(`/${locale}`);

    return {
      status: 200,
      message: translation.messages.updateProductSucess,
    };
  } catch (error) {
    console.error("Error in update product in server", error);
    return {
      status: 500,
      message: translation.messages.unexpectedError,
    };
  }
}
