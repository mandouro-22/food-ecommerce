"use client";
import { Routes, UserRole } from "@/constants/enums";
import Link from "../link";
import { useState } from "react";
import { Button } from "../ui/button";
import { Menu, XIcon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import AuthButton from "./AuthButton";
import LanguageSwitcher from "./languageSwithcer";
import { Translation } from "@/types/Translation";
import { Session } from "next-auth";
import { useClientSession } from "@/hooks/use-clientSession";

export default function Navbar({
  translation,
  initialSession,
}: {
  initialSession: Session | null;
  translation: Translation;
}) {
  const session = useClientSession(initialSession);
  const { locale } = useParams();
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  const isAdmin = session?.data?.user?.role === UserRole.ADMIN;
  const links = [
    {
      id: crypto.randomUUID(),
      title: translation.navbar.menu,
      href: Routes.MENU,
    },
    {
      id: crypto.randomUUID(),
      title: translation.navbar.about,
      href: Routes.ABOUT,
    },
    {
      id: crypto.randomUUID(),
      title: translation.navbar.contact,
      href: Routes.CONTACT,
    },
  ];
  return (
    <nav className="order-last lg:order-none">
      <Button
        variant="secondary"
        size="sm"
        className="lg:hidden"
        onClick={() => setOpen(true)}>
        <Menu className="!w-6 !h-6" />
      </Button>
      <ul
        className={`fixed lg:static ${
          open ? "left-0 z-50" : "-left-full"
        } top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10`}>
        <Button
          size="sm"
          className="absolute top-10 right-10 lg:hidden bg-transparent text-primary hover:bg-transparent"
          onClick={() => setOpen(false)}>
          <XIcon className="!w-6 !h-6" />
        </Button>
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={`/${locale}/${link.href}`}
              onClick={() => setOpen(false)}
              className={`hover:text-primary duration-200 transition-colors font-semibold
                        ${
                          pathName.startsWith(`/${locale}/${link.href}`)
                            ? "text-primary"
                            : "text-accent"
                        }`}>
              {link.title}
            </Link>
          </li>
        ))}
        {session.data?.user && (
          <li>
            <Link
              href={
                isAdmin
                  ? `/${locale}/${Routes.ADMIN}`
                  : `/${locale}/${Routes.PROFILE}`
              }
              // onClick={() => setOpenMenu(false)}
              className={`${
                pathName.startsWith(
                  isAdmin
                    ? `/${locale}/${Routes.ADMIN}`
                    : `/${locale}/${Routes.PROFILE}`
                )
                  ? "text-primary"
                  : "text-accent"
              } hover:text-primary duration-200 transition-colors font-semibold`}>
              {isAdmin ? translation.navbar.admin : translation.navbar.profile}
            </Link>
          </li>
        )}
        <li className="lg:hidden flex flex-col gap-4">
          <div onClick={() => setOpen(false)}>
            <AuthButton
              translations={translation}
              initialSession={initialSession}
            />
          </div>
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
}
