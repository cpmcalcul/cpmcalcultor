# CPM Calculator 完整配置所需资源

## 图片资源需求

由于CPM计算器页面现在使用了`full`预设配置，需要为ToolFeatures2组件提供before/after对比图片。

### 需要的图片文件

请在 `public/imgs/features/` 目录下添加以下图片：

#### 计算功能对比图
- `cpm-before-calc.jpg` - 计算前的状态（例如：复杂的手工计算表格）
- `cpm-after-calc.jpg` - 计算后的状态（例如：清晰的CPM计算器界面）

#### 分析功能对比图
- `cpm-before-analyze.jpg` - 分析前的状态（例如：原始数据表格）
- `cpm-after-analyze.jpg` - 分析后的状态（例如：美观的分析图表）

#### 优化功能对比图
- `cpm-before-optimize.jpg` - 优化前的状态（例如：低效的广告投放）
- `cpm-after-optimize.jpg` - 优化后的状态（例如：优化后的投放策略）

#### 报告功能对比图
- `cpm-before-report.jpg` - 报告前的状态（例如：杂乱的数据）
- `cpm-after-report.jpg` - 报告后的状态（例如：专业的CPM报告）

### Showcase组件图片

- `public/imgs/showcases/cpm-dashboard.jpg` - CPM计算器仪表板截图

## 图片规格建议

- **尺寸**: 1200x800px 或 16:9 比例
- **格式**: JPG 或 WebP
- **文件大小**: 每张图片 < 500KB
- **内容**: 展示真实的工具界面或相关的广告分析场景

## 临时解决方案

如果暂时没有合适的图片，可以：

1. 使用占位图片服务：
   ```
   https://picsum.photos/1200/800?random=1
   https://picsum.photos/1200/800?random=2
   ```

2. 或者创建简单的文字图片来说明功能

3. 也可以暂时禁用Features2组件，改回使用basic预设

## 完整配置包含的组件

使用`full`预设后，CPM计算器页面现在包含：

1. **ToolPageHero** - 页面标题和描述（带CTA按钮）
2. **CPMCalculator** - 主要的计算器功能
3. **ToolFeatures2** - 高级功能展示（带before/after滑块）
4. **ToolShowcase** - 产品展示和优势介绍
5. **ToolFAQ** - 常见问题解答
6. **ToolCTA** - 最终行动号召

这提供了最完整和专业的用户体验！