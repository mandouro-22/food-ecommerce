import { Routes } from "@/constants/enums";
import Link from "../link";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="py-6">
      <div className="container flex items-center justify-between">
        <Link
          href={Routes.ROOT}
          className="text-primary font-semibold text-2xl">
          🍕 Pizza
        </Link>
        <Navbar />
      </div>
    </header>
  );
}
