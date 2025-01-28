#!/bin/bash
set -e

# mock_server起動
yarn mock -h 0.0.0.0 -p 4011 /mock_server/docker/mock_server/mock_yaml/common.yaml

# nginx起動
/usr/sbin/nginx -g "daemon off;"

# 起動完了通知
echo "done mock server!"