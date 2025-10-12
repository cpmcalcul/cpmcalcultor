"use client";

import { useState } from "react";
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
  const [values, setValues] = useState<CalculatorValues>({
    totalCost: "",
    cpm: "",
    impressions: "",
  });

  const [lastEdited, setLastEdited] = useState<keyof CalculatorValues | null>(null);
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);

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
      alert("请至少填写两个字段");
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
  };

  const reset = () => {
    setValues({ totalCost: "", cpm: "", impressions: "" });
    setLastEdited(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-3xl font-bold">CPM 计算器</CardTitle>
            <CardDescription className="text-base mt-2">
              输入以下三个字段中的任意两个，然后点击"计算"按钮来获取第三个值
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
                总广告费用
              </Label>
              <p className="text-sm text-muted-foreground">
                要计算在线广告活动的总费用，请输入：
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>CPM（每千次展示成本）</li>
                <li>展示次数</li>
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
                  placeholder="1000"
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
                每千次展示成本（CPM）
              </Label>
              <p className="text-sm text-muted-foreground">
                要计算每千次展示成本，请输入：
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>总广告费用</li>
                <li>展示次数</li>
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
                  placeholder="10"
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
                展示次数
              </Label>
              <p className="text-sm text-muted-foreground">
                要计算您的预算可以获得的展示次数，请输入：
              </p>
              <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1">
                <li>总广告费用</li>
                <li>CPM（每千次展示成本）</li>
              </ol>
            </div>
            <div className="w-40">
              <Input
                id="impressions"
                type="text"
                placeholder="100000"
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
            重新开始
          </Button>
          <Button
            onClick={calculate}
            size="lg"
            className="flex-1 h-12 bg-orange-600 hover:bg-orange-700"
          >
            计算
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
