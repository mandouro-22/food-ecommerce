import React from "react";
import { AdminTabs } from "./_Components/AdminTabs";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { getDictionary } from "@/lib/translation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getCurrentLocale();
  const translations = await getDictionary(locale);
  return (
    <>
      <AdminTabs translations={translations} />
      {children}
    </>
  );
}
