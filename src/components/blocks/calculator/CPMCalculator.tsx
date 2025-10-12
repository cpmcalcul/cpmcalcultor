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
  cpm: string;
  impressions: string;
}

export function CPMCalculator() {
  const t = useTranslations('calculator');
  const [values, setValues] = useState<CalculatorValues>({
    totalCost: "",
    cpm: "",
    impressions: "",
  });

  const [lastEdited, setLastEdited] = useState<keyof CalculatorValues | null>(null);
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (field: keyof CalculatorValues, value: string) => {
    // 只允许数字和小数点
    if (value && !/^\d*\.?\d*$/.test(value)) return;

    setValues((prev) => ({ ...prev, [field]: value }));
    setLastEdited(field);
  };

  const calculate = () => {
    const cost = Number.parseFloat(values.totalCost) || 0;
    const cpmValue = Number.parseFloat(values.cpm) || 0;
    const impressionsValue = Number.parseFloat(values.impressions) || 0;

    // 计算逻辑：根据已填写的两个值计算第三个值
    const filledFields = [
      values.totalCost && "totalCost",
      values.cpm && "cpm",
      values.impressions && "impressions",
    ].filter(Boolean);

    if (filledFields.length < 2) {
      alert(t('error_min_fields'));
      return;
    }

    if (filledFields.length === 3) {
      // 如果三个都填了，根据最后编辑的字段决定计算哪个
      if (lastEdited === "totalCost") {
        // 计算总成本
        const newCost = (cpmValue * impressionsValue) / 1000;
        setValues((prev) => ({ ...prev, totalCost: newCost.toFixed(2) }));
      } else if (lastEdited === "cpm") {
        // 计算 CPM
        const newCpm = (cost / impressionsValue) * 1000;
        setValues((prev) => ({ ...prev, cpm: newCpm.toFixed(2) }));
      } else {
        // 计算展示次数
        const newImpressions = (cost / cpmValue) * 1000;
        setValues((prev) => ({ ...prev, impressions: newImpressions.toFixed(0) }));
      }
    } else {
      // 只填了两个，计算第三个
      if (!values.totalCost) {
        // 计算总成本: Total Cost = (CPM × Impressions) / 1000
        const newCost = (cpmValue * impressionsValue) / 1000;
        setValues((prev) => ({ ...prev, totalCost: newCost.toFixed(2) }));
      } else if (!values.cpm) {
        // 计算 CPM: CPM = (Total Cost / Impressions) × 1000
        const newCpm = (cost / impressionsValue) * 1000;
        setValues((prev) => ({ ...prev, cpm: newCpm.toFixed(2) }));
      } else {
        // 计算展示次数: Impressions = (Total Cost / CPM) × 1000
        const newImpressions = (cost / cpmValue) * 1000;
        setValues((prev) => ({ ...prev, impressions: newImpressions.toFixed(0) }));
      }
    }
    
    setShowResults(true);
  };

  const reset = () => {
    setValues({ totalCost: "", cpm: "", impressions: "" });
    setLastEdited(null);
    setShowResults(false);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-3xl font-bold">{t('title')}</CardTitle>
            <CardDescription className="text-base mt-2">
              {t('description')}
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
                {t('total_cost.label')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('total_cost.description')}
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>{t('total_cost.step1')}</li>
                <li>{t('total_cost.step2')}</li>
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
                  placeholder={t('placeholders.total_cost')}
                  value={values.totalCost}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("totalCost", e.target.value)}
                  className="text-lg h-12 pl-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CPM */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="cpm" className="text-lg font-semibold">
                {t('cpm.label')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('cpm.description')}
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>{t('cpm.step1')}</li>
                <li>{t('cpm.step2')}</li>
              </ol>
            </div>
            <div className="w-40">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                  {currency.symbol}
                </span>
                <Input
                  id="cpm"
                  type="text"
                  placeholder={t('placeholders.cpm')}
                  value={values.cpm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("cpm", e.target.value)}
                  className="text-lg h-12 pl-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 展示次数 */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="impressions" className="text-lg font-semibold">
                {t('impressions.label')}
              </Label>
              <p className="text-sm text-muted-foreground">
                {t('impressions.description')}
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>{t('impressions.step1')}</li>
                <li>{t('impressions.step2')}</li>
              </ol>
            </div>
            <div className="w-40">
              <Input
                id="impressions"
                type="text"
                placeholder={t('placeholders.impressions')}
                value={values.impressions}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange("impressions", e.target.value)}
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
            {t('buttons.reset')}
          </Button>
          <Button
            onClick={calculate}
            size="lg"
            className="flex-1 h-12 bg-orange-600 hover:bg-orange-700"
          >
            {t('buttons.calculate')}
          </Button>
        </div>

        {/* 计算结果显示 */}
        {showResults && (
          <div className="mt-8 p-6 bg-muted/50 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">{t('results.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground">{t('results.total_cost_label')}</p>
                <p className="text-2xl font-bold text-green-600">
                  {currency.symbol}{values.totalCost || "0"}
                </p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground">{t('results.cpm_label')}</p>
                <p className="text-2xl font-bold text-blue-600">
                  {currency.symbol}{values.cpm || "0"}
                </p>
              </div>
              <div className="text-center p-4 bg-background rounded-lg">
                <p className="text-sm text-muted-foreground">{t('results.impressions_label')}</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Number(values.impressions || 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
