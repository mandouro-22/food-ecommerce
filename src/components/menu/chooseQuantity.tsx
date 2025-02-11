import React from "react";
import { Button } from "../ui/button";
import { ProductWithRelations } from "@/types/product";
import { useDispatch } from "react-redux";
import {
  addCartItem,
  removeCartItem,
  removerItemCart,
} from "@/store/feature/cart/cartSlice";
import { Extra, Size } from "@prisma/client";

export default function ChooseQuantity({
  quantity,
  item,
  selectedSize,
  selectedExtras,
}: {
  quantity: number;
  item: ProductWithRelations;
  selectedSize: Size;
  selectedExtras: Extra[];
}) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addCartItem({
        basePrice: item.basePrice,
        id: item.id,
        image: item.image,
        name: item.name,
        size: selectedSize,
        extras: selectedExtras,
      })
    );
  };

  const handleRemoveItemQuantity = () => {
    dispatch(removeCartItem({ id: item?.id }));
  };

  const handleRemoveItemFromCart = () => {
    dispatch(removerItemCart({ id: item?.id }));
  };
  return (
    <div className="flex items-center flex-col gap-2 mt-4 w-full">
      <div className="flex items-center justify-center gap-2 border  rounded-md">
        <Button
          variant="default"
          className=" font-bold text-white"
          onClick={handleRemoveItemQuantity}>
          -
        </Button>
        <div>
          <span className="text-black">{quantity} in Cart</span>
        </div>
        <Button
          variant="default"
          className=" font-bold text-white"
          onClick={handleAddToCart}>
          +
        </Button>
      </div>
      <Button size={"sm"} onClick={handleRemoveItemFromCart}>
        Remove
      </Button>
    </div>
  );
}
