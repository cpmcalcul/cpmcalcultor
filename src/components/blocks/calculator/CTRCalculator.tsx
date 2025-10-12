"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CTRValues {
  clicks: string;
  impressions: string;
  ctr: string;
}

interface CVRValues {
  conversions: string;
  clicks: string;
  cvr: string;
}

export function CTRCalculator() {
  const [ctrValues, setCtrValues] = useState<CTRValues>({
    clicks: "",
    impressions: "",
    ctr: "",
  });

  const [cvrValues, setCvrValues] = useState<CVRValues>({
    conversions: "",
    clicks: "",
    cvr: "",
  });

  const handleCTRInputChange = (field: keyof CTRValues, value: string) => {
    if (value && !/^\d*\.?\d*$/.test(value)) return;
    setCtrValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleCVRInputChange = (field: keyof CVRValues, value: string) => {
    if (value && !/^\d*\.?\d*$/.test(value)) return;
    setCvrValues((prev) => ({ ...prev, [field]: value }));
  };

  const calculateCTR = () => {
    const clicks = Number.parseFloat(ctrValues.clicks) || 0;
    const impressions = Number.parseFloat(ctrValues.impressions) || 0;
    const ctr = Number.parseFloat(ctrValues.ctr) || 0;

    const filledFields = [
      ctrValues.clicks && "clicks",
      ctrValues.impressions && "impressions",
      ctrValues.ctr && "ctr",
    ].filter(Boolean);

    if (filledFields.length < 2) {
      alert("请至少填写两个字段");
      return;
    }

    if (!ctrValues.ctr) {
      // 计算 CTR: CTR = (Clicks / Impressions) × 100
      if (impressions === 0) {
        alert("展示次数不能为0");
        return;
      }
      const newCtr = (clicks / impressions) * 100;
      setCtrValues((prev) => ({ ...prev, ctr: newCtr.toFixed(2) }));
    } else if (!ctrValues.clicks) {
      // 计算点击数: Clicks = Impressions × (CTR / 100)
      const newClicks = impressions * (ctr / 100);
      setCtrValues((prev) => ({ ...prev, clicks: newClicks.toFixed(0) }));
    } else {
      // 计算展示数: Impressions = Clicks / (CTR / 100)
      const newImpressions = clicks / (ctr / 100);
      setCtrValues((prev) => ({ ...prev, impressions: newImpressions.toFixed(0) }));
    }
  };

  const calculateCVR = () => {
    const conversions = Number.parseFloat(cvrValues.conversions) || 0;
    const clicks = Number.parseFloat(cvrValues.clicks) || 0;
    const cvr = Number.parseFloat(cvrValues.cvr) || 0;

    const filledFields = [
      cvrValues.conversions && "conversions",
      cvrValues.clicks && "clicks",
      cvrValues.cvr && "cvr",
    ].filter(Boolean);

    if (filledFields.length < 2) {
      alert("请至少填写两个字段");
      return;
    }

    if (!cvrValues.cvr) {
      // 计算 CVR: CVR = (Conversions / Clicks) × 100
      if (clicks === 0) {
        alert("点击次数不能为0");
        return;
      }
      const newCvr = (conversions / clicks) * 100;
      setCvrValues((prev) => ({ ...prev, cvr: newCvr.toFixed(2) }));
    } else if (!cvrValues.conversions) {
      // 计算转化数: Conversions = Clicks × (CVR / 100)
      const newConversions = clicks * (cvr / 100);
      setCvrValues((prev) => ({ ...prev, conversions: newConversions.toFixed(0) }));
    } else {
      // 计算点击数: Clicks = Conversions / (CVR / 100)
      const newClicks = conversions / (cvr / 100);
      setCvrValues((prev) => ({ ...prev, clicks: newClicks.toFixed(0) }));
    }
  };

  const resetCTR = () => {
    setCtrValues({ clicks: "", impressions: "", ctr: "" });
  };

  const resetCVR = () => {
    setCvrValues({ conversions: "", clicks: "", cvr: "" });
  };

  return (
    <div className="space-y-8">
      {/* CTR 计算器 */}
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">CTR 计算器</CardTitle>
          <CardDescription className="text-base mt-2">
            计算点击率、点击次数或展示次数
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* 点击次数 */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="clicks-ctr" className="text-lg font-semibold">
                  点击次数
                </Label>
                <p className="text-sm text-muted-foreground">
                  广告获得的点击次数
                </p>
              </div>
              <div className="w-40">
                <Input
                  id="clicks-ctr"
                  type="text"
                  placeholder="1000"
                  value={ctrValues.clicks}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCTRInputChange("clicks", e.target.value)}
                  className="text-lg h-12"
                />
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
                  广告的总展示次数
                </p>
              </div>
              <div className="w-40">
                <Input
                  id="impressions"
                  type="text"
                  placeholder="100000"
                  value={ctrValues.impressions}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCTRInputChange("impressions", e.target.value)}
                  className="text-lg h-12"
                />
              </div>
            </div>
          </div>

          {/* CTR */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="ctr" className="text-lg font-semibold">
                  点击率（CTR）
                </Label>
                <p className="text-sm text-muted-foreground">
                  点击率百分比
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  公式：CTR = (点击次数 / 展示次数) × 100%
                </p>
              </div>
              <div className="w-40">
                <div className="relative">
                  <Input
                    id="ctr"
                    type="text"
                    placeholder="1"
                    value={ctrValues.ctr}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCTRInputChange("ctr", e.target.value)}
                    className="text-lg h-12 pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 按钮 */}
          <div className="flex gap-4 pt-4">
            <Button
              onClick={resetCTR}
              variant="outline"
              size="lg"
              className="flex-1 h-12"
            >
              重新开始
            </Button>
            <Button
              onClick={calculateCTR}
              size="lg"
              className="flex-1 h-12 bg-orange-600 hover:bg-orange-700"
            >
              计算
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* CVR 计算器 */}
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">CVR 计算器</CardTitle>
          <CardDescription className="text-base mt-2">
            计算转化率、转化次数或点击次数
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* 转化次数 */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="conversions" className="text-lg font-semibold">
                  转化次数
                </Label>
                <p className="text-sm text-muted-foreground">
                  广告带来的转化次数
                </p>
              </div>
              <div className="w-40">
                <Input
                  id="conversions"
                  type="text"
                  placeholder="100"
                  value={cvrValues.conversions}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCVRInputChange("conversions", e.target.value)}
                  className="text-lg h-12"
                />
              </div>
            </div>
          </div>

          {/* 点击次数 */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="clicks-cvr" className="text-lg font-semibold">
                  点击次数
                </Label>
                <p className="text-sm text-muted-foreground">
                  广告获得的点击次数
                </p>
              </div>
              <div className="w-40">
                <Input
                  id="clicks-cvr"
                  type="text"
                  placeholder="1000"
                  value={cvrValues.clicks}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCVRInputChange("clicks", e.target.value)}
                  className="text-lg h-12"
                />
              </div>
            </div>
          </div>

          {/* CVR */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Label htmlFor="cvr" className="text-lg font-semibold">
                  转化率（CVR）
                </Label>
                <p className="text-sm text-muted-foreground">
                  转化率百分比
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  公式：CVR = (转化次数 / 点击次数) × 100%
                </p>
              </div>
              <div className="w-40">
                <div className="relative">
                  <Input
                    id="cvr"
                    type="text"
                    placeholder="10"
                    value={cvrValues.cvr}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCVRInputChange("cvr", e.target.value)}
                    className="text-lg h-12 pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 按钮 */}
          <div className="flex gap-4 pt-4">
            <Button
              onClick={resetCVR}
              variant="outline"
              size="lg"
              className="flex-1 h-12"
            >
              重新开始
            </Button>
            <Button
              onClick={calculateCVR}
              size="lg"
              className="flex-1 h-12 bg-orange-600 hover:bg-orange-700"
            >
              计算
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
