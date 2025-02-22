import Menu from "@/components/menu/menu";
import { getProductsByCategory } from "@/server/db/product";
import React from "react";

export default async function MenuPage() {
  const categorites = await getProductsByCategory();
  return (
    <main>
      {categorites.map((category) => (
        <section key={category.id} className="section-gap">
          <div className="container text-center">
            <h1 className="text-primary font-bold text-4xl italic mb-6">
              {category.name}
            </h1>
            <Menu bestSellers={category.products} />
          </div>
        </section>
      ))}
    </main>
  );
}
