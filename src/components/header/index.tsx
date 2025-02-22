import { Routes } from "@/constants/enums";
import Link from "../link";
import Navbar from "./Navbar";
import CartButton from "./cartButton";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { getDictionary } from "@/lib/translation";
import LanguageSwitcher from "./languageSwithcer";

export default async function Header() {
  const locale = await getCurrentLocale();
  const { navbar, logo } = await getDictionary(locale);
  return (
    <header className="py-6">
      <div className="container flex items-center justify-between">
        <Link
          href={Routes.ROOT}
          className="text-primary font-semibold text-2xl">
          🍕 {logo}
        </Link>
        <div className="flex items-center gap-10">
          <Navbar translation={navbar} />
          <LanguageSwitcher />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
