import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/translation";
import { getCategories } from "@/server/db/categorie";
import React from "react";
import Form from "./_components/Form";
import CategoryItems from "./_components/CategoryItems";

export default async function Categories({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const categories = await getCategories();

  const { locale } = await params;
  const translation = await getDictionary(locale);
  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <div>
            <Form translations={translation} />
            {categories.length > 0 ? (
              <ul className="flex flex-col gap-4 my-4">
                {categories.map((category) => (
                  <CategoryItems key={category.id} category={category} />
                ))}
              </ul>
            ) : (
              <p className="text-accent font-bold text-center text-base py-10">
                {translation.noCategoriesFound}
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
