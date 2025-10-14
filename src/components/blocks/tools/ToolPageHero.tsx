"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface ToolPageHeroProps {
  namespace: string; // e.g., "tools.roi.hero"
  showCTA?: boolean; // Whether to show CTA buttons
}

export function ToolPageHero({ namespace, showCTA = false }: ToolPageHeroProps) {
  const t = useTranslations(namespace);

  return (
    <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          {t.has("badge") && (
            <Badge className="mb-4 text-xs font-medium">
              {t("badge")}
            </Badge>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t("title")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>

          {/* Description (optional) */}
          {t.has("description") && (
            <p className="text-base text-muted-foreground/80 mb-8 max-w-xl mx-auto">
              {t("description")}
            </p>
          )}

          {/* CTA Buttons */}
          {showCTA && t.has("cta_primary") && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="group">
                {t("cta_primary")}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              {t.has("cta_secondary") && (
                <Button size="lg" variant="outline">
                  {t("cta_secondary")}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
