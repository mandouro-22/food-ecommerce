"use client";
import Link from "@/components/link";
import { Button, buttonVariants } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { Pages, Routes } from "@/constants/enums";
import { ProductWithRelations } from "@/types/product";
import { Translation } from "@/types/Translation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteProduct } from "../_action/deleteProduct";
import { toast } from "@/hooks/use-toast";

export default function FormAction({
  translation,
  pending,
  product,
}: {
  translation: Translation;
  pending: boolean;
  product?: ProductWithRelations;
}) {
  const { locale } = useParams();
  const [state, setState] = useState<{
    pending?: boolean;
    status?: null | number;
    message?: string;
  }>({
    pending: false,
    status: null,
    message: "",
  });

  const handleDelete = async (id: string) => {
    try {
      setState((prev) => {
        return { ...prev, pending: true };
      });

      const res = await deleteProduct(id);

      setState((prev) => {
        return { ...prev, message: res.message, status: res.status };
      });
    } catch (error) {
      console.error(error);
    } finally {
      setState((prev) => {
        return { ...prev, pending: false };
      });
    }
  };

  useEffect(() => {
    if (state.message && state.status && !state.pending) {
      toast({
        title: state.message,
        className:
          state.status === 200 ? "text-green-400" : "text-desctructive",
      });
    }
  }, [state.message, state.pending, state.status]);

  return (
    <>
      <div
        className={`${product ? "grid grid-cols-2" : "flex flex-col"} gap-4`}
      >
        <Button type="submit" disabled={pending}>
          {pending ? (
            <Loader />
          ) : product ? (
            translation.save
          ) : (
            translation.create
          )}
        </Button>
        {product && (
          <Button
            variant="outline"
            disabled={state.pending}
            onClick={() => handleDelete(product.id)}
          >
            {state.pending ? <Loader /> : translation.delete}
          </Button>
        )}
      </div>

      <Link
        href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`}
        className={`w-full mt-4 ${buttonVariants({ variant: "outline" })}`}
      >
        {translation.cancel}
      </Link>
    </>
  );
}
