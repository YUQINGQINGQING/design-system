---
name: figma-mcp-spec-extractor
description: '从 Figma 设计稿通过 MCP 抽取设计规范。Use when: 用户提供 Figma 链接、节点 id、设计稿 URL，并要求提取色值、字体、间距、圆角、阴影、组件规范，或要求生成 variables.css、style-only HTML、设计 token。适用于 Figma MCP、本地 MCP、设计规范抽取、设计 token 生成、Figma 链接解析。'
argument-hint: '输入 Figma 链接、节点范围、输出范围（如：仅色值 / 色值+字体+间距 / 生成 variables.css）'
user-invocable: true
disable-model-invocation: false
---

# Figma MCP 设计规范抽取

## 何时使用
- 用户给出 Figma 链接，希望直接读取设计稿并抽取设计规范。
- 用户要求把设计稿转成 CSS 变量、设计 token、色卡页面、样式规范文档。
- 用户要求只输出样式资产，不生成业务界面。
- 用户明确提到 MCP、Figma MCP、设计规范、变量文件、色值提取。

## 前置条件
- 本地 Figma MCP 服务可用。
- 当前约定的 MCP 地址是 `http://127.0.0.1:3845/mcp`。
- 如果 MCP 无法访问，降级为要求用户提供节点导出 PNG/SVG，再从导出图中提取颜色。

## 输出原则
- 严格优先真实设计数据，不猜测。
- 用户若要求“仅样式”，则不要输出业务文案、业务组件说明或多余解释。
- 色值优先按以下分类输出：主色 / 辅助色 / 中性色 / 功能色。
- 若用户要求 CSS 变量文件，则只输出纯 CSS 变量结构。
- 若用户要求 HTML，则仅生成 style-only HTML，不生成业务界面。

## 标准流程
1. 读取用户给出的 Figma 链接与目标节点。
2. 通过 MCP 读取节点的可见样式属性。
3. 提取并去重颜色、字体、字号、字重、行高、间距、圆角、描边、阴影。
4. 对颜色进行语义归类：主色 / 辅助色 / 中性色 / 功能色。
5. 按用户要求生成以下一种或多种结果：
   - `variables.css`
   - style-only `index.html`
   - 设计规范说明文档
6. 如果用户只要色值，则不要额外生成字体、间距等内容。
7. 如果 MCP 读取失败，明确说明失败原因，并切换到导出图抽取流程。

## 颜色抽取规则
- 只保留设计中真实出现的颜色。
- 十六进制统一使用大写形式，例如 `#081E40`。
- 同色不同透明度需要单独记录时，优先保留原始 RGBA 信息；若用户要求纯 CSS 变量且设计规范以纯色为主，则输出纯 hex。
- 背景白色、浅灰色、边框灰色等中性色不要遗漏。
- 错误页、站点壳层、非目标节点的颜色不得混入结果。

## 分类建议
- 主色：品牌蓝、核心强调色、主要 CTA 色。
- 辅助色：辅助强调、信息填充、装饰性色。
- 中性色：背景、文字、边框、分割线、禁用态。
- 功能色：成功、警告、错误、风险、完成态。

## 失败降级策略
- MCP 不可达：提示用户检查本地 MCP 服务。
- MCP 可达但节点不可读：要求用户补充节点权限或导出图。
- 用户只提供截图：从截图提取高频色值，但标注为“基于导出图提取”。

## 文件产物
- 变量模板参考 [variables-template.css](./assets/variables-template.css)
- 输出约束参考 [output-contract.md](./references/output-contract.md)
- 分类规则参考 [classification-rules.md](./references/classification-rules.md)

## MCP 使用约定
- 默认目标地址：`http://127.0.0.1:3845/mcp`
- 优先读取：节点 fill、stroke、text style、effect、corner radius、spacing
- 仅在拿到真实节点数据后写入最终规范文件
