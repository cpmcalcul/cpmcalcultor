"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

interface ToolShowcaseProps {
  namespace: string; // e.g., "tools.roi.showcase"
}

export function ToolShowcase({ namespace }: ToolShowcaseProps) {
  const t = useTranslations(namespace);

  const benefits = t.raw("benefits") as Array<string>;
  const imageUrl = t("image_url");
  const imageAlt = t("image_alt");

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-30" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-float-delayed" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <Badge className="text-sm font-medium mb-6 bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20 px-4 py-2 animate-float">
            {t("badge")}
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">{t("title")}</h2>
          <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Benefits List */}
          <div className="space-y-8">
            {benefits?.map((benefit, index) => (
              <div key={index} className="group flex items-start gap-6 p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl hover:bg-card/80 hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  </div>
                </div>
                <p className="text-lg lg:text-xl text-foreground group-hover:text-primary transition-colors duration-300 leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>

          {/* Showcase Image */}
          <div className="animate-float-delayed">
            <Card className="overflow-hidden group">
              <CardContent className="p-0">
                <div className="relative aspect-video">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={false}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
