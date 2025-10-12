import { useTranslations } from "next-intl";
import { CTRCalculator } from "@/components/blocks/calculator/CTRCalculator";

export default function CTRCalculatorPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {t("calculator.ctr.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("calculator.ctr.description")}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <CTRCalculator />
        </div>
      </div>
    </div>
  );
}