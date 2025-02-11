"use client";
import { Routes } from "@/constants/enums";
import Link from "../link";
import { ShoppingCart } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { selectCartItems } from "@/store/feature/cart/cartSlice";
import { getCartQuantity } from "@/lib/cart";

export default function CartButton() {
  const cart = useAppSelector(selectCartItems);
  const quantity = getCartQuantity(cart);
  return (
    <Link href={Routes.CART} className="block relative group">
      <span className="absolute -top-4 start-4 w-5 h-5 text-sm bg-primary rounded-full text-white text-center">
        {quantity}
      </span>
      <ShoppingCart className="text-accent group-hover:text-primary duration-200 transition-colors !w-6 !h-6" />
    </Link>
  );
}
