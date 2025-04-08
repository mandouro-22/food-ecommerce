"use client";
import Link from "@/components/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { Translation } from "@/types/Translation";
import { useParams } from "next/navigation";

export default function FormAction({
  translation,
}: {
  translation: Translation;
}) {
  const { locale } = useParams();
  return (
    <>
      <Button type="submit" className="w-full">
        {translation.create}
      </Button>
      <Link
        href={`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`}
        className={`w-full mt-4 transition-all duration-300 ${buttonVariants({
          variant: "outline",
        })}`}
      >
        {translation.cancel}
      </Link>
    </>
  );
}
