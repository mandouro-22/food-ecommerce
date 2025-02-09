import { Routes } from "@/constants/enums";
import MainHeading from "../main-heading";

export default function Contact() {
  return (
    <section className="section-gap" id={Routes.CONTACT}>
      <div className="container text-center">
        <MainHeading subTitle="Don't Hesitate" title="Contact Us" />
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
