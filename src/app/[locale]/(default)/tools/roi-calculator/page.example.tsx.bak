import { useTranslations } from "next-intl";
import { ROICalculator } from "@/components/blocks/calculator/ROI/ROICalculator";
import { ToolFeatures } from "@/components/blocks/tools/ToolFeatures";
import { ToolShowcase } from "@/components/blocks/tools/ToolShowcase";
import { ToolFAQ } from "@/components/blocks/tools/ToolFAQ";
import { ToolCTA } from "@/components/blocks/tools/ToolCTA";

export default function ROICalculatorPage() {
  const t = useTranslations("tools.roi.page");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Calculator Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <ROICalculator />
        </div>

        {/* Features Section */}
        <ToolFeatures namespace="tools.roi.features" features={features} />

        {/* Showcase Section */}
        <ToolShowcase namespace="tools.roi.showcase" />

        {/* FAQ Section */}
        <ToolFAQ namespace="tools.roi.faq" />

        {/* CTA Section */}
        <ToolCTA namespace="tools.roi.cta" />
      </div>
    </div>
  );
}
