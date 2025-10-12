'use client';

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Film, Eraser, Palette, Music, Zap } from "lucide-react";
import { useActiveTab } from "@/hooks/useActiveTab";
import { useLocale } from "next-intl";

interface HintsSectionProps {
  onHintClick: (prompt: string) => void;
}

const HintsSection = ({ onHintClick }: HintsSectionProps) => {
  const locale = useLocale();
  const { activeTab } = useActiveTab(locale);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Different hints for different categories with prompts
  const getHintsForCategory = () => {
    switch (activeTab.category) {
      case 'video':
        return [
          { icon: Film, label: locale === 'zh' ? "短片制作" : "Short Film", color: "text-purple-400", prompt: "Create a cinematic short film with dramatic lighting and professional camera movements" },
          { icon: Zap, label: locale === 'zh' ? "场景动画" : "Animate Scene", color: "text-orange-400", prompt: "Add smooth animation effects to bring this scene to life with realistic motion" },
          { icon: Palette, label: locale === 'zh' ? "风格转换" : "Style Transfer", color: "text-pink-400", prompt: "Transform the visual style of this video to match a specific artistic style or mood" },
          { icon: Music, label: locale === 'zh' ? "添加背景音乐" : "Add BGM", color: "text-purple-400", prompt: "Generate appropriate background music that complements the mood and pacing of this video" },
          { icon: Eraser, label: locale === 'zh' ? "移除对象" : "Remove Objects", color: "text-blue-400", prompt: "Remove unwanted objects or people from this video while maintaining natural continuity" },
          { icon: Film, label: locale === 'zh' ? "慢动作效果" : "Slow Motion", color: "text-indigo-400", prompt: "Create smooth slow motion effects with proper frame interpolation and natural movement" },
          { icon: Zap, label: locale === 'zh' ? "时间流逝" : "Time Lapse", color: "text-cyan-400", prompt: "Generate a time lapse video showing the passage of time in an accelerated format" },
          { icon: Palette, label: locale === 'zh' ? "色彩校正" : "Color Correction", color: "text-emerald-400", prompt: "Apply professional color correction to enhance the visual appeal and mood of the video" },
          { icon: Music, label: locale === 'zh' ? "音效设计" : "Sound Effects", color: "text-amber-400", prompt: "Add realistic sound effects that match the visual actions and enhance immersion" },
          { icon: Eraser, label: locale === 'zh' ? "绿幕合成" : "Green Screen", color: "text-rose-400", prompt: "Remove green screen background and replace with new environments or scenes" }
        ];
      case 'image':
        return [
          { icon: Palette, label: locale === 'zh' ? "艺术风格" : "Artistic Style", color: "text-pink-400", prompt: "Transform this image into a beautiful artistic style like oil painting, watercolor, or digital art" },
          { icon: Eraser, label: locale === 'zh' ? "移除背景" : "Remove Background", color: "text-blue-400", prompt: "Remove the background from this image and make it transparent or replace with a new background" },
          { icon: Zap, label: locale === 'zh' ? "提升质量" : "Enhance Quality", color: "text-orange-400", prompt: "Enhance the quality and resolution of this image, improve clarity and reduce noise" },
          { icon: Film, label: locale === 'zh' ? "照片真实" : "Photo Realistic", color: "text-purple-400", prompt: "Generate a photorealistic image with high detail, perfect lighting, and professional quality" },
          { icon: Music, label: locale === 'zh' ? "色彩分级" : "Color Grading", color: "text-green-400", prompt: "Apply professional color grading to enhance the mood and visual appeal of this image" },
          { icon: Palette, label: locale === 'zh' ? "卡通化" : "Cartoonify", color: "text-indigo-400", prompt: "Transform this image into a cartoon or anime style with vibrant colors and clean lines" },
          { icon: Zap, label: locale === 'zh' ? "超分辨率" : "Super Resolution", color: "text-cyan-400", prompt: "Increase image resolution by 4x while maintaining sharpness and detail quality" },
          { icon: Film, label: locale === 'zh' ? "HDR效果" : "HDR Effect", color: "text-emerald-400", prompt: "Apply HDR processing to enhance dynamic range and create more vibrant colors" },
          { icon: Music, label: locale === 'zh' ? "黑白转换" : "B&W Conversion", color: "text-amber-400", prompt: "Convert this image to black and white with proper contrast and tonal range" },
          { icon: Eraser, label: locale === 'zh' ? "智能修复" : "Smart Repair", color: "text-rose-400", prompt: "Intelligently repair damaged areas, remove scratches, and restore missing details" }
        ];
      case 'audio':
        return [
          { icon: Music, label: locale === 'zh' ? "背景音乐作曲" : "BGM Composer", color: "text-purple-400", prompt: "Compose original background music with the perfect mood and rhythm for my project" },
          { icon: Film, label: locale === 'zh' ? "配乐制作" : "Soundtrack", color: "text-blue-400", prompt: "Create a cinematic soundtrack that enhances the emotional impact of the visual content" },
          { icon: Zap, label: locale === 'zh' ? "语音克隆" : "Voice Clone", color: "text-orange-400", prompt: "Clone and generate realistic voice audio with natural intonation and clear pronunciation" },
          { icon: Palette, label: locale === 'zh' ? "音频效果" : "Audio Effects", color: "text-pink-400", prompt: "Add professional audio effects like reverb, echo, or distortion to enhance the sound" },
          { icon: Eraser, label: locale === 'zh' ? "噪音移除" : "Noise Removal", color: "text-green-400", prompt: "Remove background noise and improve audio clarity for professional sound quality" },
          { icon: Music, label: locale === 'zh' ? "节拍生成" : "Beat Generation", color: "text-indigo-400", prompt: "Generate rhythmic beats and percussion patterns for electronic or hip-hop music" },
          { icon: Film, label: locale === 'zh' ? "环境音效" : "Ambient Sounds", color: "text-cyan-400", prompt: "Create atmospheric ambient sounds like nature, city, or indoor environments" },
          { icon: Zap, label: locale === 'zh' ? "音频分离" : "Audio Separation", color: "text-emerald-400", prompt: "Separate vocals, instruments, and background elements from mixed audio tracks" },
          { icon: Palette, label: locale === 'zh' ? "音调调整" : "Pitch Correction", color: "text-amber-400", prompt: "Correct pitch and timing issues in vocal or instrumental recordings" },
          { icon: Eraser, label: locale === 'zh' ? "静音检测" : "Silence Detection", color: "text-rose-400", prompt: "Automatically detect and remove unwanted silence or dead air from audio" }
        ];
      default:
        return [
          { icon: Film, label: locale === 'zh' ? "短片制作" : "Short Film", color: "text-purple-400", prompt: "Create a cinematic short film with dramatic lighting and professional camera movements" },
          { icon: Eraser, label: locale === 'zh' ? "背景移除" : "Remove Background", color: "text-blue-400", prompt: "Remove the background from this image and make it transparent or replace with a new background" },
          { icon: Palette, label: locale === 'zh' ? "卡通化图像" : "Toonify Image", color: "text-pink-400", prompt: "Transform this image into a cartoon or animated style with vibrant colors and smooth lines" },
          { icon: Music, label: locale === 'zh' ? "背景音乐作曲" : "BGM Composer", color: "text-purple-400", prompt: "Compose original background music with the perfect mood and rhythm for my project" },
          { icon: Zap, label: locale === 'zh' ? "图像动画" : "Animate Image", color: "text-orange-400", prompt: "Bring this static image to life with natural animation and smooth motion effects" },
          { icon: Film, label: locale === 'zh' ? "3D建模" : "3D Modeling", color: "text-indigo-400", prompt: "Create detailed 3D models with realistic textures and lighting for visualization" },
          { icon: Palette, label: locale === 'zh' ? "风格迁移" : "Style Transfer", color: "text-cyan-400", prompt: "Apply artistic styles from famous paintings to transform the visual appearance" },
          { icon: Music, label: locale === 'zh' ? "音视频同步" : "A/V Sync", color: "text-emerald-400", prompt: "Synchronize audio and video elements for perfect timing and alignment" },
          { icon: Zap, label: locale === 'zh' ? "智能裁剪" : "Smart Crop", color: "text-amber-400", prompt: "Intelligently crop images and videos to focus on the most important elements" },
          { icon: Eraser, label: locale === 'zh' ? "批量处理" : "Batch Process", color: "text-rose-400", prompt: "Process multiple files simultaneously with consistent settings and quality" }
        ];
    }
  };

  const hints = getHintsForCategory();
  
  // 创建双倍数量的提示用于无缝滚动
  const duplicatedHints = [...hints, ...hints];

  // 自动滚动效果
  useEffect(() => {
    const scrollSpeed = 0.5; // 滚动速度
    let animationId: number;

    const animate = () => {
      setScrollPosition(prev => {
        const newPosition = prev + scrollSpeed;
        // 当滚动到第一组提示的末尾时，重置位置
        if (newPosition >= hints.length * 200) { // 假设每个按钮宽度约200px
          return 0;
        }
        return newPosition;
      });
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [hints.length]);

  return (
    <div className="mt-6 w-full">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg overflow-hidden">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-white/70 mr-4 flex-shrink-0">{locale === 'zh' ? '提示：' : 'Hints:'}</span>
          
          {/* 走马灯容器 */}
          <div className="flex-1 overflow-hidden">
            <div 
              ref={scrollRef}
              className="flex gap-2 transition-transform duration-1000 ease-linear"
              style={{ 
                transform: `translateX(-${scrollPosition}px)`,
                width: `${duplicatedHints.length * 200}px` // 动态宽度
              }}
            >
              {duplicatedHints.map((hint, index) => (
                <Button
                  key={`${hint.label}-${index}`}
                  variant="ghost"
                  size="sm"
                  onClick={() => onHintClick(hint.prompt)}
                  className="bg-white/20 border border-white/30 hover:bg-white/30 hover:border-amber-400/50 text-white transition-all duration-200 hover:scale-105 flex-shrink-0 min-w-[180px]"
                >
                  <hint.icon className={`w-4 h-4 mr-2 ${hint.color}`} />
                  {hint.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HintsSection;
