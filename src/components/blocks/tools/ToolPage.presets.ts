// Server-safe presets for ToolPage (no 'use client')
import type { ToolPageConfig } from "./ToolPage";
import type { FeatureItem } from "./ToolFeatures";
import type { Features2Item } from "./ToolFeatures2";

export const ToolPagePresets = {
  // 基础工具页面配置
  basic: (baseNamespace: string, featuresData?: FeatureItem[]): ToolPageConfig => ({
    baseNamespace,
    sections: {
      hero: {
        enabled: true,
        type: "page-hero",
        namespace: `${baseNamespace}.hero`,
        showCTA: false,
      },
      features: {
        enabled: true,
        type: "features",
        namespace: `${baseNamespace}.features`,
        data: featuresData || [
          { icon: "calculator", key: "calculate", color: "blue" },
          { icon: "trending", key: "analyze", color: "green" },
          { icon: "target", key: "optimize", color: "purple" },
        ],
      },
      faq: {
        enabled: true,
        namespace: `${baseNamespace}.faq`,
      },
      cta: {
        enabled: true,
        namespace: `${baseNamespace}.cta`,
      },
    },
  }),

  // 完整工具页面配置（包含所有组件）
  full: (baseNamespace: string, features2Data?: Features2Item[]): ToolPageConfig => ({
    baseNamespace,
    sections: {
      hero: {
        enabled: true,
        type: "page-hero",
        namespace: `${baseNamespace}.hero`,
        showCTA: true,
      },
      features: {
        enabled: true,
        type: "features2",
        namespace: `${baseNamespace}.features`,
        data: features2Data || [
          {
            icon: "calculator",
            key: "calculate",
            beforeImage: "/imgs/features/before-1.jpg",
            afterImage: "/imgs/features/after-1.jpg",
          },
          {
            icon: "trending",
            key: "analyze",
            beforeImage: "/imgs/features/before-2.jpg",
            afterImage: "/imgs/features/after-2.jpg",
          },
        ],
      },
      showcase: {
        enabled: true,
        namespace: `${baseNamespace}.showcase`,
      },
      faq: {
        enabled: true,
        namespace: `${baseNamespace}.faq`,
      },
      cta: {
        enabled: true,
        namespace: `${baseNamespace}.cta`,
      },
    },
  }),

  // 简单工具页面配置（仅包含核心组件）
  simple: (baseNamespace: string, featuresData?: FeatureItem[]): ToolPageConfig => ({
    baseNamespace,
    sections: {
      hero: {
        enabled: true,
        type: "page-hero",
        namespace: `${baseNamespace}.hero`,
      },
      features: {
        enabled: true,
        type: "features",
        namespace: `${baseNamespace}.features`,
        data: featuresData || [
          { icon: "calculator", key: "calculate", color: "blue" },
          { icon: "trending", key: "analyze", color: "green" },
        ],
      },
      faq: {
        enabled: true,
        namespace: `${baseNamespace}.faq`,
      },
    },
  }),

  // 高级工具页面配置（包含高级功能展示）
  advanced: (baseNamespace: string, features2Data?: Features2Item[]): ToolPageConfig => ({
    baseNamespace,
    sections: {
      hero: {
        enabled: true,
        type: "page-hero",
        namespace: `${baseNamespace}.hero`,
        showCTA: true,
      },
      features: {
        enabled: true,
        type: "features2",
        namespace: `${baseNamespace}.features`,
        data: features2Data || [
          {
            icon: "calculator",
            key: "calculate",
            beforeImage: "/imgs/features/before-1.jpg",
            afterImage: "/imgs/features/after-1.jpg",
          },
          {
            icon: "trending",
            key: "analyze",
            beforeImage: "/imgs/features/before-2.jpg",
            afterImage: "/imgs/features/after-2.jpg",
          },
          {
            icon: "target",
            key: "optimize",
            beforeImage: "/imgs/features/before-3.jpg",
            afterImage: "/imgs/features/after-3.jpg",
          },
        ],
      },
      showcase: {
        enabled: true,
        namespace: `${baseNamespace}.showcase`,
      },
      faq: {
        enabled: true,
        namespace: `${baseNamespace}.faq`,
      },
      cta: {
        enabled: true,
        namespace: `${baseNamespace}.cta`,
      },
    },
  }),
};

export default ToolPagePresets;


