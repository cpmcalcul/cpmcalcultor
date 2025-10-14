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
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="text-xs font-medium mb-4">
            {t("badge")}
          </Badge>
          <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Benefits List */}
          <div className="space-y-6">
            {benefits?.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-lg">{benefit}</p>
              </div>
            ))}
          </div>

          {/* Showcase Image */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-video">
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  priority={false}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
