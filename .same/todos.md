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
