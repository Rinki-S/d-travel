# 测试运行指南

## 运行所有测试
```bash
npm test
```

## 运行特定测试文件
```bash
# 运行工具函数测试
npm test -- src/__tests__/lib/utils.test.js

# 运行组件测试
npm test -- src/__tests__/components/

# 运行 API 测试
npm test -- src/__tests__/api/

# 运行数据库测试
npm test -- src/__tests__/lib/sqlite-database.test.js
```

## 运行测试并生成覆盖率报告
```bash
npm run test:coverage
```

## 监听模式运行测试
```bash
npm run test:watch
```

## CI 模式运行测试
```bash
npm run test:ci
```

## 测试文件结构

```
src/__tests__/
├── components/              # 组件测试
│   ├── DestinationForm.test.js
│   ├── DestinationList.test.js
│   └── ui/
│       ├── Button.test.js
│       └── Input.test.js
├── lib/                     # 工具函数和数据库测试
│   ├── utils.test.js
│   └── sqlite-database.test.js
├── api/                     # API 路由测试
│   └── destinations.test.js
├── integration/             # 集成测试
│   └── destination-management.test.js
└── utils/                   # 测试工具
    └── test-utils.js
```

## 测试类型说明

### 1. 单元测试 (Unit Tests)
- 测试单个函数或组件的功能
- 文件：`utils.test.js`, `Button.test.js`, `Input.test.js`

### 2. 组件测试 (Component Tests)
- 测试 React 组件的渲染和交互
- 文件：`DestinationForm.test.js`, `DestinationList.test.js`

### 3. API 测试 (API Tests)
- 测试 API 路由的功能
- 文件：`destinations.test.js`

### 4. 数据库测试 (Database Tests)
- 测试数据库操作函数
- 文件：`sqlite-database.test.js`

### 5. 集成测试 (Integration Tests)
- 测试多个组件或模块的协同工作
- 文件：`destination-management.test.js`

## 测试覆盖率目标

- 函数覆盖率：≥ 80%
- 行覆盖率：≥ 80%
- 分支覆盖率：≥ 70%
- 语句覆盖率：≥ 80%

## Mock 策略

### API 调用
- 使用 `global.fetch` mock 来模拟 API 调用
- 在每个测试前重置 mock 状态

### 浏览器 APIs
- Mock `window.alert`, `window.confirm` 等浏览器 API
- Mock `localStorage` 如果需要

### 数据库操作
- 使用测试数据库或内存数据库
- 在每个测试前后清理数据

## 最佳实践

1. **测试隔离**：每个测试应该独立运行，不依赖其他测试
2. **清理 Mock**：在 `beforeEach` 和 `afterEach` 中清理 mock 状态
3. **有意义的测试名称**：测试名称应该清楚地描述测试的内容
4. **测试边界情况**：测试正常情况、错误情况和边界情况
5. **保持测试简单**：每个测试应该只测试一个功能点
