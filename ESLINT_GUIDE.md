# ESLint 代码审查使用指南

## 🎯 快速开始

### 1. 基础命令

```bash
# 检查代码问题
bun run lint

# 自动修复可修复的问题
bun run lint:fix

# 严格模式检查
bun run lint:strict

# 生成 JSON 报告
bun run lint:report
```

### 2. 检查特定文件或目录

```bash
# 检查特定文件
npx eslint src/components/destinations/DestinationList.js

# 检查特定目录
npx eslint src/components/

# 检查并修复
npx eslint src/components/ --fix

# 详细输出格式
npx eslint src/ --format=detailed
```

## 📋 常见问题类型

### 1. 代码质量问题
- **未使用的变量** - `no-unused-vars`
- **控制台输出** - `no-console`
- **调试语句** - `no-debugger`
- **使用 alert** - `no-alert`

### 2. 代码风格问题
- **使用 const** - `prefer-const`
- **避免 var** - `no-var`
- **模板字符串** - `prefer-template`
- **对象简写** - `object-shorthand`

### 3. React 特定问题
- **prop-types** - `react/prop-types`
- **JSX 中的 React** - `react/react-in-jsx-scope`
- **转义字符** - `react/no-unescaped-entities`

### 4. 可访问性问题
- **alt 文本** - `jsx-a11y/alt-text`
- **ARIA 属性** - `jsx-a11y/aria-props`
- **角色属性** - `jsx-a11y/role-has-required-aria-props`

## 🔧 修复策略

### 自动修复（--fix）
可以自动修复的问题：
- 缩进和空格
- 分号使用
- 引号风格
- 导入语句排序
- 简单的代码风格问题

### 手动修复
需要手动修复的问题：
- 逻辑错误
- 未使用的变量
- 复杂的代码重构
- 可访问性改进

## 🎨 最佳实践

### 1. 集成到开发流程

```bash
# 提交前检查
git add .
bun run lint
git commit -m "feat: 添加新功能"
```

### 2. VS Code 集成
安装 ESLint 扩展，可以：
- 实时显示错误
- 自动修复
- 保存时格式化

### 3. 持续集成
在 CI/CD 中添加 lint 检查：

```yaml
# .github/workflows/ci.yml
- name: Lint
  run: bun run lint
```

## 📊 报告分析

### 生成详细报告
```bash
# HTML 报告
npx eslint src/ --format=html --output-file=lint-report.html

# JSON 报告
npx eslint src/ --format=json --output-file=lint-report.json

# 统计信息
npx eslint src/ --format=json | jq '[.[] | .messages | length] | add'
```

### 忽略特定规则
```javascript
// 单行忽略
// eslint-disable-next-line no-console
console.log('调试信息');

// 文件级忽略
/* eslint-disable no-console */
console.log('整个文件忽略');

// 特定规则忽略
/* eslint-disable-next-line react/prop-types */
const Component = ({ title }) => <h1>{title}</h1>;
```

## 🚀 高级用法

### 1. 自定义规则配置

```javascript
// eslint.config.mjs
export default [{
  rules: {
    // 错误级别: 'off', 'warn', 'error'
    'no-console': 'warn',
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    
    // 复杂度控制
    'complexity': ['warn', 10],
    'max-lines-per-function': ['warn', 50],
    
    // 自定义消息
    'no-alert': ['error', 'Use toast notifications instead of alert()']
  }
}];
```

### 2. 环境特定配置

```javascript
// 不同环境不同规则
export default [
  {
    // 开发环境允许 console
    files: ['src/**/*.js'],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn'
    }
  },
  {
    // 测试文件特殊规则
    files: ['**/*.test.js', '**/*.spec.js'],
    rules: {
      'no-unused-expressions': 'off'
    }
  }
];
```

### 3. 项目特定忽略

```javascript
// eslint.config.mjs
export default [{
  ignores: [
    'node_modules/**',
    '.next/**',
    'coverage/**',
    'dist/**',
    '**/*.config.js'
  ]
}];
```

## 📈 性能优化

### 1. 缓存
```bash
# 使用缓存加速检查
npx eslint src/ --cache

# 清除缓存
npx eslint src/ --cache --cache-location .eslintcache
```

### 2. 并行处理
```bash
# 限制并行数量
npx eslint src/ --max-warnings 0

# 只检查修改的文件
git diff --name-only --cached | grep -E '\.(js|jsx)$' | xargs npx eslint
```

## 🎯 项目检查清单

### 提交前检查
- [ ] 运行 `bun run lint` 无错误
- [ ] 运行 `bun run lint:fix` 修复简单问题
- [ ] 手动修复剩余问题
- [ ] 确保代码符合团队规范

### 代码审查检查
- [ ] 无 console.log 在生产代码中
- [ ] 无未使用的变量和导入
- [ ] 错误处理完善
- [ ] 可访问性标准符合
- [ ] 代码复杂度合理

### 发布前检查
- [ ] 运行 `bun run lint:strict` 通过
- [ ] 生成并检查 lint 报告
- [ ] 确保关键功能无 lint 错误

## 🛠️ 故障排除

### 常见问题

1. **配置文件不生效**
   - 检查文件名和位置
   - 验证 JSON/JavaScript 语法

2. **规则冲突**
   - 检查多个配置文件
   - 使用 `--print-config` 查看最终配置

3. **性能问题**
   - 使用 `.eslintignore` 或 `ignores`
   - 检查大文件和目录

4. **扩展问题**
   - 检查依赖安装
   - 验证扩展兼容性

### 调试命令
```bash
# 查看最终配置
npx eslint --print-config src/app/page.js

# 调试模式
npx eslint src/ --debug

# 检查忽略的文件
npx eslint src/ --debug 2>&1 | grep -i ignore
```
