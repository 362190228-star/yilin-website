---
name: "Yilin Cai Personal Portfolio"
description: "A sky-bright personal portfolio design system for a professional, fresh, and spirited UX designer."
colors:
  sky: "#1389d8"
  sky-deep: "#0b82d4"
  sky-bright: "#16a8ed"
  sky-soft: "#bfeeff"
  lime: "#d8ff64"
  lime-active: "#cdfc56"
  leaf-muted: "#9fbf71"
  canvas: "#f7f8fa"
  paper: "#ffffff"
  panel: "#f2f5f8"
  ink: "#161719"
  muted: "#62666b"
  line: "#1617191a"
typography:
  display:
    fontFamily: "Inter, Noto Sans SC, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(4rem, 10vw, 13rem)"
    fontWeight: 600
    lineHeight: 0.88
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, Noto Sans SC, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.8rem, 5.2vw, 6.25rem)"
    fontWeight: 600
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Inter, Noto Sans SC, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.65rem, 2.4vw, 2.8rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Inter, Noto Sans SC, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  label:
    fontFamily: "Inter, Noto Sans SC, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.10em"
rounded:
  chip: "999px"
  card: "24px"
  feature: "32px"
  hero: "42px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "72px"
  section: "clamp(6rem, 9vw, 8.5rem)"
components:
  button-primary:
    backgroundColor: "{colors.lime}"
    textColor: "{colors.ink}"
    rounded: "{rounded.chip}"
    padding: "14px 28px"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.chip}"
    padding: "14px 32px"
  card-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.feature}"
    padding: "28px"
  card-muted:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "28px"
  card-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.card}"
    padding: "28px"
---

# Design System: Yilin Cai Personal Portfolio

## 1. Overview

**Creative North Star: "Sky Lab Portfolio"**

这个视觉系统以“清透天空中的个人作品集”为北极星：第一眼要有开放、轻盈、可信的气场，随后通过清晰的图文层级、项目图像和有节奏的版面组织，把蔡艺琳的 AI 产品体验、交互设计能力和个人灵气串起来。参考图里的蓝天、荧光绿、黑白灰信息模块和大字号层级可以借鉴，但内容必须服务于个人作品集，而不是 AI 咨询公司模板。

整体应保持专业、清爽、有灵气。页面可以有空间感和轻微未来感，但每个视觉元素都要帮助面试官、设计负责人和招聘方更快理解她是谁、做过什么、为什么值得面试。它明确拒绝普通简历页、模板感学生作品集、企业 SaaS 官网、纯装饰个人主页，以及让风格盖过项目内容的设计。

**Key Characteristics:**

- 大面积天空蓝或白色留白承载第一印象。
- 荧光绿只做行动、状态和小范围重点，不铺满全站。
- 信息以图像卡、深色重点卡、浅灰面板和清晰文字区块组织。
- 作品集内容优先，装饰永远退到内容之后。
- 动效轻、准、有空气感，只增强已有内容的进入、反馈和层级。

## 2. Colors

色彩来自参考图的天空蓝、荧光绿、黑白灰信息卡，同时保留当前项目已有的 `sky`、`lime`、`ink`、`canvas` 体系。

### Primary

- **Open Sky Blue** (`#1389d8`): 主品牌色。用于 hero 背景、重点大面积氛围、项目视觉中的天空感和开放感。
- **Clear Sky Gradient** (`#0b82d4` to `#16a8ed` to `#bfeeff`): hero 和沉浸式区域的背景梯度。它应该像真实晴空一样干净，不要做成复杂渐变装饰。

### Secondary

- **Signal Lime** (`#d8ff64`): 行动按钮、激活状态、小圆点、关键词 chip、局部高亮。单屏面积建议控制在 10% 以内，稀有才有记忆点。
- **Active Lime** (`#cdfc56`): hover、selected、pressed 等更亮的交互状态。

### Tertiary

- **Quiet Leaf** (`#9fbf71`): 辅助自然感，用于次级点缀或与项目图像融合的柔和光晕。不要让它和 lime 抢重点。

### Neutral

- **Canvas Cool White** (`#f7f8fa`): 页面主背景，冷白、轻盈、干净。
- **Paper White** (`#ffffff`): 卡片、导航和浮层背景。
- **Panel Gray** (`#f2f5f8`): 次级信息卡、图片占位、较弱内容区域。
- **Ink Black** (`#161719`): 标题、正文重点、深色卡片背景。
- **Readable Muted** (`#62666b`): 辅助文字。不能再更浅，保证招聘方快速扫读时仍清晰。
- **Soft Line** (`#1617191a`): 细边框和分隔线。

