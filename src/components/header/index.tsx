import { Routes } from "@/constants/enums";
import Link from "../link";
import Navbar from "./Navbar";
import CartButton from "./cartButton";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { getDictionary } from "@/lib/translation";
import LanguageSwitcher from "./languageSwithcer";
import AuthButton from "./AuthButton";
import { getServerSession } from "next-auth";
import { authOption } from "@/server/auth";

export default async function Header() {
  const initialSession = await getServerSession(authOption);
  const locale = await getCurrentLocale();
  const translation = await getDictionary(locale);
  return (
    <header className="py-6">
      <div className="container flex items-center justify-between gap-6 lg:gap-10">
        <Link
          href={Routes.ROOT}
          className="text-primary font-semibold text-2xl">
          🍕 {translation.logo}
        </Link>
        <Navbar translation={translation} initialSession={initialSession} />
        <div className="flex items-center gap-6 flex-1 justify-end">
          <div className="hidden lg:flex lg:items-center lg:gap-6 ">
            <AuthButton
              translations={translation}
              initialSession={initialSession}
            />
            <LanguageSwitcher />
          </div>

          <CartButton />
        </div>
      </div>
    </header>
  );
}
