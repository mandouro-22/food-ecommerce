import { Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { authOption } from "@/server/auth";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function Profile({
  params,
}: {
  params: { locale: Locale };
}) {
  const session = await getServerSession(authOption);
  const { locale } = params;
  if (session && session?.user?.role === UserRole?.ADMIN) {
    redirect(`/${locale}/${Routes.ADMIN}`);
  }
  return <main>Profile</main>;
}
