import { Pages, Routes } from "@/constants/enums";
import { Locale } from "@/i18n.config";
import { getProduct, getProducts } from "@/server/db/product";
import { redirect } from "next/navigation";
import Form from "../../_components/Form";
import { getCategories } from "@/server/db/categorie";
import { getDictionary } from "@/lib/translation";

export const generateStaticParams = async () => {
  const product = await getProducts();
  return product.map((items) => ({ productId: items.id }));
};

export default async function EditProduct({
  params,
}: {
  params: Promise<{ locale: Locale; productId: string }>;
}) {
  const { locale, productId } = await params;
  const translations = await getDictionary(locale);
  const product = await getProduct(productId);
  const categories = await getCategories();

  if (!product) {
    return redirect(`/${locale}/${Routes.ADMIN}/${Pages.MENU_ITEMS}`);
  }

  return (
    <main>
      <section className="section-gap">
        <div className="contianer">
          <Form
            categories={categories}
            translations={translations}
            product={product}
          />
        </div>
      </section>
    </main>
  );
}
