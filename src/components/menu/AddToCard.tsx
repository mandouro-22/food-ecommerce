"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Extras, Sizes } from "./MenuSizeAndExtra";
// import { db } from "@/lib/prisma";
import { ProductWithRelations } from "@/types/product";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addCartItem, selectCartItems } from "@/store/feature/cart/cartSlice";
import { Extra, productSizes, Size } from "@prisma/client";
import { formatCurrency } from "@/lib/formatter";
import { getItemQuantity } from "@/lib/cart";
import ChooseQuantity from "./chooseQuantity";

export default function AddToCard({ item }: { item: ProductWithRelations }) {
  const cart = useAppSelector(selectCartItems);
  const quantity = getItemQuantity(item.id, cart);
  const dispatch = useAppDispatch();
  // size
  const defaultSize =
    cart.find((e) => e.id === item.id)?.size ||
    item.sizes.find((size) => size.name === productSizes.SMALL);
  const [selectedSize, setSelectedSize] = useState<Size>(defaultSize!);
  // extra
  const defaultExtra = cart.find((e) => e.id === item.id)?.extras || [];
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>(defaultExtra);

  let totalPrice = item.basePrice;

  if (selectedSize) {
    totalPrice += selectedSize.price;
  }
  if (selectedExtras.length > 0) {
    for (const extra of selectedExtras) {
      totalPrice += extra.price;
    }
  }

  const handleAddCart = () => {
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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full my-2">Add To Card</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <Image
            src={item?.image}
            alt={item?.name}
            className="!mx-auto"
            width={200}
            height={200}
          />
          <DialogTitle>{item?.name}</DialogTitle>
          <DialogDescription>{item?.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-10">
          <div>
            <Label
              htmlFor="pick-size"
              className="flex items-center justify-center font-semibold">
              Pick Your Size
            </Label>
            <div className="">
              <Sizes
                size={item?.sizes}
                items={item}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
            </div>
          </div>
          <div>
            <Label
              htmlFor="pick-extra"
              className="flex items-center justify-center font-semibold">
              Pick Your Extra
            </Label>
            <div className="">
              {/* Additional items or options here */}
              <Extras
                extra={item?.extras}
                items={item}
                selectedExtras={selectedExtras}
                setSelectedExtras={setSelectedExtras}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          {quantity === 0 ? (
            <Button type="submit" className="w-full" onClick={handleAddCart}>
              Add Card {formatCurrency(totalPrice)}
            </Button>
          ) : (
            <ChooseQuantity
              quantity={quantity}
              item={item}
              selectedSize={selectedSize}
              selectedExtras={selectedExtras}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
