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
    <section className="py-24 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-float-delayed" />
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            {t("title")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = ICON_MAP[feature.icon];
            return (
              <Card key={index} className="group text-center hover:shadow-xl transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className="mx-auto mb-6 p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className={`h-8 w-8 ${feature.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors duration-300">
                    {t(`${feature.key}.title`)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
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
