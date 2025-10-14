"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CurrencySelector, CURRENCIES, type Currency } from "@/components/shared/CurrencySelector";

interface CalculatorValues {
  totalCost: string;
  cpa: string;
  conversions: string;
}

export function CPACalculator() {
  const t = useTranslations("tools.cpa.calculator");
  
  const [values, setValues] = useState<CalculatorValues>({
    totalCost: "",
    cpa: "",
    conversions: "",
  });

  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);

  const handleInputChange = (field: keyof CalculatorValues, value: string) => {
    if (value && !/^\d*\.?\d*$/.test(value)) return;
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const calculate = () => {
    const cost = Number.parseFloat(values.totalCost) || 0;
    const cpaValue = Number.parseFloat(values.cpa) || 0;
    const conversionsValue = Number.parseFloat(values.conversions) || 0;

    const filledFields = [
      values.totalCost && "totalCost",
      values.cpa && "cpa",
      values.conversions && "conversions",
    ].filter(Boolean);

    if (filledFields.length < 2) {
      alert(t("error_min_fields"));
      return;
    }

    if (!values.totalCost) {
      // 计算总成本: Total Cost = CPA × Conversions
      const newCost = cpaValue * conversionsValue;
      setValues((prev) => ({ ...prev, totalCost: newCost.toFixed(2) }));
    } else if (!values.cpa) {
      // 计算 CPA: CPA = Total Cost / Conversions
      const newCpa = cost / conversionsValue;
      setValues((prev) => ({ ...prev, cpa: newCpa.toFixed(2) }));
    } else {
      // 计算转化数: Conversions = Total Cost / CPA
      const newConversions = cost / cpaValue;
      setValues((prev) => ({ ...prev, conversions: newConversions.toFixed(0) }));
    }
  };

  const reset = () => {
    setValues({ totalCost: "", cpa: "", conversions: "" });
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
        {/* Total Ad Cost */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="totalCost" className="text-lg font-semibold">
                {t("total_cost_label")}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t("total_cost_description")}
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>{t("total_cost_hint_1")}</li>
                <li>{t("total_cost_hint_2")}</li>
              </ol>
            </div>
            <div className="w-40">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  {currency.symbol}
                </span>
                <Input
                  id="totalCost"
                  type="text"
                  placeholder="5000"
                  value={values.totalCost}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("totalCost", e.target.value)}
                  className="text-lg h-12 pl-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CPA */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="cpa" className="text-lg font-semibold">
                {t("cpa_label")}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t("cpa_description")}
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>{t("cpa_hint_1")}</li>
                <li>{t("cpa_hint_2")}</li>
              </ol>
            </div>
            <div className="w-40">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  {currency.symbol}
                </span>
                <Input
                  id="cpa"
                  type="text"
                  placeholder="50"
                  value={values.cpa}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("cpa", e.target.value)}
                  className="text-lg h-12 pl-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Conversions */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="conversions" className="text-lg font-semibold">
                {t("conversions_label")}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t("conversions_description")}
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>{t("conversions_hint_1")}</li>
                <li>{t("conversions_hint_2")}</li>
              </ol>
            </div>
            <div className="w-40">
              <Input
                id="conversions"
                type="text"
                placeholder="100"
                value={values.conversions}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("conversions", e.target.value)}
                className="text-lg h-12"
              />
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
