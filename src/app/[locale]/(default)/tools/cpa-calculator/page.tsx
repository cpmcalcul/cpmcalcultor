import ToolPage, { ToolPagePresets, type FeatureItem } from "@/components/blocks/tools";
import { CPACalculator } from "@/components/blocks/calculator/CPA/CPACalculator";

export default function CPACalculatorPage() {
  // 定义CPA计算器的功能特性数据
  const featuresData: FeatureItem[] = [
    { icon: "calculator", key: "calculate", color: "red" },
    { icon: "trending", key: "analyze", color: "blue" },
    { icon: "target", key: "optimize", color: "purple" },
  ];

  // 使用简单预设配置，包含 Hero + Features + FAQ
  const config = ToolPagePresets.simple("tools.cpa", featuresData);

  return (
    <ToolPage config={config}>
      {/* 插入CPA计算器组件作为主要内容 */}
      <div className="max-w-4xl mx-auto">
        <CPACalculator />
      </div>
    </ToolPage>
  );
}