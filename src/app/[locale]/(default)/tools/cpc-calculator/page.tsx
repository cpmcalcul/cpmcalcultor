import ToolPage, { ToolPagePresets, type FeatureItem } from "@/components/blocks/tools";
import { CPCCalculator } from "@/components/blocks/calculator/CPC/CPCCalculator";

export default function CPCCalculatorPage() {
  // 定义CPC计算器的功能特性数据
  const featuresData: FeatureItem[] = [
    { icon: "calculator", key: "calculate", color: "green" },
    { icon: "trending", key: "analyze", color: "blue" },
    { icon: "target", key: "optimize", color: "purple" },
  ];

  // 使用简单预设配置，包含 Hero + Features + FAQ
  const config = ToolPagePresets.simple("tools.cpc", featuresData);

  return (
    <ToolPage config={config}>
      {/* 插入CPC计算器组件作为主要内容 */}
      <div className="max-w-4xl mx-auto">
        <CPCCalculator />
      </div>
    </ToolPage>
  );
}