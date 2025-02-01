import Image from "next/image";
import pizza from "../../../public/assts/Image/pizza.png";
import Link from "@/components/link";
import { Routes } from "@/constants/enums";
import { ArrowRightCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function Hero() {
  return (
    <section>
      <div className="container grid grid-cols-1 md:grid-cols-2">
        <div className="py-12">
          <h1 className="text-4xl font-semibold">Slice Into Happiness</h1>
          <p className="text-accent my-4">
            Our pizza is made with love and care, using only the finest
            ingredients. Enjoy a slice filled with our signature toppings.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${Routes.MENU}`}
              className={`${buttonVariants({
                size: "lg",
              })} space-x-2 !px-4 !rounded-full uppercase`}>
              ORDER NOW
              <ArrowRightCircle className={`!w-5 !h-5`} />
            </Link>
            <Link
              href={`/${Routes.ABOUT}`}
              className="flex gap-2 items-center text-black hover:text-primary duration-200 transition-colors font-semibold">
              Learn More
              <ArrowRightCircle className={`!w-5 !h-5`} />
            </Link>
          </div>
        </div>
        <div className="relative hidden md:block">
          <Image
            src={pizza}
            alt="Pizza"
            fill
            className="object-contain"
            loading="eager"
            priority
          />
        </div>
      </div>
    </section>
  );
}
