import { Translation } from "@/types/Translation";
import * as z from "zod";

const imageValidations = (translation: Translation, isRequired: boolean) => {
  return !isRequired
    ? z.custom((value) => value instanceof File)
    : z.custom(
        (val) => {
          if (typeof val !== "object" && !val) {
            return false;
          }
          if (!(val instanceof File)) {
            return false;
          }

          const imageValidationType = ["image/jpeg", "image/png", "image/gif"];
          return imageValidationType.includes(val.type);
        },
        {
          message: translation.admin.menuItems.form.image.validation.required,
        }
      );
};

const getCommonValidations = (translations: Translation) => {
  return {
    name: z.string().min(1, {
      message: translations.admin.menuItems.form.name.validation.required,
    }),
    description: z.string().trim().min(1, {
      message:
        translations.admin.menuItems.form.description.validation.required,
    }),
    basePrice: z.string().min(1, {
      message: translations.admin.menuItems.form.basePrice.validation.required,
    }),
    categoryId: z.string().min(1, {
      message: translations.admin.menuItems.form.category.validation.required,
    }),
  };
};

export const addProductSchema = (translations: Translation) => {
  return z.object({
    ...getCommonValidations(translations),
    image: imageValidations(translations, true),
  });
};
export const updateProductSchema = (translations: Translation) => {
  return z.object({
    ...getCommonValidations(translations),
    image: imageValidations(translations, false),
  });
};
