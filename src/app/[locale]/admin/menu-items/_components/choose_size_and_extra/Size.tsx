import { Translation } from "@/types/Translation";
import { Size } from "@prisma/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ItemsOptions } from "./ItemsOptions";
import { ItemOptionsKeys } from "../Form";

export default function AddSize({
  sizes,
  setSizes,
  translations,
}: {
  sizes: Partial<Size>[];
  setSizes: React.Dispatch<React.SetStateAction<Partial<Size>[]>>;
  translations: Translation;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className="bg-gray-100 rounded-md px-4 w-80 mb-4 "
    >
      <AccordionItem value="item-1" className="border-none">
        <AccordionTrigger className="text-black text-base font-medium hover:no-underline">
          {translations.sizes}
        </AccordionTrigger>
        <AccordionContent>
          <ItemsOptions
            state={sizes}
            setState={setSizes}
            translations={translations}
            optionKey={ItemOptionsKeys.SIZES}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
