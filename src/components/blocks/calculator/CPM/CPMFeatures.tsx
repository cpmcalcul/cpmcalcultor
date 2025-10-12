"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp, Target, BarChart3 } from "lucide-react";

export function CPMFeatures() {
  const t = useTranslations('cpm_features');

  const features = [
    {
      icon: Calculator,
      title: t('calculate.title'),
      description: t('calculate.description'),
      color: "text-blue-600"
    },
    {
      icon: Target,
      title: t('optimize.title'),
      description: t('optimize.description'),
      color: "text-green-600"
    },
    {
      icon: TrendingUp,
      title: t('analyze.title'),
      description: t('analyze.description'),
      color: "text-purple-600"
    },
    {
      icon: BarChart3,
      title: t('report.title'),
      description: t('report.description'),
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('title')}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}