"use client";
import FormFields from "@/components/formFields/formFields";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { Pages, Routes } from "@/constants/enums";
import { toast } from "@/hooks/use-toast";
import { useFormFields } from "@/hooks/useFormFields";
import { signup } from "@/server/_action/auth";
import { IFormField } from "@/types/app";
import { Translation } from "@/types/Translation";
import { ValidationError } from "@/validation/auth";
import { useParams, useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";

const initialState: {
  message?: string;
  error?: ValidationError;
  status?: number | null;
  formData?: FormData | null;
} = {
  message: "",
  error: {},
  status: null,
  formData: null,
};

export default function Form({ translate }: { translate: Translation }) {
  const { locale } = useParams();
  const [state, action, pending] = useActionState(signup, initialState);
  const { getFormFields } = useFormFields({ slug: Pages.Register, translate });

  const route = useRouter();
  useEffect(() => {
    if (state?.status && state?.message) {
      toast({
        title: state?.message,
        className:
          state?.status === 201 ? "text-green-600" : "text-destructive",
      });
    }

    if (state?.status === 201) {
      route.replace(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
    }
  }, [locale, route, state?.status, state?.message]);

  return (
    <form action={action}>
      {getFormFields().map((fields: IFormField) => {
        const fieldValue = state.formData?.get(fields.name);
        return (
          <div className="mb-3" key={fields.id}>
            {
              <FormFields
                {...fields}
                error={state?.error}
                defaultValue={typeof fieldValue === "string" ? fieldValue : ""}
              />
            }
          </div>
        );
      })}
      <div className="flex items-center justify-center w-full">
        <Button className="w-full" type="submit" disabled={pending}>
          {pending ? <Loader /> : translate.auth.login.submit}
        </Button>
      </div>
    </form>
  );
}
