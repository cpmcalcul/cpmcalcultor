下面是一份「Featured Creations 横向胶片滑轨（含动画与音效）」的可落地需求文档（PRD + 技术规格）。按这份实现，直接能在 Next.js 里交付。

1. 目标与范围

打造一个“精选作品”横向滑轨组件，外观参考截图：多张圆角卡片沿水平轨道排列，略有 3D 透视与倾斜感。

支持鼠标滚轮驱动（桌面端）；当用户不操作时自动匀速滚动；支持触摸滑动（移动端）。

提供顺滑动画（惯性/缓动/入场）与轻量音效（滚动、悬停、点击）。

可复用：以数据驱动渲染任意数量的卡片与跳转链接。

无障碍与性能内置：键盘、阅读器、低性能机型与节能模式友好。

2. 关键体验（UX）

默认状态

组件进入视口后 500ms 开启自动滚动（AutoPlay），速度 v = 30~50 px/s（可配）。

两端加径向遮罩（Gradient Fade），引导“可横向浏览”的感知。

卡片有微弱呼吸动效（scale 0.99↔1.00，周期 3~5s，低幅度）。

交互

滚轮驱动：用户上下滚轮 → 转换为横向位移；带速度累积与惯性衰减。

悬停：当前聚焦卡片轻微抬升（y -6~10px）、增加投影、3D 倾斜（基于鼠标位置 max 6°）。

点击：打开详情或大图预览（新页或 Lightbox，可配）；播放短促“确认”音效。

拖拽/触摸：支持惯性与回弹；抬手后 800ms 内如果无再次交互，恢复 AutoPlay。

键盘：左右箭头移动一屏/一卡；Enter 打开当前聚焦卡。

无操作退场：组件失焦或页面切到后台 → 暂停动画与音效；回到前台恢复。

桌面/移动差异

桌面：滚轮、指针悬停倾斜、tooltip。

移动：单指滑动、震动反馈（可选，轻触 10–20ms）、无 hover 动画。

3. 动画规范

位移/惯性：基于 requestAnimationFrame 的速度积分器（velocity + damping）。

wheel Δ → velocity += Δ * sensitivity（默认 1.0，范围 0.6–1.6）。

每帧位置 x += velocity * dt，velocity *= 0.92（可配）。

卡片抬升：duration 160–220ms，ease-out；离开恢复 180–240ms，ease-in-out。

入场：组件进入视口时整体淡入（opacity 0→1, 300ms）+ 卡片交错上浮（每张延迟 40ms）。

3D 倾斜：以卡片中心为原点，x/y 偏移映射 rotateX/rotateY（max 6°），加 transform: translateZ(0)。

AutoPlay：线性（或极浅 ease），确保不会晕动；若用户 prefers-reduced-motion 则只做最小淡入。

4. 音效规范

事件与素材

滚动时：极轻微“whoosh”循环片段，低音量、淡入淡出以避免割裂；只在速度阈值之上（|v|>20px/s）触发/维持。

悬停：短促“tick”或“pop”（<120ms）。

点击：更实的“tap/confirm”（<160ms）。

格式与体积

mp3 + ogg 双格式回退；单文件 ≤ 30 KB，整体 ≤ 120 KB。

采样率 44.1k，单声道，-12 ~ -16 LUFS。

策略

默认静音（合规与反干扰），首次用户交互（点击“🔊启用音效”开关或任意点击）后可解锁播放。

遵守 document.visibilityState、AudioContext Suspended/Resume；尊重系统“静音模式”。

UI 提供音量滑块（0–100%）与“音效开关”。

5. 数据结构（Props）
type FeaturedRailItem = {
  id: string
  title: string
  image: { src: string; alt: string; width?: number; height?: number; blurDataURL?: string }
  href?: string // 外链
  onClick?: () => void // 自定义行为（弹窗/预览）
  badge?: string // 可选标识，如「Reference」
  meta?: Record<string, any> // 扩展字段
}

type FeaturedRailProps = {
  items: FeaturedRailItem[]
  autoplay?: boolean // 默认 true
  autoplaySpeed?: number // px/s，默认 40
  wheelSensitivity?: number // 默认 1.0
  snap?: 'none'|'card'|'page' // 默认 'none'
  cardWidth?: number // 默认 320~360
  gap?: number // 默认 24
  tiltMaxDeg?: number // 默认 6
  loop?: boolean // 默认 true（无缝循环）
  sound?: { enabledDefault?: boolean; volume?: number; files?: { scroll:string; hover:string; click:string } }
  onCardChange?: (index:number) => void
  onOpen?: (item: FeaturedRailItem) => void
  className?: string
}

6. 视觉与布局

容器：全宽，max-width: 1440px 居中；上下留白符合版心节奏（72–96px）。

背景：深色（如 #0B0B0F）；卡片采用亮底与柔和阴影。

卡片：圆角 24–28px；阴影双层（近层透明度高、远层低），hover 时加强 10–20%。

