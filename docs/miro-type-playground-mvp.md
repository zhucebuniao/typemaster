# Miró-inspired Type Playground MVP 设计文档

## 1. 项目定位

**项目名称（暂定）**：Miró Type Playground  
**一句话定义**：一个受 Joan Miró 视觉语言启发的实验字体生成网站，用户输入文字后，可生成带有手绘线条、原始符号、漂浮构图和红黄蓝色块的字体海报，并导出 PNG / SVG。

> MVP 优先做“字体风格生成器”，不先做完整字体下载站与 `.ttf/.otf` 输出。

---

## 2. 产品目标（MVP）

1. 用户输入文字后立即看到 Miró 风格视觉结果。  
2. 用户可通过少量参数控制风格（抽象程度、符号密度、线条扰动、色彩强度）。  
3. 用户可导出生成结果（最低 PNG，推荐 SVG）。

### 暂不包含

- 用户登录
- 云端保存
- 完整字体文件下载
- 完整中文字符集
- 复杂 AI 生成模型

---

## 3. 目标用户

- **设计师**：字体灵感工具 / 海报生成器 / 实验视觉系统。  
- **创作者**：输入词句快速得到强视觉图像。  
- **作品集访客**：理解项目的设计逻辑与系统性。

> 网站应兼具“工具”与“作品展示”双重属性。

---

## 4. MVP 核心功能

### 4.1 输入文字生成视觉字形

MVP 支持：

- `A-Z`
- `a-z`
- `0-9`
- 基础标点：`. , ! ? : ; - /`
- 空格

中文先不做全量；如需展示可先手工样例：`爱 梦 飞 远 光 海`。

### 4.2 风格参数（4 个）

- **Abstractness（抽象程度）**：低更可读，高更抽象。  
- **Line Wobble（线条扰动）**：低规整，高更手绘不稳定。  
- **Symbol Density（符号密度）**：低偏字体，高偏绘画场域。  
- **Color Intensity（色彩强度）**：低接近黑白，高更鲜明。

### 4.3 随机生成按钮

按钮：`Regenerate`（保留输入文本，仅更新随机种子与构图）。

变化项：

- 字母轻微旋转
- 字母位置漂移
- 符号重新分布
- 色块位置变化
- 线条扰动重算
- 整体构图变化

### 4.4 预设风格

- **Readable**：`20 / 30 / 20 / 40`
- **Poetic**：`50 / 60 / 50 / 65`
- **Wild**：`80 / 85 / 80 / 90`

（顺序：Abstractness / Line Wobble / Symbol Density / Color Intensity）

### 4.5 导出功能

- 必须：PNG
- 推荐：SVG

---

## 5. 页面结构（建议 5 页）

1. Home
2. Playground
3. Glyph System
4. Gallery
5. About

---

## 6. 首页设计

- 标题：**Miró Type Playground**
- 副标题：
  > A playful experimental type system inspired by symbolic abstraction, hand-drawn lines, and poetic visual rhythm.
- 第一屏核心交互：输入框 + 即时视觉区域
- 按钮：`Start Creating`、`Explore Glyphs`
- 展示词建议：`LOVE / DREAM / PLAY / TYPE`

---

## 7. Playground 页面

- 桌面：左侧控制、右侧画布
- 移动：上方控制、下方结果

### 控制面板

- 文本输入
- Preset 选择
- 4 个滑杆
- Regenerate
- Export PNG
- Export SVG

### 画布

- 默认：`1200 x 1600`（3:4）
- MVP 可先固定 3:4

---

## 8. Glyph System 页面

展示内容：

- A-Z
- 0-9
- 基础符号
- 局部结构放大
- 设计规则说明

每个字形 3 个状态：

1. Base Skeleton
2. Miró Line
3. Symbolic Composition

---

## 9. Gallery 页面

分类建议：

- Single Word Posters
- Poetic Phrases
- Name Experiments
- Abstract Titles

示例文案：`LOVE / DREAM / FAR AWAY / NO HOME / LOW SKY / BLUE BIRD / THE FUTURE`

支持点击案例回填 Playground（文本 + 参数）。

---

## 10. About 页面（版权与立场）

英文建议：

> This project is not an official Joan Miró typeface. It is an experimental type playground inspired by the visual language of symbolic abstraction, childlike marks, poetic space, and primary-color composition.

中文建议：

> 这不是 Joan Miró 官方字体，也不是对其具体作品的复制。它是一套受其视觉语言启发的实验字体系统，尝试将手绘线条、原始符号、漂浮空间和高纯度色彩转译为可交互的字体生成规则。

---

## 11. 视觉语言系统

### 11.1 色彩

- Paper White `#F5EEDC`
- Ink Black `#111111`
- Primary Red `#E3342F`
- Primary Yellow `#F7C948`
- Primary Blue `#1E5EFF`
- Accent Green `#2FA84F`

### 11.2 字形语言

- 保留基础可读性
- 允许歪斜、断裂、弯曲
- 符号需参与结构，不是表面贴图
- 漂浮但不失控

建议比例：

- 常规：`60% 字体 / 40% 绘画`
- Readable：`80/20`
- Wild：`35/65`

### 11.3 构图语言

- 明显留白
- 主体文字偏大
- 符号围绕字母漂浮
- 色块少而关键
- 追求“不稳定平衡”

---

## 12. 技术栈（建议）

