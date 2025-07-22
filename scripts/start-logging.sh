#!/bin/bash

# 启动 ELK Stack 日志系统

echo "🚀 启动 PraxisGrove 日志系统..."

# 检查 Docker 是否运行
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker 未运行，请先启动 Docker"
    exit 1
fi

# 创建必要的目录
echo "📁 创建日志目录..."
mkdir -p logs
mkdir -p config/logstash/config

# 创建 Logstash 配置文件
echo "⚙️ 创建 Logstash 配置..."
cat > config/logstash/config/logstash.yml << EOF
http.host: "0.0.0.0"
xpack.monitoring.elasticsearch.hosts: [ "http://elasticsearch:9200" ]
EOF

# 启动服务
echo "🐳 启动 Docker 容器..."
docker-compose -f docker-compose.logging.yml up -d

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 30

# 检查服务状态
echo "🔍 检查服务状态..."

# 检查 Elasticsearch
if curl -s http://localhost:9200/_cluster/health > /dev/null; then
    echo "✅ Elasticsearch 运行正常 (http://localhost:9200)"
else
    echo "❌ Elasticsearch 启动失败"
fi

# 检查 Kibana
if curl -s http://localhost:5601/api/status > /dev/null; then
    echo "✅ Kibana 运行正常 (http://localhost:5601)"
else
    echo "❌ Kibana 启动失败"
fi

# 检查 Logstash
if curl -s http://localhost:9600/_node/stats > /dev/null; then
    echo "✅ Logstash 运行正常 (http://localhost:9600)"
else
    echo "❌ Logstash 启动失败"
fi

echo ""
echo "🎉 日志系统启动完成！"
echo ""
echo "📊 访问地址："
echo "  - Kibana Dashboard: http://localhost:5601"
echo "  - Elasticsearch API: http://localhost:9200"
echo "  - Logstash API: http://localhost:9600"
echo ""
echo "📝 日志发送端点："
echo "  - HTTP: http://localhost:5000"
echo "  - Beats: localhost:5044"
echo ""
echo "🛠️ 管理命令："
echo "  - 查看日志: docker-compose -f docker-compose.logging.yml logs -f"
echo "  - 停止服务: docker-compose -f docker-compose.logging.yml down"
echo "  - 重启服务: docker-compose -f docker-compose.logging.yml restart"
