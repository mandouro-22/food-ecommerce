"use client";

import { useActionState, useEffect, useState } from "react";
import { UploadImage } from "./uploadImage";
import { Translation } from "@/types/Translation";
import { useFormFields } from "@/hooks/useFormFields";
import { Pages, Routes } from "@/constants/enums";
import { IFormField } from "@/types/app";
import FormFields from "@/components/formFields/formFields";
import FormAction from "./FormAction";
import SelectCategory from "./SelectCategory";
import { Category, Extra, Size } from "@prisma/client";
import AddSize from "./choose_size_and_extra/Size";
import AddExtra from "./choose_size_and_extra/Extra";
import { ValidationError } from "@/validation/auth";
import { addProduct } from "../_action/product";
import { toast } from "@/hooks/use-toast";
import { ProductWithRelations } from "@/types/product";
import { updateProduct } from "../_action/updateProduct";

export enum ItemOptionsKeys {
  SIZES,
  EXTRAS,
}

interface InitialStateProps {
  message?: string;
  error?: ValidationError;
  status?: number | null;
  formData?: FormData | null;
}

const initialState: InitialStateProps = {
  message: "",
  error: {},
  status: 0,
  formData: null,
};

export default function Form({
  translations,
  categories,
  product,
}: {
  translations: Translation;
  categories: Category[];
  product?: ProductWithRelations;
}) {
  const [selectedImage, setSelectedImage] = useState(
    product ? product.image : ""
  );
  const [categoryId, setCategoryId] = useState(
    product ? product.categoryId : categories[0].id
  );
  const [sizes, setSizes] = useState<Partial<Size>[]>(
    product ? product?.sizes : []
  );
  const [extras, setExtras] = useState<Partial<Extra>[]>(
    product ? product?.extras : []
  );

  console.log(sizes, extras);

  const { getFormFields } = useFormFields({
    slug: `${Routes.ADMIN}/${Pages.MENU_ITEMS}`,
    translate: translations,
  });

  // form data
  const formData = new FormData();
  Object.entries(product ? product : {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && key !== "image") {
      formData.append(key, value.toString());
    }
  });

  // Both functions receive the current form state and FormData as arguments.
  const handleFormAction = async (
    _prevState: unknown,
    formData: FormData
  ): Promise<InitialStateProps> => {
    if (product) {
      return await updateProduct(
        { productId: product.id, options: { sizes, extras } },
        _prevState,
        formData
      );
    } else {
      return await addProduct(
        { categoryId, options: { sizes, extras } },
        _prevState,
        formData
      );
    }
  };

  const [state, action, pending] = useActionState(
    handleFormAction,
    initialState
  );

  useEffect(() => {
    if (state.message && state.status && !pending) {
      toast({
        title: state.message,
        className:
          state.status === 201 || state.status === 200
            ? "text-green-400"
            : "text-destructive",
      });
    }
  }, [pending, state.message, state.status]);

  return (
    <form action={action} className="my-6 flex flex-col md:flex-row gap-10">
      <div>
        <UploadImage
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
        />
        {state?.error?.image && (
          <p className="text-sm text-destructive text-center mt-4 font-medium">
            {state.error?.image}
          </p>
        )}
      </div>
      <div className="w-full">
        {getFormFields().map((fields: IFormField) => {
          const fieldValue =
            state.formData?.get(fields.name) ?? formData.get(fields.name);
          return (
            <div key={fields.id} className="mb-3">
              <FormFields
                {...fields}
                error={state.error}
                defaultValue={fieldValue as string}
              />
            </div>
          );
        })}
        <SelectCategory
          categories={categories}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          translation={translations}
        />

        <AddSize
          sizes={sizes}
          setSizes={setSizes}
          translations={translations}
        />

        <AddExtra
          extra={extras}
          setExtra={setExtras}
          translations={translations}
        />
        <div>
          <FormAction
            translation={translations}
            pending={pending}
            product={product}
          />
        </div>
      </div>
    </form>
  );
}
