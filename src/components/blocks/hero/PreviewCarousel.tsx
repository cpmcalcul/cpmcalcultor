'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PreviewCarouselProps } from '@/types/hero';
import { cn } from '@/lib/utils';

// 创建默认示例图片的函数，支持多语言
const createDefaultImages = (t: any) => [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face',
    alt: t('alt_text.professional_headshot_1'),
    title: t('image_titles.convert_linkedin')
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face',
    alt: t('alt_text.professional_headshot_2'),
    title: t('image_titles.professional_portrait')
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop&crop=face',
    alt: t('alt_text.professional_headshot_3'),
    title: t('image_titles.business_headshot')
  }
];

/**
 * PreviewCarousel - 图片轮播组件
 *
 * 支持手动和自动轮播，完全可配置
 * 可以传入自定义图片数组或使用默认示例
 */
export default function PreviewCarousel({
  images,
  className,
  showControls = true,
  autoSlide = false,
  slideInterval = 3000,
}: PreviewCarouselProps) {
  const t = useTranslations('hero_switcher.preview_carousel');
  const defaultImages = createDefaultImages(t);
  const displayImages = images || defaultImages;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 自动轮播
  useEffect(() => {
    if (!autoSlide || displayImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
    }, slideInterval);

    return () => clearInterval(interval);
  }, [autoSlide, slideInterval, displayImages.length]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (displayImages.length === 0) {
    return (
      <div className={cn(
        "rounded-2xl p-6 bg-gradient-to-br from-gray-900 to-black text-white shadow-xl h-full flex items-center justify-center",
        className
      )}>
        <p className="text-gray-400">{t('no_images')}</p>
      </div>
    );
  }

  const currentImage = displayImages[currentImageIndex];

  return (
    <div className={cn(
      "rounded-2xl p-6 bg-gradient-to-br from-gray-900 to-black text-white shadow-xl h-full flex flex-col",
      className
    )}>
      {/* 标题区域 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{t('title')}</h2>
          <div className="text-yellow-400 text-6xl font-bold">{t('number')}</div>
        </div>
        <p className="text-gray-300">
          {t('description')}
        </p>
      </div>

      {/* 图片轮播区域 */}
      <div className="flex-1 flex flex-col justify-center min-h-0">
        <div className="relative flex-1 max-h-[60vh] lg:max-h-[500px]">
          {/* 主图片显示 */}
          <div className="relative h-full w-full rounded-xl overflow-hidden bg-gray-800"
               style={{ aspectRatio: 'auto' }}>
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* 图片标题覆盖层 */}
            {currentImage.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white font-medium">
                  {currentImage.title}
                </p>
              </div>
            )}

            {/* 导航按钮 */}
            {showControls && displayImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </>
            )}
          </div>

          {/* 指示器dots */}
          {displayImages.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50",
                    index === currentImageIndex
                      ? 'bg-yellow-400'
                      : 'bg-gray-600 hover:bg-gray-500'
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 底部操作区域 */}
      <div className="mt-4 space-y-3 flex-shrink-0">
        <button className="w-full bg-yellow-400 text-black font-semibold py-2.5 rounded-xl hover:bg-yellow-300 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm">
          {t('download_all')}
        </button>

        <div className="flex gap-2">
          <button className="flex-1 bg-gray-800 hover:bg-gray-700 py-2 rounded-lg transition-colors text-xs focus:outline-none focus:ring-2 focus:ring-gray-500">
            {t('share')}
          </button>
          <button className="flex-1 bg-gray-800 hover:bg-gray-700 py-2 rounded-lg transition-colors text-xs focus:outline-none focus:ring-2 focus:ring-gray-500">
            {t('save_gallery')}
          </button>
        </div>
      </div>

      {/* 图片计数显示 */}
      {displayImages.length > 1 && (
        <div className="mt-1 text-center text-xs text-gray-400 flex-shrink-0">
          {t('image_count', { current: currentImageIndex + 1, total: displayImages.length })}
        </div>
      )}
    </div>
  );
}

// 预设配置
export const PreviewCarouselConfigs = {
  default: {
    showControls: true,
    autoSlide: false,
  },
  autoplay: {
    showControls: true,
    autoSlide: true,
    slideInterval: 4000,
  },
  minimal: {
    showControls: false,
    autoSlide: false,
  },
};
