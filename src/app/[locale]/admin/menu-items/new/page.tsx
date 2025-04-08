import { Pages, Routes } from "@/constants/enums";
import { getDictionary } from "@/lib/translation";
import { authOption } from "@/server/auth";
import { UserRole } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Form from "../_components/Form";
import { Locale } from "@/i18n.config";
import { getCategories } from "@/server/db/categorie";

export default async function NewProductPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const translations = await getDictionary(locale);
  const session = await getServerSession(authOption);
  const getCategory = await getCategories();

  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }

  if (session && session.user.role !== UserRole.ADMIN) {
    redirect(`/${locale}/${Routes.PROFILE}`);
  }
  return (
    <main>
      <section className="secion-gap">
        <div className="container">
          <Form translations={translations} categories={getCategory} />
        </div>
      </section>
    </main>
  );
}
