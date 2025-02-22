import { Routes } from "@/constants/enums";
import MainHeading from "../main-heading";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import { getDictionary } from "@/lib/translation";

export default async function Contact() {
  const locale = await getCurrentLocale();
  const { home } = await getDictionary(locale);
  const { contact } = home;
  return (
    <section className="section-gap" id={Routes.CONTACT}>
      <div className="container text-center">
        <MainHeading
          subTitle={contact["Don'tHesitate"]}
          title={contact.contactUs}
        />
        <div className="mt-8">
          <a
            href="tel:+201003083969"
            className="text-4xl underline text-accent">
            +201003083969
          </a>
        </div>
      </div>
    </section>
  );
}
