import React from "react";
import { getDictionary } from "@/lib/translation";
import { getServerSession } from "next-auth";
import { Locale } from "@/i18n.config";
import { authOption } from "@/server/auth";
import EditUserForm from "@/components/edit-user-form";
import { redirect } from "next/navigation";
import { Pages, Routes } from "@/constants/enums";
import { UserRole } from "@prisma/client";
export default async function Admin({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const session = await getServerSession(authOption);
  const translation = await getDictionary(locale);
  if (!session) {
    redirect(`/${locale}/${Pages.LOGIN}`);
  }
  if (session.user.role !== UserRole.ADMIN) {
    redirect(`/${locale}/${Routes.PROFILE}`);
  }
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <h1 className="text-center text-primary font-bold text-4xl italic">
            {translation.profile.title}
          </h1>
          {/* form edit */}
          <EditUserForm translation={translation} user={session?.user} />
        </div>
      </section>
    </main>
  );
}
