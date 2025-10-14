"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ToolFAQProps {
  namespace: string; // e.g., "tools.roi.faq"
}

export function ToolFAQ({ namespace }: ToolFAQProps) {
  const t = useTranslations(namespace);

  const faqItems = t.raw("items") as Array<{
    title: string;
    description: string;
  }>;

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <Badge className="text-xs font-medium mb-4">FAQ</Badge>
          <h2 className="text-4xl font-semibold mb-6">{t("title")}</h2>
          <p className="font-medium text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqItems?.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
