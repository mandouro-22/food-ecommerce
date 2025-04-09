import Link from "@/components/link";
import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { getUsers } from "@/server/db/users";
import { Edit } from "lucide-react";
import React from "react";
import DeleteUserButton from "./_components/DeleteUserButton";
import { getServerSession } from "next-auth";
import { authOption } from "@/server/auth";
import { redirect } from "next/navigation";
import { getDictionary } from "@/lib/translation";

export default async function UserPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const translations = await getDictionary(locale);
  const session = await getServerSession(authOption);
  // if session doesn't exist redirect to login page
  if (!session) return redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  const userId = session.user.id;
  const users = await getUsers(userId);

  console.log("usres 😊😊😊😊😊😊✅✅✅✅✅✅" + users);

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <ul className="flex flex-col gap-4">
            {users.length > 1 ? (
              users.map((user) => (
                <li
                  key={user.id}
                  className="flex justify-between items-center gap-4 p-4 rounded-md bg-gray-100"
                >
                  <div className="md:flex justify-between flex-1">
                    <h3 className="text-black font-medium text-sm flex-1">
                      {user.name}
                    </h3>
                    <p className="text-accent font-medium text-sm flex-1">
                      {user.email}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Link
                      href={`/${locale}/${Routes.ADMIN}/${Pages.USERS}/${user.id}/${Pages.EDIT}`}
                      className={`${buttonVariants({ variant: "outline" })}`}
                    >
                      <Edit />
                    </Link>
                    <DeleteUserButton userId={user.id} />
                  </div>
                </li>
              ))
            ) : (
              <div className="text-center py-10 text-gray-500">
                <p className="text-lg font-semibold">
                  {translations["There are no users yet."]}
                </p>
                <p className="text-sm mt-2">
                  {
                    translations[
                      "It looks like you are the only user on the system right now."
                    ]
                  }
                  ✨
                </p>
              </div>
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}
