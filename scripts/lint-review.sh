#!/bin/bash

echo "🔍 开始 ESLint 代码审查..."
echo "=================================="

# 基础检查
echo "📝 1. 基础 ESLint 检查"
echo "----------------------------------"
bun run lint

echo ""
echo "📊 2. 详细报告 (包含警告)"
echo "----------------------------------"
npx eslint src/ --ext .js,.jsx,.ts,.tsx --format=detailed

echo ""
echo "📈 3. 统计信息"
echo "----------------------------------"
npx eslint src/ --ext .js,.jsx,.ts,.tsx --format=json | jq -r '
  .[] | 
  "\(.filePath | split("/")[-1]): \(.messages | length) 问题"
' 2>/dev/null || echo "需要安装 jq 来查看详细统计"

echo ""
echo "🔧 4. 可自动修复的问题"
echo "----------------------------------"
npx eslint src/ --ext .js,.jsx,.ts,.tsx --fix-dry-run --format=compact

echo ""
echo "✅ ESLint 代码审查完成！"
