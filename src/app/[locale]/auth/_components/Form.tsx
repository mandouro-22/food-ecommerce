"use client";
import { FormEvent, useRef, useState } from "react";
import FormFields from "@/components/formFields/formFields";
import { Button } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { useFormFields } from "@/hooks/useFormFields";
import { IFormField } from "@/types/app";
import { signIn } from "next-auth/react";
import { toast } from "@/hooks/use-toast";
import { Translation } from "@/types/Translation";
import Loader from "@/components/ui/Loader";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export function Form({ translate }: { translate: Translation }) {
  const { getFormFields } = useFormFields({ slug: Pages.LOGIN, translate });
  const { locale } = useParams();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    formData?.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: data?.email,
        password: data?.password,
        redirect: false,
      });

      if (res?.error) {
        const validationError = JSON.parse(res.error).validationError;
        setError(validationError);
        const responseError = JSON.parse(res.error)?.responseError;
        console.log(responseError);
        if (responseError) {
          toast({
            title: responseError,
            className: "text-destructive",
          });
        }
      }
      if (res?.ok) {
        toast({
          title: translate.messages.loginSuccessful,
          className: "text-green-400",
        });
        router.replace(`/${locale}/${Routes.PROFILE}`);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} ref={formRef}>
      {getFormFields().map((fields: IFormField) => {
        return (
          <div className="mb-3" key={fields.id}>
            {<FormFields {...fields} error={error} />}
          </div>
        );
      })}
      <div className="flex items-center justify-center w-full">
        <Button className="w-full" disabled={loading}>
          {loading ? <Loader /> : translate.auth.login.submit}
        </Button>
      </div>
    </form>
  );
}
