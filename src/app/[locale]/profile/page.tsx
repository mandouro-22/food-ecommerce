import EditUserForm from "@/components/edit-user-form";
import { Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/translation";
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
  const translation = await getDictionary(params.locale);

  if (session && session?.user?.role === UserRole?.ADMIN) {
    redirect(`/${params.locale}/${Routes.ADMIN}`);
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
