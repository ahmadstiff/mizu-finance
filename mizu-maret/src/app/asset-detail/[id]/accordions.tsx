import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Accordions = () => {
  return (
    <div className="flex justify-center w-full items-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <Accordion
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-4"
        type="single"
        collapsible
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-gray-800 hover:text-black transition-colors font-semibold text-lg">
            Is it accessible?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 text-base mt-2">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Accordions;
