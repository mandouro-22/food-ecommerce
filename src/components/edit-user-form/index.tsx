"use client";

import { InputTypes, Routes } from "@/constants/enums";
import { useFormFields } from "@/hooks/useFormFields";
import { Translation } from "@/types/Translation";
import { Session } from "next-auth";
import Image from "next/image";
import FormFields from "../formFields/formFields";
import { IFormField } from "@/types/app";
import { useActionState, useEffect, useState } from "react";
import Loader from "../ui/Loader";
import { Button } from "../ui/button";
import { ValidationError } from "@/validation/auth";
import { ProfileFields } from "./_actions/profile";
import UploadImage from "./uploadImage";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
import Checkbox from "../formFields/CheckBoxField";

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

export default function EditUserForm({
  translation,
  user,
}: {
  translation: Translation;
  user?: Session["user"];
}) {
  const [state, action, pending] = useActionState(ProfileFields, initialState);
  const [selectedFile, setSelectedFile] = useState(user?.image || "");
  const [isAdmin, setIsAdmin] = useState(user?.role === UserRole.ADMIN);
  const { getFormFields } = useFormFields({
    slug: Routes.PROFILE,
    translate: translation,
  });
  const session = useSession();

  const formData = new FormData();
  if (user) {
    Object.entries(user).forEach(([Key, value]) => {
      if (value !== null && value !== undefined && Key !== "image") {
        formData.append(Key, value.toString());
      }
    });
  }

  useEffect(() => {
    if (state.message && state.status === 200 && !pending) {
      toast({
        title: state.message,
        className: state.status === 200 ? "text-green-500" : "text-destructive",
      });
    }
  }, [state.message, state.status, pending]);

  // update image
  useEffect(() => {
    setSelectedFile(user?.image as string);
  }, [user?.image]);

  return (
    <form action={action} className="flex flex-col md:flex-row gap-10">
      <div className="group relative w-[200px] h-[200px] overflow-hidden rounded-full mx-auto">
        <Image
          className="rounded-full object-cover"
          src={selectedFile}
          width={200}
          height={200}
          alt={user?.name || "User avatar"}
        />
        <UploadImage
          selectedImage={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      </div>
      <div className="flex-1">
        {getFormFields().map((field: IFormField) => {
          const fieldValue =
            state?.formData?.get(field.name) ?? formData.get(field.name);
          return (
            <div key={field.name} className="mb-3">
              <FormFields
                {...field}
                defaultValue={fieldValue as string}
                error={state?.error}
                readOnly={field.type === InputTypes.EMAIL}
              />
            </div>
          );
        })}
        {session.data?.user.role === UserRole.ADMIN && (
          <div className="flex items-center gap-2 my-4">
            <Checkbox
              name="admin"
              checked={isAdmin}
              onClick={() => setIsAdmin(!isAdmin)}
              label="Admin"
            />
          </div>
        )}
        <Button type="submit" className="w-full">
          {pending ? <Loader /> : translation.save}
        </Button>
      </div>
    </form>
  );
}
