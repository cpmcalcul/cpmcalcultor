import { useTranslations } from "next-intl";
import { CTRCalculator } from "@/components/blocks/calculator/CTR/CTRCalculator";
import { ToolFeatures } from "@/components/blocks/tools/ToolFeatures";
import { ToolShowcase } from "@/components/blocks/tools/ToolShowcase";
import { ToolFAQ } from "@/components/blocks/tools/ToolFAQ";
import { ToolCTA } from "@/components/blocks/tools/ToolCTA";
import { ToolFeatures2 } from "@/components/blocks/tools/ToolFeatures2";
import { ToolPageHero } from "@/components/blocks/tools/ToolPageHero";

export default function ROICalculatorPage() {
  const t = useTranslations("tools.ctr.page");

  // Define features with icon names (not components)
  const features = [
    {
      icon: "calculator" as const,
      key: "calculate",
      color: "text-blue-600",
    },
    {
      icon: "target" as const,
      key: "optimize",
      color: "text-green-600",
    },
    {
      icon: "trending" as const,
      key: "analyze",
      color: "text-purple-600",
    },
    {
      icon: "chart" as const,
      key: "report",
      color: "text-orange-600",
    },
  ];

  // Items for ToolFeatures2 (must include before/after images)
  const features2 = [
    {
      icon: "calculator" as const,
      key: "calculate",
      beforeImage: "/imgs/features/5.png",
      afterImage: "/imgs/features/6.png",
    },
    {
      icon: "target" as const,
      key: "optimize",
      beforeImage: "/imgs/features/2.png",
      afterImage: "/imgs/features/2-after.png",
    },
    {
      icon: "trending" as const,
      key: "analyze",
      beforeImage: "/imgs/features/3.png",
      afterImage: "/imgs/features/3-after.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <ToolPageHero namespace="tools.ctr.hero" />
        
        {/* Calculator Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <CTRCalculator />
        </div>

        {/* Features Section */}
        <ToolFeatures namespace="tools.ctr.features" features={features} />

        {/* Showcase Section */}
        <ToolShowcase namespace="tools.ctr.showcase" />

        {/* Features2 Section */}
        <ToolFeatures2 namespace="tools.ctr.features2" items={features2} />




        {/* FAQ Section */}
        <ToolFAQ namespace="tools.ctr.faq" />

        {/* CTA Section */}
        <ToolCTA namespace="tools.ctr.cta" />
      </div>
    </div>
  );
}
