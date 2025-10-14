import ToolPage, { ToolPagePresets, type FeatureItem } from "@/components/blocks/tools";
import { CTRCalculator } from "@/components/blocks/calculator/CTR/CTRCalculator";

export default function CTRCalculatorPage() {
  // 定义CTR计算器的功能特性数据
  const featuresData: FeatureItem[] = [
    { icon: "calculator", key: "calculate", color: "orange" },
    { icon: "trending", key: "analyze", color: "blue" },
    { icon: "target", key: "optimize", color: "purple" },
  ];

  // 使用简单预设配置，包含 Hero + Features + FAQ
  const config = ToolPagePresets.simple("tools.ctr", featuresData);

  return (
    <ToolPage config={config}>
      {/* 插入CTR计算器组件作为主要内容 */}
      <div className="max-w-4xl mx-auto">
        <CTRCalculator />
      </div>
    </ToolPage>
  );
}