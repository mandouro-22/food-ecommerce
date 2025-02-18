import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function CheckoutForm() {
  return (
    <div className="grid gap-6 bg-gray-100 rounded-md p-4">
      <h2 className="text-2xl text-black font-semibold">Checkout</h2>

      <form action="" className="">
        <div className="grid gap-4">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="text" placeholder="Phone Number" />
        </div>
      </form>
    </div>
  );
}
