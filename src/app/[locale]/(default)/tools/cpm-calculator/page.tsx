import ToolPage, { ToolPagePresets, type Features2Item } from "@/components/blocks/tools";
import { CPMCalculator } from "@/components/blocks/calculator/CPM/CPMCalculator";

export default function CPMCalculatorPage() {
  // 定义CPM计算器的高级功能特性数据（用于Features2组件）
  const features2Data: Features2Item[] = [
    { 
      icon: "calculator", 
      key: "calculate", 
      beforeImage: "/imgs/features/cpm-before-calc.jpg", 
      afterImage: "/imgs/features/cpm-after-calc.jpg" 
    },
    { 
      icon: "trending", 
      key: "analyze", 
      beforeImage: "/imgs/features/cpm-before-analyze.jpg", 
      afterImage: "/imgs/features/cpm-after-analyze.jpg" 
    },
    { 
      icon: "target", 
      key: "optimize", 
      beforeImage: "/imgs/features/cpm-before-optimize.jpg", 
      afterImage: "/imgs/features/cpm-after-optimize.jpg" 
    },
    { 
      icon: "chart", 
      key: "report", 
      beforeImage: "/imgs/features/cpm-before-report.jpg", 
      afterImage: "/imgs/features/cpm-after-report.jpg" 
    },
  ];

  // 使用完整预设配置，包含所有组件：Hero + Features2 + Showcase + FAQ + CTA
  const config = ToolPagePresets.full("tools.cpm", features2Data);

  return (
    <ToolPage config={config}>
      {/* 插入CPM计算器组件作为主要内容 */}
      <div className="max-w-4xl mx-auto">
        <CPMCalculator />
      </div>
    </ToolPage>
  );
}