'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';

// 卡片数据接口
interface CardData {
  id: number;
  title: string;
  image: string;
  alt: string;
}

// 卡片数据
const getCardData = (locale: string): CardData[] => [
  { 
    id: 1, 
    title: locale === 'zh' ? "赛博战士" : "Cyber Warrior", 
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=500&fit=crop&q=80",
    alt: locale === 'zh' ? "AI生成的赛博朋克风格战士角色，展示人工智能艺术创作能力" : "AI-generated cyberpunk warrior character showcasing artificial intelligence art creation capabilities"
  },
  { 
    id: 2, 
    title: locale === 'zh' ? "动漫风格" : "Anime Style", 
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop&q=80",
    alt: locale === 'zh' ? "AI生成的动漫风格人物插画，体现机器学习图像生成技术" : "AI-generated anime style character illustration demonstrating machine learning image generation technology"
  },
  { 
    id: 3, 
    title: locale === 'zh' ? "肖像网格" : "Portrait Grid", 
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&q=80",
    alt: locale === 'zh' ? "AI肖像生成网格展示，人工智能面部合成和编辑工具演示" : "AI portrait generation grid showcase for artificial intelligence face synthesis and editing tools"
  },
  { 
    id: 4, 
    title: locale === 'zh' ? "时尚系列" : "Fashion Collection", 
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=500&fit=crop&q=80",
    alt: locale === 'zh' ? "AI驱动的时尚设计作品集，展示创意AI在服装设计中的应用" : "AI-powered fashion design collection showcasing creative AI applications in clothing design"
  },
  { 
    id: 5, 
    title: locale === 'zh' ? "都市艺术" : "Urban Art", 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop&q=80",
    alt: locale === 'zh' ? "AI生成的城市街头艺术风格作品，数字艺术创作工具展示" : "AI-generated urban street art style artwork demonstrating digital art creation tools"
  },
  { 
    id: 6, 
    title: locale === 'zh' ? "数字设计" : "Digital Design", 
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=500&fit=crop&q=80",
    alt: locale === 'zh' ? "AI辅助数字设计作品，展示人工智能在视觉设计领域的创新应用" : "AI-assisted digital design artwork showcasing artificial intelligence innovation in visual design"
  },
  { 
    id: 7, 
    title: locale === 'zh' ? "创意作品" : "Creative Work", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=80",
    alt: locale === 'zh' ? "AI创意艺术作品展示，体现机器学习在艺术创作中的无限可能" : "AI creative artwork showcase demonstrating machine learning unlimited possibilities in art creation"
  },
  { 
    id: 8, 
    title: locale === 'zh' ? "现代艺术" : "Modern Art", 
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop&q=80",
    alt: locale === 'zh' ? "AI现代艺术风格创作，展示深度学习在当代艺术表现中的应用" : "AI modern art style creation showcasing deep learning applications in contemporary art expression"
  },
  { 
    id: 9, 
    title: locale === 'zh' ? "创新" : "Innovation", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&q=80",
    alt: locale === 'zh' ? "AI技术创新概念图，展示人工智能在创意产业的突破性应用" : "AI technology innovation concept showcasing artificial intelligence breakthrough applications in creative industries"
  },
  { 
    id: 10, 
    title: locale === 'zh' ? "未来科技" : "Future Tech", 
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=500&fit=crop&q=80",
    alt: locale === 'zh' ? "未来科技AI概念设计，展示先进人工智能系统的视觉表现能力" : "Future tech AI concept design demonstrating advanced artificial intelligence system visual capabilities"
  }
];

