#! /bin/sh

export MYSQL_ROOT_PASSWORD=password123
export MYSQL_DATABASE=remoteserver
export MYSQL_USER=rsuser
export MYSQL_PASSWORD=123456 

exist_webssh2_repo=$(ls | grep webssh2 | wc -l)
if [ $exist_webssh2_repo -gt 0 ]
then
    echo "webssh2 repo was exist"
else
    git clone  https://github.com/billchurch/webssh2.git
fi

cp config.json webssh2/app/

webssh2_config_change=$(git diff -- config.json | wc -l)
if [ $webssh2_config_change -gt -1 ]
then
    docker build -t thanhgit/webssh2:latest ./webssh2
else
    echo "Webssh2 config not change"
fi

exist_backend_image=$(docker images -f reference=thanhgit/back-end-remote-server:latest | wc -l)
if [ $exist_backend_image -gt 1 ]
then
    echo "thanhgit/back-end-remote-server image was exist"
else
    git clone https://github.com/thanhgit/back-end-remote-server
    docker build -t thanhgit/back-end-remote-server:latest ./back-end-remote-server
fi

change_frontend_repo=$(git diff -- src | wc -l)
if [ $change_frontend_repo -gt 0 ]
then
    sed -i -e "s/localhost/backend/g" package.json
    docker build -t thanhgit/front-end-remote-server:latest .
else
    echo "Front-end-remote-server repo not change"
fi

docker-compose up