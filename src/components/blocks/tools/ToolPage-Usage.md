# ToolPage 组件使用指南

`ToolPage` 是一个统一的工具页面组件，整合了所有工具页面所需的子组件，通过配置化的方式简化页面构建。

## 基本用法

### 1. 使用预设配置

```tsx
import { ToolPage, ToolPagePresets } from "@/components/blocks/tools/ToolPage";
import { CPMCalculator } from "@/components/blocks/calculator/CPM/CPMCalculator";

export default function CPMCalculatorPage() {
  // 使用基础预设配置
  const config = ToolPagePresets.basic("tools.cpm");

  return (
    <ToolPage config={config}>
      {/* 插入自定义内容，如计算器组件 */}
      <CPMCalculator />
    </ToolPage>
  );
}
```

### 2. 自定义配置

```tsx
import { ToolPage } from "@/components/blocks/tools/ToolPage";
import type { ToolPageConfig } from "@/components/blocks/tools/ToolPage";

export default function CustomToolPage() {
  const config: ToolPageConfig = {
    baseNamespace: "tools.custom",
    sections: {
      hero: {
        enabled: true,
        type: "page-hero",
        namespace: "tools.custom.hero",
        showCTA: true,
      },
      features: {
        enabled: true,
        type: "features",
        namespace: "tools.custom.features",
        data: [
          { icon: "calculator", key: "calculate", color: "blue" },
          { icon: "trending", key: "analyze", color: "green" },
          { icon: "target", key: "optimize", color: "purple" },
        ],
      },
      faq: {
        enabled: true,
        namespace: "tools.custom.faq",
      },
      cta: {
        enabled: true,
        namespace: "tools.custom.cta",
      },
    },
  };

  return (
    <ToolPage config={config}>
      {/* 你的自定义内容 */}
    </ToolPage>
  );
}
```

## 预设配置类型

### 1. Basic 预设
- ToolPageHero (无 CTA 按钮)
- ToolFeatures (基础功能展示)
- ToolFAQ
- ToolCTA

```tsx
const config = ToolPagePresets.basic("tools.cpm");
```

### 2. Simple 预设
- ToolPageHero
- ToolFeatures (基础功能展示)
- ToolFAQ

```tsx
const config = ToolPagePresets.simple("tools.cpm");
```

### 3. Full 预设
包含所有组件：
- ToolPageHero (带 CTA 按钮)
- ToolFeatures2 (高级功能展示)
- ToolShowcase
- ToolFAQ
- ToolCTA

```tsx
const config = ToolPagePresets.full("tools.cpm");
```

### 4. Advanced 预设
- ToolPageHero (带 CTA 按钮)
- ToolFeatures2 (高级功能展示)
- ToolShowcase
- ToolFAQ
- ToolCTA

```tsx
const config = ToolPagePresets.advanced("tools.cpm");
```

## 自定义数据

### Features 数据

```tsx
const featuresData: FeatureItem[] = [
  { icon: "calculator", key: "calculate", color: "blue" },
  { icon: "trending", key: "analyze", color: "green" },
  { icon: "target", key: "optimize", color: "purple" },
  { icon: "chart", key: "report", color: "red" },
];

const config = ToolPagePresets.basic("tools.cpm", featuresData);
```

### Features2 数据

```tsx
const features2Data: Features2Item[] = [
  { 
    icon: "calculator", 
    key: "calculate", 
    beforeImage: "/imgs/before-calc.jpg", 
    afterImage: "/imgs/after-calc.jpg" 
  },
  { 
    icon: "trending", 
    key: "analyze", 
    beforeImage: "/imgs/before-analyze.jpg", 
    afterImage: "/imgs/after-analyze.jpg" 
  },
];

const config = ToolPagePresets.full("tools.cpm", features2Data);
```

## 组件配置详解

### Hero 配置
```tsx
hero: {
  enabled: true,
  type: "tool-hero" | "page-hero", // 选择 Hero 类型
  namespace: "tools.cpm.hero",     // 翻译命名空间
  showCTA: true,                   // 是否显示 CTA 按钮 (仅 page-hero)
  data: heroData,                  // Hero 数据 (仅 tool-hero)
}
```

### Features 配置
```tsx
features: {
  enabled: true,
  type: "features" | "features2",  // 选择 Features 类型
  namespace: "tools.cpm.features", // 翻译命名空间
  data: featuresData,              // Features 数据
}
```

### 其他组件配置
```tsx
showcase: {
  enabled: true,
  namespace: "tools.cpm.showcase",
},
faq: {
  enabled: true,
  namespace: "tools.cpm.faq",
},
cta: {
  enabled: true,
  namespace: "tools.cpm.cta",
}
```

## 翻译文件结构

使用 ToolPage 组件时，需要在翻译文件中准备相应的内容：

```json
// src/i18n/pages/tools/cpm/en.json
{
  "hero": {
    "title": "CPM Calculator",
    "subtitle": "Calculate your cost per mille easily",
    "cta_primary": "Start Calculating"
  },
  "features": {
    "title": "Powerful Features",
    "calculate": {
      "title": "Easy Calculation",
      "description": "Calculate CPM with simple inputs"
    },
    "analyze": {
      "title": "Data Analysis", 
      "description": "Analyze your advertising performance"
    }
  },
  "faq": {
    "title": "Frequently Asked Questions",
    "items": [...]
  },
  "cta": {
    "title": "Ready to get started?",
    "description": "Start using our CPM calculator today",
    "primary_button": "Get Started",
    "secondary_button": "Learn More"
  }
}
```

## 迁移现有页面

将现有的工具页面迁移到 ToolPage 组件：

### 迁移前
```tsx
export default function CPMCalculatorPage() {
  return (
    <>
      <ToolPageHero namespace="tools.cpm.hero" />
      <CPMCalculator />
      <ToolFeatures namespace="tools.cpm.features" features={featuresData} />
      <ToolFAQ namespace="tools.cpm.faq" />
      <ToolCTA namespace="tools.cpm.cta" />
    </>
  );
}
```

### 迁移后
```tsx
export default function CPMCalculatorPage() {
  const config = ToolPagePresets.basic("tools.cpm", featuresData);
  
  return (
    <ToolPage config={config}>
      <CPMCalculator />
    </ToolPage>
  );
}
```

## 优势

1. **统一管理**: 所有工具页面组件在一个地方管理
2. **配置化**: 通过配置控制组件的显示和行为
3. **预设模板**: 提供多种预设配置，快速构建页面
4. **类型安全**: 完整的 TypeScript 类型支持
5. **易于维护**: 组件更新时，所有使用的页面自动受益
6. **灵活性**: 支持完全自定义配置和部分覆盖