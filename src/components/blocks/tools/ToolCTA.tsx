"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ToolCTAProps {
  namespace: string; // e.g., "tools.roi.cta"
}

export function ToolCTA({ namespace }: ToolCTAProps) {
  const t = useTranslations(namespace);

  const primaryLink = t("primary_link");
  const secondaryLink = t("secondary_link");

  return (
    <section className="py-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="group">
              <Link href={primaryLink}>
                {t("primary_button")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={secondaryLink}>
                {t("secondary_button")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
