import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Translation } from "@/types/Translation";
import { Extra } from "@prisma/client";
import { ItemsOptions } from "./ItemsOptions";
import { ItemOptionsKeys } from "../Form";

export default function AddExtra({
  extra,
  setExtra,
  translations,
}: {
  extra: Partial<Extra>[];
  setExtra: React.Dispatch<React.SetStateAction<Partial<Extra>[]>>;
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
          {translations.extrasIngredients}
        </AccordionTrigger>
        <AccordionContent>
          <ItemsOptions
            state={extra}
            setState={setExtra}
            translations={translations}
            optionKey={ItemOptionsKeys.EXTRAS}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
