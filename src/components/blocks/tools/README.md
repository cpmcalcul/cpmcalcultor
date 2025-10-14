# Tool Page Components

通用的工具页面组件系统，用于创建一致的计算器工具页面。每个工具页面可以使用这些可复用组件，并通过独立的翻译文件自定义内容。

## 组件列表

### 1. ToolFeatures

展示工具的主要功能特性（4个卡片网格布局）。

**Props:**
- `namespace: string` - i18n 命名空间（例如：`"tools.roi.features"`）
- `features: FeatureItem[]` - 功能列表数组

**FeatureItem 结构:**
```typescript
{
  icon: "calculator" | "trending" | "target" | "chart" | "zap" | "shield" | "users" | "award", // 图标名称（字符串）
  key: string,             // 嵌套对象的 key（例如："calculate", "optimize"）
  color: string           // Tailwind 颜色类（例如："text-blue-600"）
}
```

**可用图标:**
- `"calculator"` - Calculator 图标
- `"trending"` - TrendingUp 图标
- `"target"` - Target 图标
- `"chart"` - BarChart3 图标
- `"zap"` - Zap 图标（闪电）
- `"shield"` - Shield 图标（盾牌）
- `"users"` - Users 图标（用户）
- `"award"` - Award 图标（奖励）

**翻译结构示例:**
```json
{
  "features": {
    "title": "Powerful ROI Analysis Features",
    "description": "Everything you need to measure and optimize...",
    "calculate": {
      "title": "Quick Calculation",
      "description": "Instantly calculate ROI..."
    },
    "optimize": {
      "title": "Optimize Returns",
      "description": "Identify high-performing campaigns..."
    }
  }
}
```

### 2. ToolShowcase

展示工具如何工作，包含优势列表和展示图片（左右布局）。

**Props:**
- `namespace: string` - i18n 命名空间（例如：`"tools.roi.showcase"`）

**翻译结构示例:**
```json
{
  "showcase": {
    "badge": "How It Works",
    "title": "Maximize Your Marketing ROI",
    "description": "Our ROI calculator helps you...",
    "image_url": "/images/roi-showcase.png",
    "image_alt": "ROI Calculator Dashboard",
    "benefits": [
      "Calculate precise ROI percentages in seconds",
      "Compare campaign performance across channels",
      "Forecast revenue based on investment levels"
    ]
  }
}
```

### 3. ToolFAQ

常见问题解答部分（手风琴样式）。

**Props:**
- `namespace: string` - i18n 命名空间（例如：`"tools.roi.faq"`）

**翻译结构示例:**
```json
{
  "faq": {
    "title": "Frequently Asked Questions",
    "description": "Common questions about ROI calculations...",
    "items": [
      {
        "title": "What is ROI in marketing?",
        "description": "ROI (Return on Investment) measures..."
      }
    ]
  }
}
```

### 4. ToolCTA

行动号召部分，包含两个按钮（主按钮和次按钮）。

**Props:**
- `namespace: string` - i18n 命名空间（例如：`"tools.roi.cta"`）

**翻译结构示例:**
```json
{
  "cta": {
    "title": "Ready to Optimize Your Marketing ROI?",
    "description": "Start calculating and improving...",
    "primary_button": "Try More Tools",
    "secondary_button": "View Documentation",
    "primary_link": "/tools",
    "secondary_link": "/docs"
  }
}
```

## 完整使用示例

### 1. 创建翻译文件

在 `src/i18n/pages/tools/[tool-name]/` 目录下创建 `en.json` 和 `zh.json`：

```
src/i18n/pages/tools/
├── roi/
│   ├── en.json
│   └── zh.json
├── cpa/
│   ├── en.json
│   └── zh.json
└── ctr/
    ├── en.json
    └── zh.json
```

### 2. 配置 i18n 加载

在 `src/i18n/request.ts` 中添加新工具的翻译加载：

```typescript
const toolsRoiMessages = (await import(`./pages/tools/roi/${locale}.json`)).default;

pageTranslations = {
  tools: {
    roi: toolsRoiMessages,
    // ... other tools
  }
};
```

### 3. 创建工具页面