### Named Rules

**The Lime Signal Rule.** 荧光绿只用于“需要被看见”的动作或信息：按钮、当前状态、关键词、微小图标点。不要把它当大面积背景色反复铺开。

**The Sky First Rule.** 首屏可以大胆使用天空蓝，但后续内容要回到白色和浅灰，让作品图、文字和案例层级成为主角。

## 3. Typography

**Display Font:** Inter, Noto Sans SC, ui-sans-serif, system-ui, sans-serif  
**Body Font:** Inter, Noto Sans SC, ui-sans-serif, system-ui, sans-serif  
**Label/Mono Font:** 不单独引入 mono；技术感通过布局、卡片和内容表达，不靠等宽字体伪装。

**Character:** 字体系统要像参考图一样干净、直接、现代，但中文内容必须保持可读。标题可以大、紧、果断；正文必须放松、有呼吸，避免作品集变成难读的海报。

### Hierarchy

- **Display** (600, `clamp(4rem, 10vw, 13rem)`, `0.88`): 只用于 hero 或极少数关键陈述。字距下限为 `-0.04em`，不要再压得更紧。
- **Headline** (600, `clamp(2.8rem, 5.2vw, 6.25rem)`, `0.96`): 用于 About、Projects、Contact 等主段落标题。
- **Title** (600, `clamp(1.65rem, 2.4vw, 2.8rem)`, `1.08`): 用于项目卡、实习详情、弹窗标题。
- **Body** (400, `1rem`, `1.75`): 用于经历、职责、项目说明。正文行长控制在 65-75ch 内。
- **Label** (700, `0.78rem`, `0.10em`, uppercase only when brief): 用于少量导航、状态、卡片小标题。不要每个 section 都重复 tiny uppercase eyebrow。

### Named Rules

**The One Big Sentence Rule.** 每个主要版块最多有一个真正的大句子，用它建立判断；细节进入卡片或正文，不要所有内容都用大标题喊出来。

**The Chinese Readability Rule.** 中文正文不使用过紧字距，不使用过小灰字。作品说明要让面试官在移动端也能轻松读完。

## 4. Elevation

这个系统使用“空气感层叠”：浅色卡片通过柔和阴影建立层级，深色卡片通过强对比成为视觉锚点，首屏容器通过大面积色彩和软阴影建立空间感。阴影应该像晴空中的软光，不像厚重的商业后台卡片。

### Shadow Vocabulary

- **Nav Float** (`0 18px 55px rgba(20, 32, 44, 0.10)`): 顶部导航和轻量悬浮控件。
- **Card Float** (`0 24px 70px rgba(20, 32, 44, 0.08)`): 默认作品卡、资料卡、浅色信息卡。
- **Card Hover** (`0 30px 90px rgba(20, 32, 44, 0.14)`): 卡片 hover 或被选中时使用。
- **Hero Glow** (`0 28px 90px rgba(20, 32, 44, 0.12)`): 大面积 hero 容器或首屏主视觉。
- **Modal Lift** (`0 34px 120px rgba(20, 32, 44, 0.25)`): 项目详情弹窗等最高层级。

### Named Rules

**The Air Not Glass Rule.** 可以使用半透明和轻微 blur，但不要把全站做成玻璃拟态。透明只服务于天空、浮层和空间感。

**The Lift On Purpose Rule.** 阴影用于表达层级或交互状态，不要给每个元素都加同样的软阴影。

## 5. Components

组件要像参考图里的模块一样轻盈、干净、有层次，但必须基于当前网站已有内容类型来规范：导航、按钮、标签、项目卡、图片容器、实习信息、联系入口。不要为了靠近参考图而新增无关交互、假数据或模板化业务组件。

### Buttons

- **Shape:** 胶囊形（`999px`），高度约 `48-56px`。
- **Primary:** `Signal Lime` 背景、`Ink Black` 文字，用于主要行动，例如查看项目、联系我、下载作品集。
- **Hover / Focus:** hover 可轻微上移 `-2px`，背景切到 `#cdfc56`，阴影变成带 lime 的柔光；focus 必须有清晰可见轮廓。
- **Secondary / Ghost:** 深色按钮用于强对比行动；白色或透明按钮用于导航和次要入口。

### Chips

- **Style:** 圆角胶囊，浅灰或白底，文字为 `Muted` 或 `Ink`。AI、UX、Interaction 等关键词可以用 lime 小点或细小背景强调。
- **State:** 选中态使用 lime，但不要让一整组 chip 全部高亮。

