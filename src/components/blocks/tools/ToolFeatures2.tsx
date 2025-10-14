"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import BeforeAfterSlider from "@/components/ui/before-after-slider";
import {
  Calculator, TrendingUp, Target, BarChart3, Zap, Shield,
  Users, Award, CheckCircle2, Sparkles, type LucideIcon
} from "lucide-react";

// Icon mapping - all available icons
const ICON_MAP: Record<string, LucideIcon> = {
  calculator: Calculator,
  trending: TrendingUp,
  target: Target,
  chart: BarChart3,
  zap: Zap,
  shield: Shield,
  users: Users,
  award: Award,
  check: CheckCircle2,
  sparkles: Sparkles,
};

export interface Features2Item {
  icon: keyof typeof ICON_MAP;
  key: string; // Translation key for title and description
  beforeImage: string; // Before image URL
  afterImage: string; // After image URL
}

interface ToolFeatures2Props {
  namespace: string; // e.g., "tools.roi.features2"
  items: Features2Item[];
}

export function ToolFeatures2({ namespace, items }: ToolFeatures2Props) {
  const t = useTranslations(namespace);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // 渐进式展示内容
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // 自动轮播功能（可选）
  useEffect(() => {
    if (items && items.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % items.length);
      }, 8000); // 8秒切换一次
      return () => clearInterval(interval);
    }
  }, [items]);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    setExpandedIndex((prev) => (prev === index ? null : index));
    // 添加点击反馈
    const element = document.getElementById(`feature-item-${index}`);
    if (element) {
      element.style.transform = "scale(0.95)";
      setTimeout(() => {
        element.style.transform = "scale(1)";
      }, 150);
    }
  };

  return (
    <section className="py-32 bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-30" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-0 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-float-delayed" />
      
      <div className="container relative z-10">
        <div className="mx-auto grid gap-20 lg:grid-cols-2">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {t.has("label") && (
              <Badge
                className={`mb-6 text-sm font-medium bg-primary/10 text-primary border-primary/20 px-4 py-2 transition-all duration-700 delay-200 ${showContent ? "opacity-100" : "opacity-0"}`}
              >
                {t("label")}
              </Badge>
            )}
            <h2 className={`mb-8 text-pretty text-4xl font-bold lg:text-5xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent transition-all duration-700 delay-300 ${showContent ? "opacity-100" : "opacity-0"}`}>
              {t("title")}
            </h2>
            <p className={`mb-12 max-w-xl text-muted-foreground lg:max-w-none lg:text-xl leading-relaxed transition-all duration-700 delay-400 ${showContent ? "opacity-100" : "opacity-0"}`}>
              {t("description")}
            </p>

            {/* Feature List */}
            <div className="space-y-6">
              {items.map((item, i) => {
                const IconComponent = ICON_MAP[item.icon];
                return (
                  <div
                    key={i}
                    id={`feature-item-${i}`}
                    className={`group p-6 rounded-xl border cursor-pointer transition-all duration-500 ease-out transform hover:scale-[1.02] overflow-hidden backdrop-blur-sm ${
                      activeIndex === i
                        ? "border-primary/50 bg-gradient-to-r from-primary/10 to-primary/5 shadow-xl shadow-primary/20"
                        : hoveredIndex === i
                        ? "border-primary/30 bg-gradient-to-r from-primary/8 to-primary/3 shadow-lg"
                        : "border-border/50 bg-card/50 hover:border-primary/30 hover:bg-card/80 hover:shadow-md"
                    } ${showContent ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                    style={{
                      transitionDelay: `${500 + i * 100}ms`,
                      transform: hoveredIndex === i ? "translateY(-2px)" : "translateY(0)"
                    }}
                    onClick={() => handleItemClick(i)}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`flex size-10 items-center justify-center rounded-xl transition-all duration-300 shadow-md ${
                        activeIndex === i
                          ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground scale-110 shadow-primary/25"
                          : hoveredIndex === i
                          ? "bg-gradient-to-r from-primary/20 to-primary/10 text-primary scale-105 shadow-primary/10"
                          : "bg-muted/50 hover:bg-muted"
                      }`}>
                        <IconComponent
                          className={`size-5 transition-all duration-300 ${
                            activeIndex === i || hoveredIndex === i ? "rotate-12" : ""
                          }`}
                        />
                      </div>
                      <h3 className={`font-semibold text-lg lg:text-xl transition-all duration-300 ${
                        expandedIndex === i ? "" : "line-clamp-1 group-hover:line-clamp-none"
                      } ${
                        activeIndex === i ? "text-primary" : hoveredIndex === i ? "text-primary/80" : "text-foreground"
                      }`}>
                        {t(`items.${item.key}.title`)}
                      </h3>
                      {/* 活跃状态指示器 */}
                      {activeIndex === i && (
                        <div className="ml-auto">
                          <div className="w-3 h-3 bg-gradient-to-r from-primary to-primary/80 rounded-full animate-pulse shadow-md shadow-primary/25" />
                        </div>
                      )}
                    </div>
                    <p className={`text-muted-foreground lg:text-lg ml-14 leading-relaxed transition-all duration-300 ${
                      expandedIndex === i ? "" : "line-clamp-2 group-hover:line-clamp-none"
                    } ${
                      activeIndex === i ? "text-foreground/90" : hoveredIndex === i ? "text-foreground/80" : ""
                    }`} aria-expanded={expandedIndex === i}
                    >
                      {t(`items.${item.key}.description`)}
                    </p>

                    {/* 悬停时的额外信息提示 */}
                    {hoveredIndex === i && t.has("hover_tip") && (
                      <div className="mt-4 ml-14 p-3 bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg text-sm text-foreground/80 animate-in slide-in-from-top-2 duration-200 backdrop-blur-sm">
                        {t("hover_tip")}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* 进度指示器 */}
            {items && items.length > 1 && (
              <div className={`mt-10 flex justify-center gap-3 transition-all duration-700 delay-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-110 ${
                      activeIndex === i
                        ? "bg-gradient-to-r from-primary to-primary/80 shadow-md shadow-primary/25 scale-125"
                        : "bg-muted hover:bg-primary/50 shadow-sm"
                    }`}
                    aria-label={`Switch to feature ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Before/After Slider */}
          <div className={`flex items-center justify-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {items && items[activeIndex] && (
              <div className="relative group animate-float">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <BeforeAfterSlider
                  beforeImage={items[activeIndex].beforeImage}
                  afterImage={items[activeIndex].afterImage}
                  beforeAlt={t.has("slider_before_alt") ? t("slider_before_alt") : "Before"}
                  afterAlt={t.has("slider_after_alt") ? t("slider_after_alt") : "After"}
                  className="relative w-full h-96 lg:h-[500px] transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02] rounded-xl overflow-hidden border border-border/50 backdrop-blur-sm"
                />

                {/* 悬停时的操作提示 */}
                {t.has("slider_hover_title") && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <div className="text-white text-center p-6">
                      <p className="text-xl font-semibold mb-3">{t("slider_hover_title")}</p>
                      {t.has("slider_hover_description") && (
                        <p className="text-base opacity-90 leading-relaxed">{t("slider_hover_description")}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* 当前功能标签 */}
                <div className="absolute top-6 left-6 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm animate-in slide-in-from-top-2 duration-300">
                  {t(`items.${items[activeIndex].key}.title`)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
