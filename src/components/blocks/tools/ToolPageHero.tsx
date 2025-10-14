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
    <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-30" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-float-delayed" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          {t.has("badge") && (
            <Badge className="mb-8 text-sm font-medium bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20 px-4 py-2 animate-float">
              {t("badge")}
            </Badge>
          )}

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-10 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/80 bg-clip-text text-transparent leading-tight">
            {t("title")}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>

          {/* Description (optional) */}
          {t.has("description") && (
            <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          )}

          {/* CTA Buttons */}
          {showCTA && t.has("cta_primary") && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="group px-10 py-7 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80">
                {t("cta_primary")}
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              {t.has("cta_secondary") && (
                <Button size="lg" variant="outline" className="px-10 py-7 text-lg font-semibold border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary/30 hover:shadow-md transition-all duration-300">
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
