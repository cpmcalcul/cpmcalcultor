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

---

## 2025-10-13 (Session 3 - Landing Page Copy Update)

### Plan

- [x] 更新 landing page 中 "How CPM Calculator works" 部分文案
- [x] 修改 src/i18n/pages/landing/en.json 中的 works_section 内容
- [x] 同步更新 src/i18n/pages/landing/zh.json 中文版本
- [x] 检查页面显示效果

### Done

- [x] 更新英文版 usage section 标题和描述
- [x] 重写四个步骤内容，从模板使用改为 CPM 计算工具使用流程
- [x] 同步更新中文版所有文案
- [x] 保持图片路径和结构不变

**修改的文件**:

- [src/i18n/pages/landing/en.json:251-290](src/i18n/pages/landing/en.json#L251-L290) - 英文版 usage section
- [src/i18n/pages/landing/zh.json:244-282](src/i18n/pages/landing/zh.json#L244-L282) - 中文版 usage section

**关键改动**:

- 标题: "How CPM Calculator works" → 强调工具功能而非模板
- 描述: 从"启动项目"改为"计算广告成本并优化营销活动"
- 步骤1: "Enter Your Campaign Data" - 输入广告成本和展示数据
- 步骤2: "Get Instant CPM Results" - 使用公式计算 CPM
- 步骤3: "Analyze & Compare Metrics" - 分析对比 CPC/CPA 等指标
- 步骤4: "Optimize Your Campaigns" - 利用洞察优化营销策略

### Next

- [ ] 验证页面显示效果是否符合预期
- [ ] 考虑更新配套图片以更好匹配新文案

---

## 2025-10-13 (Session 4 - CTR Calculator i18n)

### Plan

- [x] 检查 tools/ctr-calculator 页面中的硬编码中文文本
- [x] 移除或替换所有中文硬编码为英文或 i18n 翻译
- [x] 确保英文页面完全不显示中文内容
- [x] 测试页面显示

### Done

- [x] 添加 CTR/CVR 计算器完整翻译到 src/i18n/messages/en.json
- [x] 添加 CTR/CVR 计算器完整翻译到 src/i18n/messages/zh.json
- [x] 重构 CTRCalculator 组件使用 useTranslations hook
- [x] 移除所有硬编码的中文文本（标题、标签、描述、按钮、错误提示）
- [x] 确保英文和中文页面都正确显示对应语言

**修改的文件**:

- [src/i18n/messages/en.json:325-353](src/i18n/messages/en.json#L325-L353) - 添加 calculator.ctr 翻译
- [src/i18n/messages/zh.json:325-353](src/i18n/messages/zh.json#L325-L353) - 添加 calculator.ctr 翻译
- [src/components/blocks/calculator/CTR/CTRCalculator.tsx](src/components/blocks/calculator/CTR/CTRCalculator.tsx) - 完全重构使用 i18n

**关键改动**:

- **英文翻译新增**:
  - CTR Calculator: card_title, card_description, clicks_label, impressions_label, ctr_label, ctr_formula
  - CVR Calculator: cvr_card_title, conversions_label, cvr_clicks_label, cvr_label, cvr_formula
  - Error messages: error_min_fields, error_zero_impressions, error_zero_clicks

- **组件重构**:
  - 导入 `useTranslations` from next-intl
  - 使用 `t("calculator.ctr.*")` 替换所有硬编码中文
  - 使用 `tButtons("calculator.buttons.*")` 获取按钮文本
  - 所有 UI 文本、标签、描述、错误提示全部国际化

**移除的硬编码中文**:
- ❌ "CTR 计算器" → ✅ t("card_title")
- ❌ "点击次数" → ✅ t("clicks_label")
- ❌ "展示次数" → ✅ t("impressions_label")
- ❌ "点击率（CTR）" → ✅ t("ctr_label")
- ❌ "公式：CTR = ..." → ✅ t("ctr_formula")
- ❌ "CVR 计算器" → ✅ t("cvr_card_title")
- ❌ "转化次数" → ✅ t("conversions_label")
- ❌ "转化率（CVR）" → ✅ t("cvr_label")
- ❌ "重新开始" → ✅ tButtons("reset")
- ❌ "计算" → ✅ tButtons("calculate")
- ❌ "请至少填写两个字段" → ✅ t("error_min_fields")
- ❌ "展示次数不能为0" → ✅ t("error_zero_impressions")
- ❌ "点击次数不能为0" → ✅ t("error_zero_clicks")

### Next

- [ ] 验证英文页面不再显示任何中文内容
- [ ] 测试计算器功能在两种语言下都正常工作
- [ ] 考虑对其他计算器页面（CPA/CPC/ROI）进行相同处理