轨道：使用 GPU transform 平移；两端渐隐覆盖层（linear-gradient），避免“硬截断”感觉。

响应式：≥1280 显示 4–5 张；768–1279 显示 2–3 张；<768 显示 1–1.2 张（留一点“下一张”的预览）。

7. 无障碍（A11y）

容器 role="listbox"，卡片 role="option"；焦点环清晰（Focus Visible）。

ARIA：为每张卡设置 aria-label={${title} — Open}；键盘左右切换、Enter 打开。

图片具备语义性 ALT；若作为装饰图需 alt="" 并隐藏。

Reduced Motion：检测 prefers-reduced-motion → 关闭自运行与复杂 3D，仅保留渐显。

声音：默认静音；提供可见的声音控制开关（带 aria-pressed）。

8. 性能与工程

图片：Next.js <Image>，priority 仅首屏 1–2 张；其余 lazy + blurDataURL。

资源预算：首屏新增 JS ≤ 25KB gzip；音效总计 ≤ 120KB；图片延迟加载。

滚动循环：使用无缝克隆队列（把 items 克隆衔接）避免边界顿挫。

事件节流与回收：wheel/passive，pointercapture，raf 单循环。

监控：用 IntersectionObserver 控制入场/暂停；PerformanceObserver 记录交互延迟。

9. 状态机与边界

状态：idle｜autoplay｜user-scroll｜dragging｜paused。

切换规则：

任何用户主动交互 → user-scroll（暂停 autoplay）；交互 0.8s 后回到 autoplay。

visibilitychange=hidden → paused；返回 → 恢复之前状态。

边界：

无 items → 不渲染轨道，降级为空态文案。

少量 items（<4）时仍需循环（克隆）。

大图加载失败 → 显示占位与重试按钮。

10. 事件回调

onCardChange(index)：当前“视觉中心”卡片变更时触发（用于埋点）。

onOpen(item)：点击卡片打开时触发。

自定义事件：rail:autoplay:start/stop、rail:sound:toggle（便于全站总线接入）。

11. 验收标准（Checklist）

 鼠标滚轮能平滑驱动横向滚动，带惯性。

 无交互 0.5s 后自动滚动；任何交互都会暂停，且在 0.8s 后恢复。

 悬停抬升与 3D 倾斜细腻且无抖动，点击有“确认”音。

 prefers-reduced-motion 时：关闭 AutoPlay、3D 与惯性，仅保留淡入。

 默认静音；点击开关后音效可用；切后台自动静音/暂停。

 移动端支持滑动与回弹；无 hover 逻辑；可选震动反馈。

 键盘左右切换，Enter 打开；ARIA 标签正确。

 首屏额外 JS ≤ 25KB gzip，CLS≈0，FPS ≥ 55（中端机）。

 Lighthouse A11y ≥ 95。

12. 实现建议（Next.js / React 技术要点）

动画：Framer Motion（卡片入场/抬升/倾斜）+ 自写 useInertialRail Hook（位置/速度/循环）。

声音：Web Audio API + 懒加载音频；封装 useSound(name)，内部管理 AudioContext、gain、mute。

图片：next/image + fill + sizes；SSR 输出首屏 1–2 张优先。

结构（简化伪码）：

export default function FeaturedRail(props: FeaturedRailProps) {
  const { ref, x, onWheel, onDragStart, onDragMove, onDragEnd } = useInertialRail(props)
  const { play, toggleMute, muted } = useSoundBus(props.sound)

  return (
    <section aria-label="Featured Creations" className="relative">
      <GradientFades />
      <div
        ref={ref}
        role="listbox"
        aria-orientation="horizontal"
        onWheel={onWheel}
        onPointerDown={onDragStart}
        onPointerMove={onDragMove}
        onPointerUp={onDragEnd}
        style={{ transform: `translate3d(${-x}px,0,0)` }}
        className="will-change-transform select-none"
      >
        {loopedItems.map((item, i) => (
          <Card
            key={`${item.id}-${i}`}
            item={item}
            onHover={() => !muted && play('hover')}
            onClick={() => { play('click'); props.onOpen?.(item) }}
          />
        ))}
      </div>
      <Controls muted={muted} onToggleSound={toggleMute} />
    </section>
  )
}

13. 里程碑与交付

D1：静态样式与布局、图片懒加载、渐隐遮罩。

D2：惯性滚动 + AutoPlay + 循环拼接。

D3：悬停抬升/倾斜、拖拽、键盘与 A11y。

D4：音效接入与控制、可配置 Props、埋点事件。

D5：性能优化（节流、raf 合并、内存回收）、跨端适配、验收与文档。

14. 监控与埋点

指标：可视停留时长、交互次数（滚轮/拖拽/点击）、卡片曝光与点击率、音效开关比例、掉帧率。

事件：rail_view, rail_scroll, rail_card_open, rail_sound_toggle, rail_autoplay_state.