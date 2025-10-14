import ToolPage, { ToolPagePresets, type FeatureItem } from "@/components/blocks/tools";
import { CPMCalculator } from "@/components/blocks/calculator/CPM/CPMCalculator";

export default function CPMCalculatorPage() {
  // 定义CPM计算器的功能特性
  const featuresData: FeatureItem[] = [
    { icon: "calculator", key: "calculate", color: "blue" },
    { icon: "trending", key: "analyze", color: "green" },
    { icon: "target", key: "optimize", color: "purple" },
    { icon: "chart", key: "report", color: "red" },
  ];

  // 使用基础预设配置
  const config = ToolPagePresets.basic("tools.cpm", featuresData);

  return (
    <ToolPage config={config}>
      <div className="max-w-4xl mx-auto">
        <CPMCalculator />
      </div>
    </ToolPage>
  );
}