在 `src/app/[locale]/(default)/tools/[tool-name]/page.tsx` 中使用组件：

```typescript
import { useTranslations } from "next-intl";
import { YourCalculator } from "@/components/blocks/calculator/...";
import { ToolFeatures } from "@/components/blocks/tools/ToolFeatures";
import { ToolShowcase } from "@/components/blocks/tools/ToolShowcase";
import { ToolFAQ } from "@/components/blocks/tools/ToolFAQ";
import { ToolCTA } from "@/components/blocks/tools/ToolCTA";

export default function ToolPage() {
  const t = useTranslations("tools.roi.page");

  // 使用图标名称字符串，不需要导入 Lucide 组件
  const features = [
    {
      icon: "calculator" as const,
      key: "calculate",
      color: "text-blue-600",
    },
    {
      icon: "target" as const,
      key: "optimize",
      color: "text-green-600",
    },
    // ... more features
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1>{t("title")}</h1>
          <p>{t("description")}</p>
        </div>

        {/* Calculator */}
        <YourCalculator />

        {/* Features */}
        <ToolFeatures namespace="tools.roi.features" features={features} />

        {/* Showcase */}
        <ToolShowcase namespace="tools.roi.showcase" />

        {/* FAQ */}
        <ToolFAQ namespace="tools.roi.faq" />

        {/* CTA */}
        <ToolCTA namespace="tools.roi.cta" />
      </div>
    </div>
  );
}
```

## 翻译文件完整结构模板

```json
{
  "page": {
    "title": "Tool Name - Description",
    "description": "SEO description"
  },
  "calculator": {
    // 计算器特定的翻译
  },
  "features": {
    "title": "Main title",
    "description": "Subtitle",
    "calculate": {
      "title": "Feature 1 title",
      "description": "Feature 1 description"
    },
    "optimize": {
      "title": "Feature 2 title",
      "description": "Feature 2 description"
    },
    "analyze": {
      "title": "Feature 3 title",
      "description": "Feature 3 description"
    },
    "report": {
      "title": "Feature 4 title",
      "description": "Feature 4 description"
    }
  },
  "showcase": {
    "badge": "Badge text",
    "title": "Section title",
    "description": "Section description",
    "image_url": "/images/...",
    "image_alt": "Image alt text",
    "benefits": [
      "Benefit 1",
      "Benefit 2",
      "Benefit 3"
    ]
  },
  "cta": {
    "title": "CTA title",
    "description": "CTA description",
    "primary_button": "Primary button text",
    "secondary_button": "Secondary button text",
    "primary_link": "/link1",
    "secondary_link": "/link2"
  },
  "faq": {
    "title": "FAQ title",
    "description": "FAQ description",
    "items": [
      {
        "title": "Question 1",
        "description": "Answer 1"
      }
    ]
  }
}
```

## 优势

1. **模块化**: 每个组件独立，易于维护和更新
2. **可复用**: 所有工具页面共享相同的组件
3. **翻译隔离**: 每个工具有独立的翻译文件，避免单个 JSON 文件过大
4. **类型安全**: 使用 TypeScript 确保正确的 props 传递
5. **一致性**: 所有工具页面保持一致的视觉和交互体验
6. **灵活性**: 可以选择性使用组件（不需要全部使用）

## 注意事项

- 确保在 `src/i18n/request.ts` 中正确配置翻译加载
- 图片路径应放在 `public/images/` 目录下
- **图标使用字符串名称**，不需要从 `lucide-react` 导入组件（避免 Server Component 错误）
- 每个工具的翻译文件应该独立维护
- 翻译键不能包含点号 `.`，使用嵌套对象结构代替

## 常见问题

**Q: 为什么不能直接传递 Lucide 图标组件？**

A: Next.js Server Components 不能将 React 组件（如 Lucide 图标）直接传递给 Client Components。我们使用字符串名称在客户端组件内部映射到对应的图标组件。

**Q: 如何添加新的图标？**

A: 在 `ToolFeatures.tsx` 的 `ICON_MAP` 中添加新的图标映射：
```typescript
const ICON_MAP: Record<string, LucideIcon> = {
  // 现有图标...
  newIcon: NewIconComponent,
};
```
