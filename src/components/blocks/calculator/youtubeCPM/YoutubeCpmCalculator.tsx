"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CalculatorResult {
  cost?: number;
  adImpressions?: number;
  cpm?: number;
}

export default function YoutubeCpmCalculator() {
  const [cost, setCost] = useState<string>("");
  const [adImpressions, setAdImpressions] = useState<string>("");
  const [cpm, setCpm] = useState<string>("");
  const [channelType, setChannelType] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [error, setError] = useState<string>("");

  // Calculate based on which fields are filled
  const calculate = () => {
    setError("");
    setResult(null);

    const filledFields = [cost, adImpressions, cpm].filter(
      (field) => field !== ""
    ).length;

    if (filledFields !== 2) {
      setError("Please fill out exactly two of the three fields");
      return;
    }

    const costNum = cost ? parseFloat(cost) : null;
    const impressionsNum = adImpressions ? parseFloat(adImpressions) : null;
    const cpmNum = cpm ? parseFloat(cpm) : null;

    // Validate numbers
    if (
      (costNum !== null && isNaN(costNum)) ||
      (impressionsNum !== null && isNaN(impressionsNum)) ||
      (cpmNum !== null && isNaN(cpmNum))
    ) {
      setError("Please enter valid numbers");
      return;
    }

    let calculatedResult: CalculatorResult = {};

    // Calculate based on which fields are provided
    if (costNum !== null && impressionsNum !== null) {
      // Calculate CPM
      calculatedResult = {
        cost: costNum,
        adImpressions: impressionsNum,
        cpm: (costNum / impressionsNum) * 1000,
      };
    } else if (costNum !== null && cpmNum !== null) {
      // Calculate Ad Impressions
      calculatedResult = {
        cost: costNum,
        cpm: cpmNum,
        adImpressions: (costNum / cpmNum) * 1000,
      };
    } else if (impressionsNum !== null && cpmNum !== null) {
      // Calculate Cost
      calculatedResult = {
        adImpressions: impressionsNum,
        cpm: cpmNum,
        cost: (impressionsNum * cpmNum) / 1000,
      };
    }

    setResult(calculatedResult);
  };

  const reset = () => {
    setCost("");
    setAdImpressions("");
    setCpm("");
    setChannelType("");
    setIndustry("");
    setCountry("");
    setResult(null);
    setError("");
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">YouTube CPM Calculator</h1>
        <p className="text-gray-600 mb-4">
          Use this YouTube CPM Calculator to work out how much advertisers are
          paying (or need to pay) to place ads on YouTube videos.
        </p>
        <p className="text-gray-600">
          CPM is the price per 1,000 ad impressions. Fill out any two of the
          metric boxes below to calculate the third.
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">
            Enter the stats you know below
          </h2>
          <div className="text-sm text-gray-500 space-y-1">
            <p>• Fill out any two of the metric boxes. Filling out all three will show an error.</p>
            <p>• Don&apos;t enter special characters (like $ ! % etc).</p>
          </div>
        </div>

        {/* Optional Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b">
          <div className="space-y-2">
            <Label htmlFor="channelType" className="text-sm font-medium">
              What type of channel is this for?{" "}
              <span className="text-gray-400">(optional)</span>
            </Label>
            <Select value={channelType} onValueChange={setChannelType}>
              <SelectTrigger id="channelType">
                <SelectValue placeholder="Select type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="influencer">Influencer</SelectItem>
                <SelectItem value="b2c">Business (B2C)</SelectItem>
                <SelectItem value="b2b">Business (B2B)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry" className="text-sm font-medium">
              Which industry is this for?{" "}
              <span className="text-gray-400">(optional)</span>
            </Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger id="industry">
                <SelectValue placeholder="Select industry..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="health">Health & Wellness</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="gaming">Gaming</SelectItem>
                <SelectItem value="fashion">Fashion & Beauty</SelectItem>
                <SelectItem value="food">Food & Cooking</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium">
              Select a Country{" "}
              <span className="text-gray-400">(optional)</span>
            </Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger id="country">
                <SelectValue placeholder="Select country..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="jp">Japan</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="cost" className="text-sm font-medium">
              Cost
            </Label>
            <Input
              id="cost"
              type="text"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="0.00"
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adImpressions" className="text-sm font-medium">
              Ad Impressions
            </Label>
            <Input
              id="adImpressions"
              type="text"
              value={adImpressions}
              onChange={(e) => setAdImpressions(e.target.value)}
              placeholder="0"
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpm" className="text-sm font-medium">
              CPM
            </Label>
            <Input
              id="cpm"
              type="text"
              value={cpm}
              onChange={(e) => setCpm(e.target.value)}
              placeholder="0.00"
              className="text-lg"
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <Button onClick={calculate} size="lg" className="px-8">
            Calculate
          </Button>
          <Button onClick={reset} variant="outline" size="lg">
            Reset
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <h3 className="text-xl font-semibold mb-4">Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Cost</p>
              <p className="text-3xl font-bold text-gray-900">
                ${formatNumber(result.cost || 0)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">
                Ad Impressions
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {formatNumber(result.adImpressions || 0)}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">CPM</p>
              <p className="text-3xl font-bold text-gray-900">
                ${formatNumber(result.cpm || 0)}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* CPM Formula Section */}
      <Card className="p-6 mt-6">
        <h3 className="text-2xl font-semibold mb-4">CPM Formula</h3>
        <p className="text-gray-600 mb-4">The equation for CPM is:</p>
        <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 text-center">
          <p className="text-xl mb-2 font-semibold text-gray-700">
            Cost Per Thousand (CPM) Formula
          </p>
          <p className="text-sm text-gray-600 mb-4">
            How to calculate the amount paid by advertisers for 1,000 impressions
          </p>
          <div className="text-2xl font-mono font-bold text-blue-900">
            CPM = (Total Amount Spent ÷ Total Measured Impressions) × 1000
          </div>
        </div>
      </Card>

      {/* What is CPM Section */}
      <Card className="p-6 mt-6">
        <h3 className="text-2xl font-semibold mb-4">What is a CPM?</h3>
        <p className="text-gray-600 mb-4">
          CPM stands for Cost Per Thousand Impressions (with M standing for
          mille – which is French for 1,000). It is one of the most common ad
          pricing models.
        </p>
        <p className="text-gray-600 mb-4">
          It is different to RPM – which is Revenue Per Thousand. A CPM is what
          the advertiser pays, and the RPM is what a creator receives.
        </p>
        <p className="text-gray-600">The difference between the two is due to:</p>
        <ul className="list-disc list-inside space-y-2 mt-2 text-gray-600">
          <li>
            <strong>The revenue split with YouTube.</strong> Advertisers aren&apos;t
            just paying you, they are paying YouTube as well. This means they
            keep between 45%-60% of the amount advertisers pay.
          </li>
          <li>
            <strong>Taxes.</strong> Depending on where you are located, your
            YouTube revenue might be subject to tax.
          </li>
          <li>
            <strong>Differences in counting.</strong> CPM counts the cost of
            1,000 ad impressions. RPM counts the revenue from 1,000 video views.
          </li>
        </ul>
      </Card>
    </div>
  );
}
