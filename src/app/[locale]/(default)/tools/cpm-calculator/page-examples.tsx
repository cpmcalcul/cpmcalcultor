// 这个文件展示了如何使用不同的 ToolPage 预设配置
// 可以根据需要复制相应的配置到实际页面中

import ToolPage, { ToolPagePresets, type FeatureItem, type Features2Item } from "@/components/blocks/tools";
import { CPMCalculator } from "@/components/blocks/calculator/CPM/CPMCalculator";

// ========== 示例 1: Basic 预设 (当前CPM页面使用) ==========
export function CPMCalculatorBasic() {
  const featuresData: FeatureItem[] = [
    { icon: "calculator", key: "calculate", color: "blue" },
    { icon: "trending", key: "analyze", color: "green" },
    { icon: "target", key: "optimize", color: "purple" },
    { icon: "chart", key: "report", color: "red" },
  ];

  const config = ToolPagePresets.basic("tools.cpm", featuresData);

  return (
    <ToolPage config={config}>
      <div className="max-w-4xl mx-auto">
        <CPMCalculator />
      </div>
    </ToolPage>
  );
}

// ========== 示例 2: Simple 预设 (更简洁的页面) ==========
export function CPMCalculatorSimple() {
  const featuresData: FeatureItem[] = [
    { icon: "calculator", key: "calculate", color: "blue" },
    { icon: "trending", key: "analyze", color: "green" },
  ];

  const config = ToolPagePresets.simple("tools.cpm", featuresData);

  return (
    <ToolPage config={config}>
      <div className="max-w-4xl mx-auto">
        <CPMCalculator />
      </div>
    </ToolPage>
  );
}

// ========== 示例 3: Full 预设 (包含所有组件) ==========
export function CPMCalculatorFull() {
  const features2Data: Features2Item[] = [
    { 
      icon: "calculator", 
      key: "calculate", 
      beforeImage: "/imgs/features/cpm-before-1.jpg", 
      afterImage: "/imgs/features/cpm-after-1.jpg" 
    },
    { 
      icon: "trending", 
      key: "analyze", 
      beforeImage: "/imgs/features/cpm-before-2.jpg", 
      afterImage: "/imgs/features/cpm-after-2.jpg" 
    },
  ];

  const config = ToolPagePresets.full("tools.cpm", features2Data);

  return (
    <ToolPage config={config}>
      <div className="max-w-4xl mx-auto">
        <CPMCalculator />
      </div>
    </ToolPage>
  );
}

// ========== 示例 4: Advanced 预设 (高级功能展示) ==========
export function CPMCalculatorAdvanced() {
  const features2Data: Features2Item[] = [
    { 
      icon: "calculator", 
      key: "calculate", 
      beforeImage: "/imgs/features/cpm-before-1.jpg", 
      afterImage: "/imgs/features/cpm-after-1.jpg" 
    },
    { 
      icon: "trending", 
      key: "analyze", 
      beforeImage: "/imgs/features/cpm-before-2.jpg", 
      afterImage: "/imgs/features/cpm-after-2.jpg" 
    },
    { 
      icon: "target", 
      key: "optimize", 
      beforeImage: "/imgs/features/cpm-before-3.jpg", 
      afterImage: "/imgs/features/cpm-after-3.jpg" 
    },
  ];

  const config = ToolPagePresets.advanced("tools.cpm", features2Data);

  return (
    <ToolPage config={config}>
      <div className="max-w-4xl mx-auto">
        <CPMCalculator />
      </div>
    </ToolPage>
  );
}

// ========== 示例 5: 完全自定义配置 ==========
export function CPMCalculatorCustom() {
  const featuresData: FeatureItem[] = [
    { icon: "calculator", key: "calculate", color: "blue" },
    { icon: "trending", key: "analyze", color: "green" },
    { icon: "target", key: "optimize", color: "purple" },
  ];

  // 自定义配置
  const config = {
    baseNamespace: "tools.cpm",
    sections: {
      hero: {
        enabled: true,
        type: "page-hero" as const,
        namespace: "tools.cpm.hero",
        showCTA: true,
      },
      features: {
        enabled: true,
        type: "features" as const,
        namespace: "tools.cpm.features",
        data: featuresData,
      },
      showcase: {
        enabled: false, // 禁用 showcase
        namespace: "tools.cpm.showcase",
      },
      faq: {
        enabled: true,
        namespace: "tools.cpm.faq",
      },
      cta: {
        enabled: true,
        namespace: "tools.cpm.cta",
      },
    },
  };

  return (
    <ToolPage config={config}>
      <div className="max-w-4xl mx-auto">
        <CPMCalculator />
      </div>
    </ToolPage>
  );
}

// ========== 当前推荐配置 ==========
// 对于CPM计算器，推荐使用 Basic 预设，因为它包含了：
// 1. ToolPageHero - 页面标题和描述
// 2. ToolFeatures - 功能特性展示
// 3. ToolFAQ - 常见问题解答
// 4. ToolCTA - 行动号召
// 
// 这个配置平衡了功能完整性和页面加载性能

export default CPMCalculatorBasic;