import { CartItem } from "@/store/feature/cart/cartSlice";

export const getCartQuantity = (cart: CartItem[]) => {
  return cart.reduce((quantity, item) => item.quantity! + quantity, 0);
};

export const getItemQuantity = (id: string, cart: CartItem[]) => {
  return cart.find((item) => item.id === id)?.quantity || 0;
};

export const deliveryFee = 5;

export const getSubtotal = (cart: CartItem[]) => {
  return cart.reduce((total, item) => {
    const extrasPrice = item.extras?.reduce(
      (sum, extra) => sum + extra?.price || 0,
      0
    );
    return (
      total +
      item.basePrice +
      (item.size?.price || 0) +
      (extrasPrice || 0) * item.quantity!
    );
  }, 0);
};
