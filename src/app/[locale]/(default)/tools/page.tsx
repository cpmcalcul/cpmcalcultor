'use client';

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { ToolCard } from "@/components/blocks/tools/ToolCard";
import { TrendingToolsSidebar } from "@/components/blocks/tools/TrendingToolsSidebar";
import { ToolsSearch } from "@/components/blocks/tools/ToolsSearch";
import { ToolsPagination } from "@/components/blocks/tools/ToolsPagination";

const ITEMS_PER_PAGE = 12;

interface Tool {
  title: string;
  description: string;
  url: string;
  icon: string;
  color: string;
  category?: string;
  tags?: string[];
}

export default function ToolsPage() {
  const t = useTranslations();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<string[]>([]);

  // All tools data
  const allTools: Tool[] = [
    {
      title: t("calculator.cpm.title"),
      description: t("calculator.cpm.description"),
      url: "/tools/cpm-calculator",
      icon: "Calculator",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      category: "Marketing",
      tags: ["cpm", "advertising", "marketing"]
    },
    {
      title: t("calculator.cpa.title"),
      description: t("calculator.cpa.description"),
      url: "/tools/cpa-calculator",
      icon: "UserPlus",
      color: "bg-gradient-to-br from-green-500 to-green-600",
      category: "Marketing",
      tags: ["cpa", "conversion", "acquisition"]
    },
    {
      title: t("calculator.cpc.title"),
      description: t("calculator.cpc.description"),
      url: "/tools/cpc-calculator",
      icon: "MousePointer",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      category: "Marketing",
      tags: ["cpc", "clicks", "advertising"]
    },
    {
      title: t("calculator.ctr.title"),
      description: t("calculator.ctr.description"),
      url: "/tools/ctr-calculator",
      icon: "Mouse",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
      category: "Marketing",
      tags: ["ctr", "click-through", "rate"]
    },
    {
      title: t("calculator.roi.title"),
      description: t("calculator.roi.description"),
      url: "/tools/roi-calculator",
      icon: "TrendingUp",
      color: "bg-gradient-to-br from-red-500 to-red-600",
      category: "Marketing",
      tags: ["roi", "return", "investment"]
    }
  ];

  // Trending tools for sidebar (top 5)
  const trendingTools = [
    { title: t("calculator.cpm.title"), url: "/tools/cpm-calculator", icon: "Calculator", usageCount: 15420 },
    { title: t("calculator.cpa.title"), url: "/tools/cpa-calculator", icon: "UserPlus", usageCount: 12350 },
    { title: t("calculator.roi.title"), url: "/tools/roi-calculator", icon: "TrendingUp", usageCount: 9870 },
    { title: t("calculator.cpc.title"), url: "/tools/cpc-calculator", icon: "MousePointer", usageCount: 8540 },
    { title: t("calculator.ctr.title"), url: "/tools/ctr-calculator", icon: "Mouse", usageCount: 7230 }
  ];

  // Filter tools based on search query
  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return allTools;

    const query = searchQuery.toLowerCase();
    return allTools.filter((tool) => {
      const searchableText = [
        tool.title,
        tool.description,
        tool.category,
        ...(tool.tags || [])
      ].join(' ').toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchQuery, allTools]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredTools.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTools = filteredTools.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const toggleFavorite = (url: string) => {
    setFavorites((prev) =>
      prev.includes(url) ? prev.filter((f) => f !== url) : [...prev, url]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-3 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            All Tools
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground max-w-3xl">
            Explore our full suite of AI-powered creative tools,nstantly calculate the CPM with our free and professional CPM calculator. Go beyond a basic CPM calc; our tool simplifies every CPM calculation and visualizes the CPM formula. Plus, access our integrated CPC calculator to get a full view of your ad spend and optimize your campaigns for better ROI..
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <ToolsSearch
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a tool..."
          />
        </div>

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Tools Grid - Main Content */}
          <div className="lg:col-span-9">
            {/* Results count */}
            {searchQuery && (
              <div className="mb-4 text-sm text-muted-foreground">
                Found {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} matching "{searchQuery}"
              </div>
            )}

            {/* Tools Grid */}
            {currentTools.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                  {currentTools.map((tool, index) => (
                    <ToolCard
                      key={index}
                      {...tool}
                      isFavorite={favorites.includes(tool.url)}
                      onFavoriteToggle={() => toggleFavorite(tool.url)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <ToolsPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              // No results
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-10 h-10 text-muted-foreground"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">No tools found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or browse all tools
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-primary hover:underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Sidebar - Trending Tools */}
          <aside className="lg:col-span-3">
            <TrendingToolsSidebar tools={trendingTools} title="Trending Tools" />
          </aside>
        </div>
      </div>
    </div>
  );
}
