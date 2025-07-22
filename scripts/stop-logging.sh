#!/bin/bash

# 停止 ELK Stack 日志系统

echo "🛑 停止 PraxisGrove 日志系统..."

# 停止并删除容器
docker-compose -f docker-compose.logging.yml down

echo "✅ 日志系统已停止"

# 询问是否删除数据
read -p "是否删除所有日志数据？(y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️ 删除日志数据..."
    docker volume rm $(docker volume ls -q | grep elasticsearch) 2>/dev/null || true
    rm -rf logs/*
    echo "✅ 日志数据已删除"
fi
