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
  cpc: string;
  clicks: string;
}

export function CPCCalculator() {
  const t = useTranslations("tools.cpc.calculator");
  const [values, setValues] = useState<CalculatorValues>({
    totalCost: "",
    cpc: "",
    clicks: "",
  });

  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);

  const handleInputChange = (field: keyof CalculatorValues, value: string) => {
    if (value && !/^\d*\.?\d*$/.test(value)) return;
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const calculate = () => {
    const cost = Number.parseFloat(values.totalCost) || 0;
    const cpcValue = Number.parseFloat(values.cpc) || 0;
    const clicksValue = Number.parseFloat(values.clicks) || 0;

    const filledFields = [
      values.totalCost && "totalCost",
      values.cpc && "cpc",
      values.clicks && "clicks",
    ].filter(Boolean);

    if (filledFields.length < 2) {
      alert(t("error_min_fields"));
      return;
    }

    if (!values.totalCost) {
      // 计算总成本: Total Cost = CPC × Clicks
      const newCost = cpcValue * clicksValue;
      setValues((prev) => ({ ...prev, totalCost: newCost.toFixed(2) }));
    } else if (!values.cpc) {
      // 计算 CPC: CPC = Total Cost / Clicks
      const newCpc = cost / clicksValue;
      setValues((prev) => ({ ...prev, cpc: newCpc.toFixed(2) }));
    } else {
      // 计算点击次数: Clicks = Total Cost / CPC
      const newClicks = cost / cpcValue;
      setValues((prev) => ({ ...prev, clicks: newClicks.toFixed(0) }));
    }
  };

  const reset = () => {
    setValues({ totalCost: "", cpc: "", clicks: "" });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-3xl font-bold">{t("title")}</CardTitle>
            <CardDescription className="text-base mt-2">
              {t("description")}
            </CardDescription>
          </div>
          <CurrencySelector currency={currency} onCurrencyChange={setCurrency} />
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* 总广告费用 */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="totalCost" className="text-lg font-semibold">
                {t("fields.total_cost.label")}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t("fields.total_cost.description")}
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>{t("fields.total_cost.step1")}</li>
                <li>{t("fields.total_cost.step2")}</li>
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
                  placeholder={t("fields.total_cost.placeholder")}
                  value={values.totalCost}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("totalCost", e.target.value)}
                  className="text-lg h-12 pl-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CPC */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="cpc" className="text-lg font-semibold">
                {t("fields.cpc.label")}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t("fields.cpc.description")}
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>{t("fields.cpc.step1")}</li>
                <li>{t("fields.cpc.step2")}</li>
              </ol>
            </div>
            <div className="w-40">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  {currency.symbol}
                </span>
                <Input
                  id="cpc"
                  type="text"
                  placeholder={t("fields.cpc.placeholder")}
                  value={values.cpc}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("cpc", e.target.value)}
                  className="text-lg h-12 pl-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 点击次数 */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="clicks" className="text-lg font-semibold">
                {t("fields.clicks.label")}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t("fields.clicks.description")}
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>{t("fields.clicks.step1")}</li>
                <li>{t("fields.clicks.step2")}</li>
              </ol>
            </div>
            <div className="w-40">
              <Input
                id="clicks"
                type="text"
                placeholder={t("fields.clicks.placeholder")}
                value={values.clicks}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("clicks", e.target.value)}
                className="text-lg h-12"
              />
            </div>
          </div>
        </div>

        {/* 按钮 */}
        <div className="flex gap-4 pt-4">
          <Button
            onClick={reset}
            variant="outline"
            size="lg"
            className="flex-1 h-12"
          >
            {t("buttons.reset")}
          </Button>
          <Button
            onClick={calculate}
            size="lg"
            className="flex-1 h-12 bg-orange-600 hover:bg-orange-700"
          >
            {t("buttons.calculate")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