- Next.js
- TypeScript
- Tailwind CSS
- SVG
- Framer Motion
- Rough.js（或自定义 path 扰动）
- OpenType.js（可选）
- html-to-image
- Vercel
- Figma

> MVP 优先 SVG：矢量友好、可编辑、易调试、导出自然。

---

## 13. 技术实现方案

### 13.1 字母数据结构

```ts
type GlyphPoint = { x: number; y: number }
type GlyphStroke = { id: string; path: string; width: number }
type GlyphSymbol = {
  type: 'dot' | 'star' | 'eye' | 'moon' | 'bird'
  x: number
  y: number
  size: number
  rotation: number
  color: string
}
type GlyphDefinition = {
  char: string
  width: number
  height: number
  strokes: GlyphStroke[]
  symbols: GlyphSymbol[]
}
```

### 13.2 生成参数结构

```ts
type GenerationSettings = {
  text: string
  preset: 'readable' | 'poetic' | 'wild'
  abstractness: number
  lineWobble: number
  symbolDensity: number
  colorIntensity: number
  seed: number
}
```

### 13.3 页面状态结构

```ts
type PlaygroundState = {
  inputText: string
  settings: GenerationSettings
  canvasSize: { width: number; height: number }
}
```

### 13.4 渲染流程

1. 解析文本
2. 字符映射到 `GlyphDefinition`
3. 按参数扰动路径
4. 生成符号与色块
5. 渲染 SVG

---

## 14. 字体生成逻辑

### 14.1 字形骨架方案

建议混合：

- A-Z 手工 SVG
- 数字/标点由基础字体轮廓转 SVG
- 中文先少量手工样例

### 14.2 线条扰动

- 控制点随机偏移
- `lineWobble` 控制偏移幅度
- `seed` 保证可复现

### 14.3 符号生成

符号：`dot / star / eye / moon / bird / line / blob`

规则建议：

- `70%` 靠近字母
- `30%` 漂浮在留白
- 避免平均随机分布

### 14.4 色块生成

形状：圆、椭圆、blob、小矩形、月牙  
策略：黑线主体，红黄蓝主色，绿色少量点缀。

---

## 15. 交互细节

- 默认输入：`LOVE`
- Placeholder：`Type a word or short phrase`
- 长度限制：24 字符

`Regenerate`：仅更新 seed。

```ts
setSettings({ ...settings, seed: Date.now() })
```

PNG 导出建议：`html-to-image`  
SVG 导出建议：序列化 `<svg>`。

---

## 16. 推荐目录结构

```txt
src/
  app/
    page.tsx
    playground/page.tsx
    glyphs/page.tsx
    gallery/page.tsx
    about/page.tsx
  components/
    Canvas/
      TypeCanvas.tsx
      GlyphRenderer.tsx
      SymbolRenderer.tsx
      BackgroundTexture.tsx
    Controls/
      TextInput.tsx
      PresetSelector.tsx
      SliderControl.tsx
      ExportButtons.tsx
    Layout/
      Header.tsx
      Footer.tsx
  lib/
    glyphs/
      definitions.ts
      alphabet.ts
      numbers.ts
    generator/
      generateComposition.ts
      transformGlyph.ts
      layoutGlyphs.ts
      generateSymbols.ts
      generateBlobs.ts
      random.ts
    export/
      exportPng.ts
      exportSvg.ts
  styles/
    globals.css
```

---

## 17. 核心组件

- `TypeCanvas`：整体画布（背景/字母/符号/色块/纹理）
- `GlyphRenderer`：单字母渲染
- `SymbolRenderer`：符号渲染
- `SliderControl`：统一滑杆

---

## 18. 开发排期（4 周）

- **第 1 周**：视觉系统、A-Z 初版、示例海报
- **第 2 周**：框架搭建、输入映射、页面基础
- **第 3 周**：seed、扰动、符号、色块、参数控制
- **第 4 周**：PNG/SVG 导出、Glyph/Gallery/About、部署

---

## 19. MVP 验收标准

基础：

- 可输入英文词句
- 可生成 Miró-inspired 海报
- 4 参数可调
- 可 Regenerate
- 可导出 PNG
- 响应式可用
- 含设计说明页面

进阶：

- SVG 可在 Figma/Illustrator 继续编辑
- Gallery ≥ 12 案例
- Glyph System 可解释规则
- 移动端流畅

---

## 20. 风险与方案

1. **像“字体+贴纸”** → 符号参与结构。  
2. **太抽象不可读** → 保留骨架，默认可读。  
3. **随机但无设计感** → 使用规则化随机。  
4. **版权表述不清** → 命名和 About 明确“独立项目、非官方”。

---

## 21. 后续版本方向

- **V1.1**：中文实验字（少量语义字符）
- **V1.2**：海报模板系统
- **V1.3**：WOFF2/TTF/OTF 导出
- **V1.4**：语义驱动生成（AI 辅助）

---

## 22. 最小可行版本总结

可压缩 MVP：

- 1 个 Home
- 1 个 Playground
- 26 个字母 SVG
- 4 个参数
- 1 个 Regenerate
- 1 个 PNG 导出
- 12 张案例图
- Vercel 部署

核心立场：

- 不是传统字体库，而是字体生成器；
- 不是复刻作品，而是抽象视觉语言规则化；
- 先做强交互与强传播，再扩字符集与字体工程。