### Cards / Containers

- **Corner Style:** 普通卡片 `24px`，重点大卡 `32px`，hero 容器最大 `42px`。
- **Background:** 白色卡承载正文，浅灰卡承载辅助信息，黑色卡承载关键观点或 featured case。
- **Shadow Strategy:** 默认使用 Card Float；hover 才进入 Card Hover。
- **Border:** 使用 `Soft Line` 细边框，不使用粗侧边条。
- **Internal Padding:** 小卡 `24-28px`，大卡 `32-40px`，hero 内浮卡根据内容压缩但不可拥挤。

### Spacing / Layout

- **Page Shell:** 页面左右安全边距至少 `24px`，大屏内容最大宽度约 `1520px`。
- **Section Padding:** 主 section 使用 `clamp(6rem, 9vw, 8.5rem)` 的上下留白，保证每个版块有独立呼吸感。
- **Two-column Gap:** 图文双栏或内容网格的主间距使用 `clamp(3.5rem, 7vw, 9rem)`，不要挤成普通简历布局。
- **Card Grid Gap:** 项目卡、信息卡之间使用 `24-40px` 间距；卡片内部信息组使用 `16-24px`。
- **Text Rhythm:** 标题到正文通常 `24px` 左右；正文到下一组信息 `40px` 左右；同类列表项 `12-16px`。
- **Mobile Rhythm:** 移动端减少大屏空白但保留层级，section 上下留白不低于 `64px`，卡片间距不低于 `20px`。
- **No Crowding Rule:** 大字号标题、照片、项目图和按钮之间必须有明确空隙，不允许文字贴边、压图或按钮挤在标题下方。

### Inputs / Fields

- **Style:** 如需表单，使用白底或浅灰底、`24px` 圆角、细边框。
- **Focus:** 边框或外发光转为 sky/lime，但保持克制。
- **Error / Disabled:** 错误态用明确文字和红色提示，不依赖颜色单独传达；禁用态降低对比但仍可读。

### Navigation

- 顶部导航采用半透明白色浮层，`28px` 圆角，轻微 blur 和 Nav Float 阴影。
- 当前 section 用白色 pill 或 lime 小点表达，不使用粗下划线。
- 移动端导航要优先保证可点按和不遮挡 hero 主标题。

### Existing Signature Patterns

**Hero Sky:** 首页首屏使用天空蓝、云感或空气感建立第一印象。不要新增四张悬浮卡片；首屏重点应放在个人定位、照片/氛围、主行动按钮和整体视觉气质上。

**Growth Map:** 实习经历可以保留地图/路径隐喻，但文案要压缩成“产品 / 问题 / 贡献 / 结果”，避免变成长篇简历。

**Project Tiles:** 项目卡以真实项目图像、标题、类别和标签为主。允许不同项目有不同视觉权重，但不要新增与作品无关的统计卡、价格卡或假业务面板。

## 6. Do's and Don'ts

### Do:

- **Do** 用 sky blue 建立首屏空气感，再用白色和浅灰承接作品内容。
- **Do** 把 lime 控制为信号色，用在按钮、状态、小圆点和关键词。
- **Do** 使用真实个人照片、项目图和案例截图作为视觉资产。
- **Do** 让每张卡片回答一个具体问题：能力、经历、项目价值或联系动作。
- **Do** 按 `xs/sm/md/lg/xl/section` 间距节奏组织页面，不要让内容像简历一样密集堆叠。
- **Do** 给动效提供 reduced-motion 替代；默认内容不能依赖动画后才出现。
- **Do** 保持中文正文清晰，辅助文字至少使用 `#62666b` 这一级别的对比。

### Don't:

- **Don't** 让网站变成 ordinary resume page、template-heavy student portfolio、corporate SaaS landing page 或 decorative personal homepage。
- **Don't** 照搬参考图里的 AI 咨询业务、假 logo、价格卡、客户评分或 SaaS 仪表盘内容。
- **Don't** 在首页新增四张悬浮卡片来模仿参考图；参考图只提供颜色、层级、空气感和组件气质。
- **Don't** overuse identical cards or repeated tiny uppercase section labels。
- **Don't** 让 bright lime overpower the portfolio content；单屏面积尽量少于 10%。
- **Don't** 使用 gradient text、粗侧边彩条、重复网格背景或无意义玻璃拟态。
- **Don't** 把卡片圆角做得过度可爱；`32px` 已经是常规卡片上限，hero 容器才允许更大。
- **Don't** 为了“科技感”加入等宽字体、终端风、紫蓝渐变或模板化 AI 元素。
