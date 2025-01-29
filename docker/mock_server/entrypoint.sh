# #!/bin/bash
# set -e

# # mock_server起動
# yarn mock -h 0.0.0.0 -p 4011 /mock_server/docker/mock_server/mock_yaml/common.yaml

# # nginx起動
# /usr/sbin/nginx -g "daemon off;"

# # 起動完了通知
# echo "done mock server!"

#!/bin/bash
set -e

# mock_server起動
# yarn mock -h 0.0.0.0 -p 4011 /mock_server/docker/mock_server/mock_yaml/common.yaml &
# yarn mock -h 0.0.0.0 -p 4012 /mock_server/docker/mock_server/mock_yaml/etl.yaml &
# yarn mock -h 0.0.0.0 -p 4013 /mock_server/docker/mock_server/mock_yaml/general-search.yaml &
# yarn mock -h 0.0.0.0 -p 4014 /mock_server/docker/mock_server/mock_yaml/support.yaml &
# yarn mock -h 0.0.0.0 -p 4015 /mock_server/docker/mock_server/mock_yaml/information.yaml &
# yarn mock -h 0.0.0.0 -p 4016 /mock_server/docker/mock_server/mock_yaml/faq.yaml &
# yarn mock -h 0.0.0.0 -p 4017 /mock_server/docker/mock_server/mock_yaml/notification.yaml &
# yarn mock -h 0.0.0.0 -p 4018 /mock_server/docker/mock_server/mock_yaml/enterprise-search.yaml &
# yarn mock -h 0.0.0.0 -p 4019 /mock_server/docker/mock_server/mock_yaml/meeting.yaml &
# yarn mock -h 0.0.0.0 -p 4020 /mock_server/docker/mock_server/mock_yaml/ergate.yaml &

# nginx起動
/usr/sbin/nginx -g "daemon off;"

# 起動完了通知
echo "done mock server!"