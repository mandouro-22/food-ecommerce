import EditUserForm from "@/components/edit-user-form";
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/translation";
import { getUser, getUsers } from "@/server/db/users";
import { redirect } from "next/navigation";
import React from "react";

export const generateStaticParams = async () => {
  const users = await getUsers();

  return users.map((user) => ({ userId: user.id }));
};

export default async function EditPage({
  params,
}: {
  params: Promise<{ userId: string; locale: Locale }>;
}) {
  const { locale, userId } = await params;
  const translations = await getDictionary(locale);

  const user = await getUser(userId);
  if (!user) return redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <EditUserForm translation={translations} user={user} />
        </div>
      </section>
    </main>
  );
}
