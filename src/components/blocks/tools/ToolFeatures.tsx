"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp, Target, BarChart3, Zap, Shield, Users, Award, type LucideIcon } from "lucide-react";

// Icon mapping - all available icons
const ICON_MAP: Record<string, LucideIcon> = {
  calculator: Calculator,
  trending: TrendingUp,
  target: Target,
  chart: BarChart3,
  zap: Zap,
  shield: Shield,
  users: Users,
  award: Award,
};

export interface FeatureItem {
  icon: keyof typeof ICON_MAP; // Icon name from the map
  key: string; // The nested object key, e.g., "calculate", "optimize"
  color: string;
}

interface ToolFeaturesProps {
  namespace: string; // e.g., "tools.roi.features"
  features: FeatureItem[];
}

export function ToolFeatures({ namespace, features }: ToolFeaturesProps) {
  const t = useTranslations(namespace);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("title")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = ICON_MAP[feature.icon];
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
                    <IconComponent className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{t(`${feature.key}.title`)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {t(`${feature.key}.description`)}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
