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

export default async function AddToCard({
  item,
}: {
  item: ProductWithRelations;
}) {
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
              <Sizes size={item?.sizes} items={item} />
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
              <Extras extra={item?.extras} items={item} />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">
            Add Card
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
