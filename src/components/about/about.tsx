import { Routes } from "@/constants/enums";
import MainHeading from "../main-heading";

export default function About() {
  return (
    <section className="section-gap" id={Routes.ABOUT}>
      <div className="container text-center">
        <MainHeading subTitle="Our Story" title="About US" />

        <div className="text-accent max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            maiores quod facere adipisci voluptates voluptatum sit obcaecati
            maiores quod facere adipisci voluptates voluptatum sit obcaecati
            maiores quod facere adipisci voluptates voluptatum sit obcaecati
            inventore harum provident.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            maiores quod facere adipisci voluptates voluptatum sit obcaecati
            maiores quod facere adipisci voluptates voluptatum sit obcaecati
            maiores quod facere adipisci voluptates voluptatum sit obcaecati
            inventore harum provident.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            maiores quod facere adipisci voluptates voluptatum sit obcaecati
            maiores quod facere adipisci voluptates voluptatum sit obcaecati
            inventore harum provident.
          </p>
        </div>
      </div>
    </section>
  );
}
