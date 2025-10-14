"use client";

import { useState, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import BeforeAfterSlider from "@/components/ui/before-after-slider";
import Icon from "@/components/icon";
import { Section as SectionType } from "@/types/blocks/section";

export default function Feature2({ section }: { section: SectionType }) {
  if (section.disabled) {
    return null;
  }

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
    if (section.items && section.items.length > 1) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % (section.items?.length || 1));
      }, 8000); // 8秒切换一次
      return () => clearInterval(interval);
    }
  }, [section.items]);

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
    <section id={section.name} className="py-32">
      <div className="container">
        <div className="mx-auto grid gap-20 lg:grid-cols-2">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {section.label && (
              <Badge 
                variant="outline" 
                className={`mb-4 transition-all duration-700 delay-200 ${showContent ? "opacity-100" : "opacity-0"}`}
              >
                {section.label}
              </Badge>
            )}
            <h2 className={`mb-6 text-pretty text-3xl font-bold lg:text-4xl transition-all duration-700 delay-300 ${showContent ? "opacity-100" : "opacity-0"}`}>
              {section.title}
            </h2>
            <p className={`mb-8 max-w-xl text-muted-foreground lg:max-w-none lg:text-lg transition-all duration-700 delay-400 ${showContent ? "opacity-100" : "opacity-0"}`}>
              {section.description}
            </p>
            
            {/* Feature List */}
            <div className="space-y-6">
              {section.items?.map((item, i) => (
                <div
                  key={i}
                  id={`feature-item-${i}`}
                  className={`group p-4 rounded-lg border cursor-pointer transition-all duration-500 ease-out transform hover:scale-[1.02] overflow-hidden ${
                    activeIndex === i
                      ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
                      : hoveredIndex === i
                      ? "border-primary/70 bg-primary/5 shadow-md"
                      : "border-muted bg-background hover:border-primary/50"
                  } ${showContent ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                  style={{
                    transitionDelay: `${500 + i * 100}ms`,
                    transform: hoveredIndex === i ? "translateY(-2px)" : "translateY(0)"
                  }}
                  onClick={() => handleItemClick(i)}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {item.icon && (
                      <div className={`flex size-8 items-center justify-center rounded-lg transition-all duration-300 ${
                        activeIndex === i 
                          ? "bg-primary text-primary-foreground scale-110" 
                          : hoveredIndex === i
                          ? "bg-primary/20 text-primary scale-105"
                          : "bg-muted"
                      }`}>
                        <Icon
                          name={item.icon}
                          className={`size-4 transition-all duration-300 ${
                            activeIndex === i || hoveredIndex === i ? "rotate-12" : ""
                          }`}
                        />
                      </div>
                    )}
                    <h3 className={`font-semibold lg:text-lg transition-all duration-300 ${
                      expandedIndex === i ? "" : "line-clamp-1 group-hover:line-clamp-none"
                    } ${
                      activeIndex === i ? "text-primary" : hoveredIndex === i ? "text-primary/80" : ""
                    }`}>
                      {item.title}
                    </h3>
                    {/* 活跃状态指示器 */}
                    {activeIndex === i && (
                      <div className="ml-auto">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                  <p className={`text-muted-foreground text-sm lg:text-base ml-11 transition-all duration-300 ${
                    expandedIndex === i ? "" : "line-clamp-2 group-hover:line-clamp-none"
                  }`} aria-expanded={expandedIndex === i}
                  >
                    {item.description}
                  </p>
                  
                  {/* 悬停时的额外信息提示 */}
                  {hoveredIndex === i && (
                    <div className="mt-3 ml-11 p-2 bg-muted/50 rounded text-xs text-muted-foreground animate-in slide-in-from-top-2 duration-200">
                      点击查看效果对比
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 进度指示器 */}
            {section.items && section.items.length > 1 && (
              <div className={`mt-8 flex justify-center gap-2 transition-all duration-700 delay-1000 ${showContent ? "opacity-100" : "opacity-0"}`}>
                {section.items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeIndex === i 
                        ? "bg-primary scale-125" 
                        : "bg-muted hover:bg-primary/50 hover:scale-110"
                    }`}
                    aria-label={`切换到功能 ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Before/After Slider */}
          <div className={`flex items-center justify-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {section.items && section.items[activeIndex] && (
              <div className="relative group">
                <BeforeAfterSlider
                  beforeImage={section.items[activeIndex].image?.src || ""}
                  afterImage={section.items[activeIndex].afterImage?.src || section.items[activeIndex].image?.src || ""}
                  beforeAlt="Before"
                  afterAlt="After"
                  className="w-full h-96 lg:h-[500px] transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]"
                />
                
                {/* 悬停时的操作提示 */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <p className="text-lg font-semibold mb-2">Drag to Compare</p>
                    <p className="text-sm opacity-90">Drag the slider left and right to see before and after effects</p>
                  </div>
                </div>

                {/* 当前功能标签 */}
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg animate-in slide-in-from-top-2 duration-300">
                  {section.items[activeIndex].title}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
