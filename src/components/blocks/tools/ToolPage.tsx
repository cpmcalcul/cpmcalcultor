"use client";

import { useTranslations } from "next-intl";
import { ToolPageHero } from "./ToolPageHero";
import { ToolFeatures, type FeatureItem } from "./ToolFeatures";
import { ToolFeatures2, type Features2Item } from "./ToolFeatures2";
import { ToolShowcase } from "./ToolShowcase";
import { ToolFAQ } from "./ToolFAQ";
import { ToolCTA } from "./ToolCTA";
import ToolHero from "./ToolHero";
import { Hero as HeroType } from "@/types/blocks/hero";

export interface ToolPageConfig {
  // 组件显示配置
  sections: {
    hero?: {
      enabled: boolean;
      type: "tool-hero" | "page-hero"; // 选择使用哪种 Hero 组件
      data?: HeroType; // 用于 ToolHero 的数据
      namespace?: string; // 用于 ToolPageHero 的命名空间
      showCTA?: boolean; // 仅用于 ToolPageHero
    };
    features?: {
      enabled: boolean;
      type: "features" | "features2"; // 选择使用哪种 Features 组件
      namespace: string;
      data?: FeatureItem[] | Features2Item[]; // 功能项数据
    };
    showcase?: {
      enabled: boolean;
      namespace: string;
    };
    faq?: {
      enabled: boolean;
      namespace: string;
    };
    cta?: {
      enabled: boolean;
      namespace: string;
    };
  };
  
  // 全局配置
  baseNamespace?: string; // 基础命名空间，如 "tools.cpm"
}

interface ToolPageProps {
  config: ToolPageConfig;
  children?: React.ReactNode; // 允许插入自定义内容，如计算器组件
}

export function ToolPage({ config, children }: ToolPageProps) {
  const { sections, baseNamespace } = config;

  // 辅助函数：获取完整的命名空间
  const getNamespace = (section: string, customNamespace?: string) => {
    if (customNamespace) return customNamespace;
    if (baseNamespace) return `${baseNamespace}.${section}`;
    return section;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      {sections.hero?.enabled && (
        <>
          {sections.hero.type === "tool-hero" && sections.hero.data && (
            <ToolHero hero={sections.hero.data} />
          )}
          {sections.hero.type === "page-hero" && sections.hero.namespace && (
            <ToolPageHero 
              namespace={sections.hero.namespace}
              showCTA={sections.hero.showCTA || false}
            />
          )}
        </>
      )}

      {/* Custom Content (e.g., Calculator) */}
      {children && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            {children}
          </div>
        </section>
      )}

      {/* Features Section */}
      {sections.features?.enabled && (
        <>
          {sections.features.type === "features" && sections.features.data && (
            <ToolFeatures 
              namespace={sections.features.namespace} 
              features={sections.features.data as FeatureItem[]}
            />
          )}
          {sections.features.type === "features2" && sections.features.data && (
            <ToolFeatures2 
              namespace={sections.features.namespace}
              items={sections.features.data as Features2Item[]}
            />
          )}
        </>
      )}

      {/* Showcase Section */}
      {sections.showcase?.enabled && (
        <ToolShowcase namespace={sections.showcase.namespace} />
      )}

      {/* FAQ Section */}
      {sections.faq?.enabled && (
        <ToolFAQ namespace={sections.faq.namespace} />
      )}

      {/* CTA Section */}
      {sections.cta?.enabled && (
        <ToolCTA namespace={sections.cta.namespace} />
      )}
    </div>
  );
}

// 预设配置示例
const ToolPagePresets = {
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
            afterImage: "/imgs/features/after-1.jpg" 
          },
          { 
            icon: "trending", 
            key: "analyze", 
            beforeImage: "/imgs/features/before-2.jpg", 
            afterImage: "/imgs/features/after-2.jpg" 
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
        type: "features2", // 使用更高级的 Features2 组件
        namespace: `${baseNamespace}.features`,
        data: features2Data || [
          { 
            icon: "calculator", 
            key: "calculate", 
            beforeImage: "/imgs/features/before-1.jpg", 
            afterImage: "/imgs/features/after-1.jpg" 
          },
          { 
            icon: "trending", 
            key: "analyze", 
            beforeImage: "/imgs/features/before-2.jpg", 
            afterImage: "/imgs/features/after-2.jpg" 
          },
          { 
            icon: "target", 
            key: "optimize", 
            beforeImage: "/imgs/features/before-3.jpg", 
            afterImage: "/imgs/features/after-3.jpg" 
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

// 导出组件和预设
export { ToolPage as default, ToolPagePresets };