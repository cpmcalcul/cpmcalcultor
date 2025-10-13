"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star, Eye, Download, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useRef, useState } from "react";

interface Creation {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  author: string;
  authorAvatar: string;
  rating: number;
  views: number;
  downloads: number;
  likes: number;
  tags: string[];
  featured: boolean;
  new: boolean;
  href: string;
}

interface FeaturedCreationsProps {
  title?: string;
  description?: string;
  creations?: Creation[];
  viewAllText?: string;
  viewAllHref?: string;
}

const defaultCreations: Creation[] = [
  {
    id: "1",
    title: "CPM Calculator",
    description: "Master your ad spend with the ultimate Professional CPM Calculator. Effortlessly calculate the CPM and demystify the CPM formula with our intuitive tool.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
    category: "Dashboard",
    author: "Sarah Chen",
    authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    rating: 4.9,
    views: 12500,
    downloads: 2300,
    likes: 850,
    tags: ["React", "TypeScript", "Analytics"],
    featured: true,
    new: false,
    href: "/tools/cpm-calculator"
  },
  {
    id: "2",
    title: "CPA Calculator",
    description: "A free and easy-to-use CPA Calculator to instantly determine your Cost Per Acquisition. Simply enter your total campaign cost and total conversions to accurately calculate your CPA and measure your marketing effectiveness.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
    category: "Landing Page",
    author: "Alex Rodriguez",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    rating: 4.8,
    views: 18700,
    downloads: 3200,
    likes: 1200,
    tags: ["Next.js", "TailwindCSS", "SaaS"],
    featured: true,
    new: true,
    href: "/tools/cpa-calculator"
  },
  {
    id: "3",
    title: "CPC Calculator",
    description: "Accurately calculate your Cost Per Click (CPC) with our powerful ad spend calculator. Understand the CPC formula, analyze your campaign costs, and see how it impacts your overall budget. Ideal for Google Ads, Facebook Ads, and all PPC platforms.",
    image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?w=600&h=400&fit=crop&crop=center",
    category: "Application",
    author: "Emily Zhang",
    authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    rating: 4.7,
    views: 9800,
    downloads: 1800,
    likes: 650,
    tags: ["AI", "Chat", "Real-time"],
    featured: false,
    new: true,
    href: "/showcase/ai-chat-app"
  },
  {
    id: "4",
    title: "CTR Calculator",
    description: "Comprehensive financial tracking and analytics platform with beautiful charts and automated reporting features.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&crop=center",
    category: "Finance",
    author: "Michael Kim",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    rating: 4.9,
    views: 15600,
    downloads: 2800,
    likes: 950,
    tags: ["Finance", "Analytics", "Charts"],
    featured: true,
    new: false,
    href: "/tools/ctr-calculator"
  },
  {
    id: "5",
    title: "ROI Calculator",
    description: "Calculate your Return on Investment (ROI) with our professional business calculator. Make informed financial decisions by accurately measuring the profitability of your marketing campaigns, stock investments, or business projects. Understand your gains and optimize your strategy for higher returns.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center",
    category: "Productivity",
    author: "Lisa Wang",
    authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face",
    rating: 4.6,
    views: 11200,
    downloads: 2100,
    likes: 720,
    tags: ["Management", "Teams", "Productivity"],
    featured: false,
    new: false,
    href: "/tools/roi-calculator"
  },
  {
    id: "6",
    title: "YouTube CPM Calculator",
    description: "Curious how much top YouTubers really make? Use our YouTube CPM Calculator to unlock your channel's earning potential. Go beyond subscribers and views—get a realistic estimate of your ad revenue, understand what drives your income, and learn how to boost your CPM for higher earnings.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop&crop=center",
    category: "AI Tools",
    author: "David Park",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
    rating: 4.8,
    views: 22300,
    downloads: 4100,
    likes: 1500,
    tags: ["AI", "Image", "Generator"],
    featured: true,
    new: true,
    href: "/tools/youtube-cpm-calculator"
  }
];

export default function FeaturedCreations({
  title,
  description,
  creations = defaultCreations,
  viewAllText,
  viewAllHref
}: FeaturedCreationsProps) {
  const t = useTranslations("pages.featuredCreations");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const finalTitle = title || t("featuredCreations.title");
  const finalDescription = description || t("featuredCreations.description");
  const finalViewAllText = viewAllText || t("featuredCreations.viewAllText");
  const finalViewAllHref = viewAllHref || t("featuredCreations.viewAllHref");

  // Mouse drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  }, [isDragging, startX, scrollLeft]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Wheel handler for smoother horizontal scrolling
  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!scrollRef.current) return;
    e.preventDefault();
    scrollRef.current.scrollLeft += e.deltaY;
  }, []);

  // Keyboard navigation for accessibility
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!scrollRef.current) return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        scrollRef.current.scrollLeft -= 320; // Card width + gap
        break;
      case 'ArrowRight':
        e.preventDefault();
        scrollRef.current.scrollLeft += 320; // Card width + gap
        break;
      case 'Home':
        e.preventDefault();
        scrollRef.current.scrollLeft = 0;
        break;
      case 'End':
        e.preventDefault();
        scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        break;
    }
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {finalTitle}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            {finalDescription}
          </p>
          {/* Scroll instruction */}
          <p id="scroll-instructions" className="text-sm text-muted-foreground">
            🖱️ {t("featuredCreations.scrollInstruction")} • 📱 {t("featuredCreations.mobileInstruction")} • ⌨️ {t("featuredCreations.keyboardInstruction")}
          </p>
        </div>

        {/* Horizontal Scrolling Gallery */}
        <div className="relative mb-12">
          <div
            ref={scrollRef}
            className={`flex gap-6 overflow-x-auto scrollbar-hide pb-4 smooth-scroll focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              scrollBehavior: 'smooth',
              touchAction: 'pan-x'
            }}
            tabIndex={0}
            role="region"
            aria-label={finalTitle}
            aria-describedby="scroll-instructions"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
            onKeyDown={handleKeyDown}
          >
            {creations.map((creation, index) => (
              <div
                key={creation.id}
                className="flex-none w-80 group animate-fade-in"
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm h-full">
                  <div className="relative overflow-hidden">
                    <Image
                      src={creation.image}
                      alt={creation.title}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      draggable={false}
                    />

                    {/* Overlay badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {creation.featured && (
                        <Badge className="bg-primary/90 text-primary-foreground border-0">
                          {t("featuredCreations.badges.featured")}
                        </Badge>
                      )}
                      {creation.new && (
                        <Badge variant="secondary" className="bg-green-500/90 text-white border-0">
                          {t("featuredCreations.badges.new")}
                        </Badge>
                      )}
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 right-3">
                      <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                        {creation.category}
                      </Badge>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <CardContent className="p-6">
                    {/* Title and Description */}
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {creation.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {creation.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {creation.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{creation.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{creation.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          <span>{creation.downloads.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        <span>{creation.likes}</span>
                      </div>
                    </div>

                    {/* Author */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Image
                          src={creation.authorAvatar}
                          alt={creation.author}
                          width={24}
                          height={24}
                          className="w-6 h-6 rounded-full object-cover"
                          draggable={false}
                        />
                        <span className="text-xs text-muted-foreground">{creation.author}</span>
                      </div>
                      <Button
                        asChild
                        size="sm"
                        variant="ghost"
                        className="h-8 px-3 text-xs group-hover:bg-primary group-hover:text-primary-foreground"
                      >
                        <Link href={creation.href}>
                          {t("featuredCreations.actions.view")} <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button asChild size="lg" className="group">
            <Link href={finalViewAllHref}>
              {finalViewAllText}
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}