# 修复日志

## 26.3.28

修复了CSS v3黑白主题无法切换的问题

## 26.4.4

修复文章手机端标题文字重叠

修复 data.ts 类型声明错误（`ltype` → `type`）

## 26.4.6

1. Next.js Link组件修复
- **文件**: `app/2fa/page.tsx`, `app/blog/layout.tsx`
- **问题**: 内部路由使用 `<a>` 标签代替 `<Link>`
- **修复**: 添加 `import Link from 'next/link'`，替换所有 `<a href="/">` 为 `<Link href="/">`

2. 未使用的导入清理
- **文件**: `app/blog/layout.tsx`
- **问题**: ESLint 警告未使用的导入
- **修复**: 移除 `TextMorph`, `useEffect`, `useState` 导入；删除 `CopyButton` 函数定义

# 3. 重复函数删除
- **文件**: `app/footer.tsx`
- **问题**: 两个相同名称的 `SiteUptime()` 函数定义
- **修复**: 删除重复函数，保留 `SiteUptimeSpan()`

4. Image组件优化
- **文件**: `app/page.tsx`
- **问题**: 使用原生 `<img>` 标签，影响 Next.js 图片优化
- **修复**: 添加 `import Image from 'next/image'`，替换为 `<Image>` 组件并添加 `width`/`height` 属性

5. TypeScript 类型错误修复
- **文件**: `components/ui/text-effect.tsx`
  - **问题**: 未使用的变量 `exit`
  - **修复**: 添加 eslint-disable 注释

- **文件**: `components/ui/animated-background.tsx`
  - **问题**: `child: any` 类型过于宽泛
  - **修复**: 修改为 `child: React.ReactElement<any>`，添加 eslint-disable 注释

