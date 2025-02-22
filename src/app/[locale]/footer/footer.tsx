import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { getDictionary } from "@/lib/translation";

export default async function Footer() {
  const locale = await getCurrentLocale();
  const { copyRight } = await getDictionary(locale);
  return (
    <footer className="border-t-2 p-8 text-center text-accent">
      <div className="container">
        <p>{copyRight} </p>
      </div>
    </footer>
  );
}
