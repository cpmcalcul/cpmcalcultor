# Project Todos

## 2025-10-13

### Plan

- [ ] 将 aero.ts 硬编码内容迁移到 i18n 系统
- [ ] 在 src/i18n/messages/en.json 和 zh.json 中添加 aero_section.tabs 翻译
- [ ] 重构 aero.ts 使用 useTranslations 而非硬编码
- [ ] 测试所有 tab 标签和内容是否正确显示

### Done

- [x] 将 aero.ts 从硬编码改为接受翻译函数参数
- [x] 更新 useActiveTab hook 使用 useTranslations
- [x] 更新 AeroSection 组件移除 locale 参数
- [x] 修复 aero_section.content.chat 键名错误（原为 "CPM Calculator"）
- [x] 验证中文翻译文件结构正确

**关键改动**:

- [src/types/aero.ts](src/types/aero.ts): `getTabContent(t: (key: string) => string)` 接受翻译函数
- [src/hooks/useActiveTab.ts](src/hooks/useActiveTab.ts): 使用 `useTranslations()` 并传递给 `getTabContent`
- [src/components/blocks/aero/AeroSection.tsx](src/components/blocks/aero/AeroSection.tsx): 移除 locale 参数
- [src/i18n/messages/en.json](src/i18n/messages/en.json): 修正 `aero_section.content.chat` 键名

### Next

- [ ] 为计算器子页面设计共享翻译结构（CPA/CPM/CPC/CTR/ROI）
- [ ] 创建 src/i18n/pages/tools/_shared/ 共享翻译基础

---

## 2025-10-13 (Session 2 - Tools Page)

### Plan

- [x] 创建 Tools 工具导航页面，参考 Musely 设计
- [x] 实现搜索、分页、侧边栏等功能
- [x] 添加收藏功能和趋势工具展示
- [x] 国际化所有文案

### Done

- [x] 创建 ToolCard 组件（卡片展示、hover效果、收藏功能）
- [x] 创建 TrendingToolsSidebar 组件（热门工具、使用次数）
- [x] 创建 ToolsSearch 组件（实时搜索、清除功能）
- [x] 创建 ToolsPagination 组件（分页导航、省略号）
- [x] 重构 tools/page.tsx 主页面（搜索、筛选、分页）
- [x] 添加 pages.tools 国际化翻译（中英文）

**创建的文件**:

- [src/components/blocks/tools/ToolCard.tsx](src/components/blocks/tools/ToolCard.tsx) - 工具卡片组件
- [src/components/blocks/tools/TrendingToolsSidebar.tsx](src/components/blocks/tools/TrendingToolsSidebar.tsx) - 侧边栏组件
- [src/components/blocks/tools/ToolsSearch.tsx](src/components/blocks/tools/ToolsSearch.tsx) - 搜索组件
- [src/components/blocks/tools/ToolsPagination.tsx](src/components/blocks/tools/ToolsPagination.tsx) - 分页组件

**关键功能**:

- ✅ 搜索：实时搜索工具（标题、描述、标签）
- ✅ 分页：每页12个工具，自动计算总页数
- ✅ 收藏：点击星标收藏/取消收藏
- ✅ 侧边栏：展示热门工具Top 5和使用次数
- ✅ 响应式：移动端和桌面端适配
- ✅ 国际化：完整的中英文支持

### Next

- [ ] 添加工具分类筛选功能
- [ ] 实现收藏数据持久化（localStorage/数据库）
- [ ] 添加工具排序选项（最新、最热、A-Z）
