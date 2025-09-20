# 关于此仓库

本仓库是一个使用 React 和 TypeScript 构建的打字练习应用（Typing Master）。它使用 Vite 作为现代化的前端构建工具，并采用 Tailwind CSS 进行样式设计，实现了响应式布局。

## 快速上手

你需要 Node.js 和 npm。

1.  **安装依赖**:
    ```bash
    npm install
    ```
2.  **启动开发服务器**:
    ```bash
    npm run dev
    ```
    此命令会启动一个本地开发服务器。你可以在浏览器中打开对应的 URL 来查看应用，它支持热模块替换（HMR），代码更改会实时反映在浏览器中。

## 项目结构与技术栈

-   **框架**: React (`react`, `react-dom`)
-   **语言**: TypeScript
-   **构建工具**: Vite (`vite.config.ts`)
-   **样式**: Tailwind CSS (`tailwind.config.js`, `postcss.config.js`)
-   **代码规范**: ESLint (`eslint.config.js`)

### 关键文件和目录

-   `src/`: 存放所有主要的源代码。
    -   `main.tsx`: React 应用的入口文件。
    -   `App.tsx`: 主要的应用根组件。
    -   `components/`: 存放可复用的 React 组件。
-   `public/`: 存放静态资源（如图片、图标），这些资源在构建时会直接被复制到输出目录。
-   `index.html`: 应用的 HTML 入口模板。
-   `package.json`: 定义了项目元数据、依赖项和可用的脚本命令。
-   `vercel.json`: 针对 Vercel 平台的部署配置文件。

## 常用命令

-   `npm run dev`: 启动开发服务器。
-   `npm run build`: 为生产环境构建和打包应用，输出到 `dist` 目录。
-   `npm run lint`: 运行 ESLint 检查代码中的潜在问题和风格错误。
-   `npm run preview`: 在本地预览生产构建后的应用。

## 如何提问

你可以就以下方面向 Copilot 提问：

-   "向 `App` 组件添加一个新功能。"
-   "如何修改 Tailwind CSS 的主题配置来更改主色调？"
-   "在 `src/components` 目录下创建一个新的按钮组件。"
-   "解释一下 `vite.config.ts` 文件的作用。"
