# 安装和使用指南

## 系统要求

- Node.js 18 或更高版本

## 安装步骤

### 1. 克隆项目

```bash
git clone https://github.com/AGAGAG666/AG_home.git
cd AG_home
```

### 2. 安装依赖

```bash
pnpm install 
```

### 3. 启动开发服务器

```bash
pnpm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看你的网站。

## 自定义网站

### 编辑个人信息

编辑 `app/page.tsx` 中的自我介绍部分

### 更换头像

1. 准备一张头像图片（建议 400x400px 或更大）
2. 保存为 `public/avatar.jpg`

### 修改联系信息

编辑 `app/data.ts`：

```typescript
export const EMAIL = 'your@email.com'

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Github',
    link: 'https://github.com/your-username',
  },
  // 更多社交链接...
]
```

### 更改网页标题和描述以及颜色

编辑 `app/layout.tsx`
颜色编辑: `app/globals.css`

### 修改网站上线时间

编辑 `app/footer.tsx` 中的 `launchDate`

### 修改主题色

编辑 `app/layout.tsx` 中的 `viewport`

### 修改跳转链接组件

在 `app/data.ts` 中修改

### 添加博客文章

在 `app/blog` 目录下创建 .md 文件，必须包含下述描述

```md
---
title: 文章标题
description: 简短描述
---

# 正文（Markdown 格式）
```

调调整样式以及文字渐入:修改`globals.css`

### 修改博客列表淡出淡入以及速度

编辑 `components/ui/simple-modal.tsx` 中的 transition

编辑 `app/globals.css` 中的 .animate-fade-in-up

### 博客列表搜索和分页功能

#### 配置每页显示文章数

编辑 `components/BlogModalContentClient.tsx`：

```typescript
const POSTS_PER_PAGE = 5  // 修改此值改变每页显示数量
```

### 2FA 页面主题自定义

#### 自定义按钮颜色

编辑 `app/2fa/page.tsx`，修改"我的记录"按钮类名：

**Light 主题（白色背景）**：
```typescript
className="... bg-blue-600 hover:bg-blue-700 text-white border-blue-200 ..."
```

**Dark 主题（深色背景）**：
```typescript
className="... dark:bg-blue-900/20 dark:hover:bg-blue-900/30 dark:text-blue-600 dark:border-blue-800 ..."
```

#### 自定义隐私保护提示框颜色

编辑提示框 div 元素的类名：

```typescript
className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 ... text-blue-800 dark:text-blue-300"
```

可替换的颜色组合：
- 蓝色系：`blue-600` / `blue-900/20`
- 紫色系：`purple-600` / `purple-900/20`
- 绿色系：`green-600` / `green-900/20`


## 构建和部署

### 构建生产版本

```bash
pnpm run build
```

### 本地运行生产版本

```bash
pnpm run start
```

### 部署到 Vercel

1. 推送代码到 GitHub
2. 访问 [Vercel](https://vercel.com)
3. 导入你的 GitHub 仓库
4. Vercel 会自动部署和构建

## 常见问题

如遇到问题，请检查：

- [Next.js 文档](https://nextjs.org/docs)
- 项目的 GitHub Issues
