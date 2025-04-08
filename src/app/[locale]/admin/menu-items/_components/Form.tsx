"use client";

import { useState } from "react";
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

// import { useActionState } from "react"
export enum ItemOptionsKeys {
  SIZES,
  EXTRAS,
}

export default function Form({
  translations,
  categories,
}: {
  translations: Translation;
  categories: Category[];
}) {
  // const [state, action, pending] = useActionState();
  const [selectedImage, setSelectedImage] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [sizes, setSizes] = useState<Partial<Size>[]>([]);
  const [extras, setExtras] = useState<Partial<Extra>[]>([]);
  const { getFormFields } = useFormFields({
    slug: `${Routes.ADMIN}/${Pages.MENU_ITEMS}`,
    translate: translations,
  });
  return (
    <form action="" className="my-6 flex flex-col md:flex-row gap-10">
      <UploadImage
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
      />
      <div className="w-full">
        {getFormFields().map((fields: IFormField) => {
          // const fieldValue = state
          return (
            <div key={fields.id} className="mb-3">
              <FormFields
                {...fields}
                error={{}}
                // defaultValue={}
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
          <FormAction translation={translations} />
        </div>
      </div>
    </form>
  );
}
