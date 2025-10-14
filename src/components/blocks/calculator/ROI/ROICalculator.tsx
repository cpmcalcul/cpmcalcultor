"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencySelector, CURRENCIES, type Currency } from "@/components/shared/CurrencySelector";

interface CalculatorValues {
  revenue: string;
  cost: string;
  roi: string;
}

export function ROICalculator() {
  const t = useTranslations("tools.roi.calculator");

  const [values, setValues] = useState<CalculatorValues>({
    revenue: "",
    cost: "",
    roi: "",
  });

  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);

  const handleInputChange = (field: keyof CalculatorValues, value: string) => {
    if (value && !/^-?\d*\.?\d*$/.test(value)) return;
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const calculate = () => {
    const revenueValue = Number.parseFloat(values.revenue) || 0;
    const costValue = Number.parseFloat(values.cost) || 0;
    const roiValue = Number.parseFloat(values.roi) || 0;

    const filledFields = [
      values.revenue && "revenue",
      values.cost && "cost",
      values.roi && "roi",
    ].filter(Boolean);

    if (filledFields.length < 2) {
      alert(t("error_min_fields"));
      return;
    }

    if (!values.roi) {
      // Calculate ROI: ROI = ((Revenue - Cost) / Cost) × 100
      if (costValue === 0) {
        alert(t("error_zero_cost"));
        return;
      }
      const newRoi = ((revenueValue - costValue) / costValue) * 100;
      setValues((prev) => ({ ...prev, roi: newRoi.toFixed(2) }));
    } else if (!values.revenue) {
      // Calculate Revenue: Revenue = Cost × (ROI / 100 + 1)
      const newRevenue = costValue * (roiValue / 100 + 1);
      setValues((prev) => ({ ...prev, revenue: newRevenue.toFixed(2) }));
    } else {
      // Calculate Cost: Cost = Revenue / (ROI / 100 + 1)
      const newCost = revenueValue / (roiValue / 100 + 1);
      setValues((prev) => ({ ...prev, cost: newCost.toFixed(2) }));
    }
  };

  const reset = () => {
    setValues({ revenue: "", cost: "", roi: "" });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-3xl font-bold">{t("card_title")}</CardTitle>
            <CardDescription className="text-base mt-2">
              {t("card_description")}
            </CardDescription>
          </div>
          <CurrencySelector currency={currency} onCurrencyChange={setCurrency} />
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Total Revenue */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="revenue" className="text-lg font-semibold">
                {t("revenue_label")}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t("revenue_description")}
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>{t("revenue_hint_1")}</li>
                <li>{t("revenue_hint_2")}</li>
              </ol>
            </div>
            <div className="w-40">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  {currency.symbol}
                </span>
                <Input
                  id="revenue"
                  type="text"
                  placeholder="10000"
                  value={values.revenue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("revenue", e.target.value)}
                  className="text-lg h-12 pl-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Investment Cost */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="cost" className="text-lg font-semibold">
                {t("cost_label")}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t("cost_description")}
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>{t("cost_hint_1")}</li>
                <li>{t("cost_hint_2")}</li>
              </ol>
            </div>
            <div className="w-40">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  {currency.symbol}
                </span>
                <Input
                  id="cost"
                  type="text"
                  placeholder="5000"
                  value={values.cost}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("cost", e.target.value)}
                  className="text-lg h-12 pl-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ROI */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="roi" className="text-lg font-semibold">
                {t("roi_label")}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t("roi_description")}
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>{t("roi_hint_1")}</li>
                <li>{t("roi_hint_2")}</li>
              </ol>
              <p className="text-xs text-muted-foreground mt-2">
                {t("roi_formula")}
              </p>
            </div>
            <div className="w-40">
              <div className="relative">
                <Input
                  id="roi"
                  type="text"
                  placeholder="100"
                  value={values.roi}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("roi", e.target.value)}
                  className="text-lg h-12 pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            onClick={reset}
            variant="outline"
            size="lg"
            className="flex-1 h-12"
          >
            {t("reset_button")}
          </Button>
          <Button
            onClick={calculate}
            size="lg"
            className="flex-1 h-12 bg-orange-600 hover:bg-orange-700"
          >
            {t("calculate_button")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
