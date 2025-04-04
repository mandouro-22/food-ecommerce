"use client";

import { Button } from "../ui/button";
import { Translation } from "@/types/Translation";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Pages, Routes } from "@/constants/enums";
import { useClientSession } from "@/hooks/use-clientSession";
import { Session } from "next-auth";

export default function AuthButton({
  translations,
  initialSession,
}: {
  initialSession: Session | null;
  translations: Translation;
}) {
  const session = useClientSession(initialSession);
  const { locale } = useParams();
  const router = useRouter();
  const pathName = usePathname();

  return (
    <div>
      {session.data?.user && (
        <div className="flex items-center gap-10">
          <Button className="!px-8 !rounded-full" size="lg">
            {translations.navbar.signOut}
          </Button>
        </div>
      )}

      {!session.data?.user && (
        <div className="flex items-center gap-2">
          <Button
            className={`!px-8 !rounded-full !bg-transparent
            ${
              pathName === `/${locale}/${Routes.AUTH}/${Pages.LOGIN}`
                ? "!text-primary"
                : "text-gray-900"
            }
              `}
            size="lg"
            onClick={() => {
              router.push(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
            }}>
            {translations.navbar.login}
          </Button>

          <Button
            className="!px-8 !rounded-full"
            size="lg"
            onClick={() => {
              router.push(`/${locale}/${Routes.AUTH}/${Pages.Register}`);
            }}>
            {translations.navbar.register}
          </Button>
        </div>
      )}
    </div>
  );
}
