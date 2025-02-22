"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Languages } from "@/constants/enums";

export default function LanguageSwithcer() {
  const pathName = usePathname();
  const route = useRouter();
  const { locale } = useParams();
  const switchLanguage = (lang: string) => {
    const path = pathName.replace(`/${locale}`, `/${lang}`) ?? `/${lang}/`;
    route.push(path);
  };
  return (
    <div className="flex">
      {locale === Languages.ARABIC ? (
        <Button
          variant="outline"
          onClick={() => switchLanguage(Languages.ENGLISH)}>
          English
        </Button>
      ) : (
        <Button
          variant="outline"
          onClick={() => switchLanguage(Languages.ARABIC)}>
          العربية
        </Button>
      )}
    </div>
  );
}