const Feature0 = () => {
  const locale = useLocale();
  const t = useTranslations('feature0');
  const cardData = getCardData(locale);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastPointerX, setLastPointerX] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const animationFrameRef = useRef<number>();
  const autoRotateFrameRef = useRef<number>();
  const velocityRef = useRef(0);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // 圆盘半径（根据屏幕大小调整）
  const getRadius = useCallback(() => {
    if (!isMounted) return 400; // 服务器端和客户端初始渲染时使用固定值
    return window.innerWidth < 768 ? 300 : 400;
  }, [isMounted]);

  // 自动旋转动画
  const autoRotateAnimate = useCallback(() => {
    if (isAutoRotating && !isUserInteracting && isMounted) {
      setRotation(prev => prev + 0.2); // 每帧旋转0.2度，缓慢旋转
      autoRotateFrameRef.current = requestAnimationFrame(autoRotateAnimate);
    }
  }, [isAutoRotating, isUserInteracting, isMounted]);

  // 惯性滚动动画
  const animate = useCallback(() => {
    if (Math.abs(velocityRef.current) > 0.1) {
      setRotation(prev => prev + velocityRef.current);

      // 指数衰减
      velocityRef.current *= 0.95;
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      // 惯性动画结束，重新开始自动旋转
      setIsUserInteracting(false);
    }
  }, []);

  // 开始用户交互
  const startUserInteraction = useCallback(() => {
    if (!isMounted) return;
    
    setIsUserInteracting(true);

    // 取消自动旋转
    if (autoRotateFrameRef.current) {
      cancelAnimationFrame(autoRotateFrameRef.current);
    }

    // 清除恢复定时器
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }
  }, [isMounted]);

  // 结束用户交互（延迟恢复自动旋转）
  const endUserInteraction = useCallback(() => {
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    // 2秒后恢复自动旋转
    interactionTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 2000);
  }, []);

  // 处理鼠标滚轮
  const handleWheel = useCallback((e: WheelEvent) => {
    if (!isMounted) return;
    
    e.preventDefault();

    startUserInteraction();

    const delta = e.deltaY;
    const newVelocity = delta * 0.1;

    setVelocity(newVelocity);
    velocityRef.current = newVelocity;

    // 取消之前的动画
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    // 开始新的惯性动画
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      setRotation(prev => prev + newVelocity * 2);
      endUserInteraction();
    }
  }, [animate, startUserInteraction, endUserInteraction, isMounted]);

  // 处理拖拽
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isMounted) return;
    
    startUserInteraction();

    setIsDragging(true);
    setLastPointerX(e.clientX);
    setVelocity(0);
    velocityRef.current = 0;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    e.preventDefault();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !isMounted) return;

    const deltaX = e.clientX - lastPointerX;
    const newVelocity = deltaX * 0.3;

    setVelocity(newVelocity);
    velocityRef.current = newVelocity;
    setLastPointerX(e.clientX);

    setRotation(prev => prev + newVelocity);
  };

  const handlePointerUp = () => {
    if (!isMounted) return;
    
    setIsDragging(false);

    // 检查是否应该开始惯性动画
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reducedMotion && Math.abs(velocityRef.current) > 1) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      endUserInteraction();
    }
  };

  // 键盘导航
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isMounted) return;
    
    const rotationStep = 36; // 每次旋转36度（360/10）

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      startUserInteraction();
      setRotation(prev => prev - rotationStep);
      endUserInteraction();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      startUserInteraction();
      setRotation(prev => prev + rotationStep);
      endUserInteraction();
    }
  };

  // 切换自动旋转
  const toggleAutoRotate = () => {
    if (!isMounted) return;
    setIsAutoRotating(!isAutoRotating);
  };

  // 计算卡片位置和旋转
  const getCardTransform = useCallback((index: number, isHovered: boolean) => {
    if (!isMounted) {
      // 服务器端渲染时返回初始位置
      return 'translate3d(0px, 0px, 0px) rotateY(0deg) rotateX(0deg) rotateZ(0deg)';
    }
    
    const totalCards = cardData.length;
    const angleStep = 360 / totalCards;
    const cardAngle = (index * angleStep + rotation) * (Math.PI / 180);
    const radius = getRadius();

    const x = Math.cos(cardAngle) * radius;
    const z = Math.sin(cardAngle) * radius;

    // 计算卡片朝向中心的旋转
    const cardRotationY = -(index * angleStep + rotation);

    // 3D 倾斜效果
    const tiltX = Math.sin(cardAngle) * 15; // 前后倾斜
    const tiltZ = Math.cos(cardAngle) * 5;  // 左右倾斜

    if (isHovered) {
      return `translate3d(${x}px, -20px, ${z}px) rotateY(${cardRotationY}deg) rotateX(0deg) rotateZ(0deg) scale(1.1)`;
    }

    return `translate3d(${x}px, 0px, ${z}px) rotateY(${cardRotationY}deg) rotateX(${tiltX}deg) rotateZ(${tiltZ}deg)`;
  }, [cardData.length, rotation, getRadius, isMounted]);

  // 设置事件监听器和自动旋转
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isMounted) return;

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (autoRotateFrameRef.current) {
        cancelAnimationFrame(autoRotateFrameRef.current);
      }
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, [handleWheel, isMounted]);

  // 自动旋转控制
  useEffect(() => {
    if (!isMounted) return;
    
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isAutoRotating && !isUserInteracting && !reducedMotion) {
      autoRotateFrameRef.current = requestAnimationFrame(autoRotateAnimate);
    } else if (autoRotateFrameRef.current) {
      cancelAnimationFrame(autoRotateFrameRef.current);
    }

    return () => {
      if (autoRotateFrameRef.current) {
        cancelAnimationFrame(autoRotateFrameRef.current);
      }
    };
  }, [isAutoRotating, isUserInteracting, autoRotateAnimate, isMounted]);

  // 客户端挂载状态
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden relative">
      <div className="container mx-auto px-4">
        {/* 主标题 */}
        <div className="text-center relative z-20 mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('description')}</p>
        </div>

        {/* 自动旋转控制按钮 */}
        {isMounted && (
          <div className="absolute top-6 right-6 z-30">
            <button
              onClick={toggleAutoRotate}
              className="bg-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-full p-3 transition-all duration-200 hover:bg-gray-700/80 hover:scale-105"
              title={isAutoRotating ? t('pause_rotation') : t('start_rotation')}
            >
              {isAutoRotating ? (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h8m2-10v18a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2h8l4 4z" />
                </svg>
              )}
            </button>
          </div>
        )}

        {/* 自动旋转状态指示器 */}
        {isMounted && isAutoRotating && !isUserInteracting && (
          <div className="absolute top-6 left-6 z-30">
            <div className="bg-emerald-500/20 border border-emerald-500/50 rounded-full px-4 py-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-emerald-300 text-sm font-medium">{t('auto_rotating')}</span>
            </div>
          </div>
        )}

        {/* 3D轮盘容器 */}
        <div
          className="relative mx-auto h-[600px] flex items-center justify-center"
          style={{ perspective: '1200px' }}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {/* 轮盘中心区域 */}
          <div
            ref={containerRef}
            className={`relative w-full h-full ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              transformStyle: 'preserve-3d'
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          >
            {cardData.map((card, index) => (
              <CardComponent
                key={card.id}
                card={card}
                index={index}
                getTransform={getCardTransform}
                isMounted={isMounted}
              />
            ))}

            {/* 中心点指示器 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/20 rounded-full border-2 border-white/40 z-10" />
          </div>

          {/* 轮盘边框指示器 */}
          {isMounted && (
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-white/10 rounded-full pointer-events-none"
              style={{
                width: `${getRadius() * 2}px`,
                height: `${getRadius() * 2}px`
              }}
            />
          )}
        </div>

        {/* 底部提示胶囊 */}
        <div className="flex justify-center pt-8 relative z-20">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-6 py-3">
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {t('scroll_hint')}
              </div>
              <div className="w-1 h-1 bg-gray-500 rounded-full" />
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                {t('swipe_hint')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// 卡片组件
function CardComponent({
  card,
  index,
  getTransform,
  isMounted
}: {
  card: CardData;
  index: number;
  getTransform: (index: number, isHovered: boolean) => string;
  isMounted: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute w-80 h-[420px] sm:w-[280px] sm:h-[360px] rounded-[28px] shadow-2xl ring-1 ring-white/5 overflow-hidden transition-all duration-300 ease-out"
      style={{
        left: '50%',
        top: '50%',
        marginLeft: '-160px', // -w/2
        marginTop: '-210px',  // -h/2
        transform: getTransform(index, isHovered),
        transformStyle: 'preserve-3d'
      }}
      onMouseEnter={() => isMounted && setIsHovered(true)}
      onMouseLeave={() => isMounted && setIsHovered(false)}
      onFocus={() => isMounted && setIsHovered(true)}
      onBlur={() => isMounted && setIsHovered(false)}
      tabIndex={0}
    >
      <div className="relative w-full h-full bg-gradient-to-br from-gray-800 to-gray-900">
        <img
          src={card.image}
          alt={card.alt}
          title={card.alt}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl font-semibold">{card.title}</h3>
        </div>
      </div>
    </div>
  );
}

export default Feature0;
